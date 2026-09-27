import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";

/** Payload Local API (in-process, no HTTP hop). Cached per process by Payload itself. */
export const getPayloadClient = () => getPayload({ config });
