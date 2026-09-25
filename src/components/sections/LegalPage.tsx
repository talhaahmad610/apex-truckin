import { PageHero } from "./PageHero";

export function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={`Last updated ${updated}`} title={title} crumbs={[{ name: title, path }]} className="min-h-[50dvh]" />
      <section className="pb-24 md:pb-36">
        <div className="prose-apex mx-auto max-w-[820px] px-4 sm:px-8">{children}</div>
      </section>
    </>
  );
}
