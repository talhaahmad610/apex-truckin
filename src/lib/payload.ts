import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Payload Local API (in-process, no HTTP hop). Cached per process by Payload itself.
 * `cron: true` starts the jobs scheduler (hero-video processing, scheduled publish) on the first
 * call in this process — otherwise it only starts once an admin/REST request passes it internally,
 * which never happens on a plain `next start` before the first visitor.
 */
export const getPayloadClient = () => getPayload({ config, cron: true });
