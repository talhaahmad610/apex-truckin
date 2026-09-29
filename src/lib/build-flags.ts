/**
 * Set only in the Docker image's builder stage (see Dockerfile), never on the host or at runtime.
 * `next build` normally pre-renders every CMS page, which needs a live database — unreachable from
 * inside `docker build` (the compose Postgres is published on 127.0.0.1, invisible to a build
 * container). With this flag, static-params-returning pages skip pre-rendering and fall back to
 * on-demand ISR (they already have `revalidate` + default `dynamicParams: true`), so the image
 * builds without a database and pages render normally on first request in the running container.
 */
export const skipStaticGeneration = process.env.SKIP_BUILD_STATIC_GENERATION === "1";
