import type { CollectionConfig } from "payload";
import { isAdmin } from "../access";
import { revalidate } from "../hooks/revalidate";
import { deleteObjectsUnderPrefix } from "../../lib/s3";

/**
 * Raw hero-video uploads for the scroll-scrubbed home hero (FlightScrub). Nothing here is public —
 * the raw file and this collection are admin-only; `processFlightLeg` reads the upload, encodes it
 * with the recipe in `src/lib/footage.ts`, and writes the results into the `Output` fields below,
 * which the site reads (only when `status: "ready"`). Saving a new file, ticking "Reprocess", or
 * changing a Processing field queues a re-encode; the old output keeps playing until the new one
 * is ready, so a failed encode never breaks the live hero.
 */
export const FlightSources: CollectionConfig = {
  slug: "flight-sources",
  labels: { singular: "Hero footage", plural: "Hero footage" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "status", "duration", "updatedAt"],
    description: "Upload a raw clip for one leg of the scroll-scrubbed home hero. It's encoded automatically — this can take a minute.",
  },
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  upload: {
    mimeTypes: ["video/mp4", "video/quicktime", "video/webm"],
    disableLocalStorage: true,
    filesRequiredOnCreate: false, // seeded rows carry processed output but no raw file
    focalPoint: false,
    crop: false,
    adminThumbnail: ({ doc }) => {
      const poster = (doc as { output?: { poster?: string | null } } | undefined)?.output?.poster;
      return typeof poster === "string" ? poster : null;
    },
  },
  fields: [
    { name: "title", type: "text", required: true, maxLength: 80, admin: { description: 'e.g. "Leg 1 — desert highway"' } },
    {
      type: "collapsible",
      label: "Processing",
      fields: [
        {
          type: "row",
          fields: [
            { name: "trimStart", label: "Trim start (seconds)", type: "number", defaultValue: 0, min: 0, admin: { width: "34%" } },
            {
              name: "maxSeconds",
              label: "Max length (seconds)",
              type: "number",
              defaultValue: 8,
              min: 1,
              max: 15,
              admin: { width: "33%", description: "The hero scrubs through this whole clip, so longer = slower scrub." },
            },
            {
              name: "grade",
              label: "Color grade",
              type: "select",
              defaultValue: "standard",
              options: [
                { label: "Standard", value: "standard" },
                { label: "Darker (daylight footage pulled toward dusk)", value: "darker" },
              ],
              admin: { width: "33%" },
            },
          ],
        },
        {
          name: "reprocess",
          type: "checkbox",
          admin: { description: "Tick and save to re-encode with the settings above." },
        },
      ],
    },
    {
      type: "row",
      admin: { position: "sidebar" },
      fields: [
        {
          name: "status",
          type: "select",
          defaultValue: "queued",
          options: [
            { label: "Queued", value: "queued" },
            { label: "Processing", value: "processing" },
            { label: "Ready", value: "ready" },
            { label: "Failed", value: "failed" },
          ],
          admin: { readOnly: true },
        },
      ],
    },
    {
      name: "error",
      type: "textarea",
      admin: { position: "sidebar", readOnly: true, condition: (data) => data?.status === "failed" },
    },
    {
      type: "row",
      admin: { position: "sidebar" },
      fields: [
        { name: "sourceDuration", label: "Source duration (s)", type: "number", admin: { readOnly: true, width: "34%" } },
        { name: "sourceWidth", label: "Width", type: "number", admin: { readOnly: true, width: "33%" } },
        { name: "sourceHeight", label: "Height", type: "number", admin: { readOnly: true, width: "33%" } },
      ],
    },
    {
      type: "collapsible",
      label: "Output (written by the encoder)",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "output",
          type: "group",
          admin: { readOnly: true },
          fields: [
            { name: "desktop", type: "text" },
            { name: "mobile", type: "text" },
            { name: "poster", type: "text" },
            { name: "posterMobile", type: "text" },
            { name: "duration", type: "number" },
            { name: "hash", type: "text" },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        if (req?.context?.fromJob) return doc;

        const fileChanged = Boolean(doc.filename) && doc.filename !== previousDoc?.filename;
        const paramsChanged = Boolean(
          previousDoc &&
            (doc.trimStart !== previousDoc.trimStart || doc.maxSeconds !== previousDoc.maxSeconds || doc.grade !== previousDoc.grade),
        );
        const wantsReprocess = doc.reprocess === true;

        // req is passed through on every nested Local API call below: this hook runs inside the
        // create/update's own open DB transaction, and a nested call without `req` starts a
        // separate transaction that can't see the not-yet-committed row yet — the update by ID
        // then finds nothing and throws NotFound ("Not Found"), even though the doc exists.
        if (wantsReprocess && !doc.filename) {
          await req.payload.update({
            collection: "flight-sources",
            id: doc.id,
            data: { reprocess: false, status: "failed", error: "No source file uploaded — upload a clip, then reprocess." },
            context: { fromJob: true, disableRevalidate: true },
            overrideAccess: true,
            req,
          });
        } else if (doc.filename && (operation === "create" || fileChanged || wantsReprocess || paramsChanged)) {
          await req.payload.update({
            collection: "flight-sources",
            id: doc.id,
            data: { status: "queued", reprocess: false, error: null },
            context: { fromJob: true, disableRevalidate: true },
            overrideAccess: true,
            req,
          });
          await req.payload.jobs.queue({ task: "processFlightLeg", input: { id: doc.id }, queue: "video", req });
        }

        revalidate(req, { tags: ["home"], paths: ["/"] });
        return doc;
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        revalidate(req, { tags: ["home"], paths: ["/"] });
        if (doc.output?.hash) {
          try {
            await deleteObjectsUnderPrefix(`flight/${doc.output.hash}`);
          } catch (err) {
            console.error(`[flight-sources] failed to delete outputs for ${doc.output.hash}`, err);
          }
        }
      },
    ],
  },
};
