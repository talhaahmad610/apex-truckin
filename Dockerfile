# Multi-stage build. Only the final `runner` stage is deployed — it has no `node_modules`, no TS
# sources, and no build tooling, just the Next.js standalone server + ffmpeg. The `tools` stage
# (full node_modules + sources, for `payload migrate`/`seed`/`footage`) is built but never shipped;
# `docker compose --profile tools run` uses it directly instead.

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Full node_modules + TypeScript sources — everything the Payload CLI needs (migrate, seed,
# generate:types, the footage script). Never deployed; only reached via `docker compose --profile
# tools run tools <command>`.
FROM deps AS tools
WORKDIR /app
ENV NODE_ENV=production
COPY . .

# Compiles the standalone Next.js server. No live database is reachable from inside `docker
# build` (see src/lib/build-flags.ts) — SKIP_BUILD_STATIC_GENERATION makes every CMS page render
# on-demand at runtime instead of being pre-rendered here. The three ARGs are the only values
# next.config.ts needs at build time (image remotePatterns, inlined NEXT_PUBLIC_* values); no
# secrets or database credentials are needed to build this image.
FROM tools AS builder
WORKDIR /app
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3200
ARG S3_PUBLIC_URL=http://media.localhost:9000
ARG S3_BUCKET=apex-media
ENV SKIP_BUILD_STATIC_GENERATION=1 \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    S3_PUBLIC_URL=${S3_PUBLIC_URL} \
    S3_BUCKET=${S3_BUCKET}
RUN npm run build

# The deployed image. node:22-alpine + ffmpeg (~70 MB) is the only non-Node payload — the server
# itself needs no `node_modules` at all (output: "standalone" traces exactly what's imported).
FROM node:22-alpine AS runner
RUN apk add --no-cache ffmpeg
WORKDIR /app
ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

# ISR/image-optimizer cache and upload/encode temp files (src/payload.config.ts, src/payload/jobs/
# processFlightLeg.ts) both need a writable directory under the non-root `node` user.
RUN mkdir -p .next/cache && chown -R node:node .next
USER node

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD wget -qO- http://127.0.0.1:3000/robots.txt || exit 1

CMD ["node", "server.js"]
