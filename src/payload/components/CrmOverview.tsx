import type { Payload } from "payload";

type Props = { payload: Payload };

const card: React.CSSProperties = {
  display: "block",
  padding: "18px 20px",
  borderRadius: 14,
  border: "1px solid var(--theme-elevation-150)",
  background: "var(--theme-elevation-50)",
  textDecoration: "none",
  color: "inherit",
  minWidth: 180,
  flex: "1 1 180px",
};

/** Admin dashboard summary: what needs attention in the CRM today. */
export async function CrmOverview({ payload }: Props) {
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const [fresh, due, subs] = await Promise.all([
    payload.count({ collection: "leads", where: { status: { equals: "new" } }, overrideAccess: true }),
    payload.count({
      collection: "leads",
      where: {
        and: [
          { followUpAt: { less_than_equal: endOfToday.toISOString() } },
          { status: { not_in: ["onboarded", "lost"] } },
        ],
      },
      overrideAccess: true,
    }),
    payload.count({ collection: "subscribers", where: { status: { equals: "active" } }, overrideAccess: true }),
  ]);

  const items = [
    { label: "New leads", value: fresh.totalDocs, href: "/admin/collections/leads?where[status][equals]=new", accent: fresh.totalDocs > 0 },
    {
      label: "Follow-ups due",
      value: due.totalDocs,
      href: `/admin/collections/leads?where[followUpAt][less_than_equal]=${encodeURIComponent(endOfToday.toISOString())}`,
      accent: due.totalDocs > 0,
    },
    { label: "Newsletter subscribers", value: subs.totalDocs, href: "/admin/collections/subscribers", accent: false },
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ margin: "0 0 12px", fontSize: 18 }}>Today at the dispatch desk</h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {items.map((i) => (
          <a key={i.label} href={i.href} style={{ ...card, borderColor: i.accent ? "#f5a623" : "var(--theme-elevation-150)" }}>
            <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, color: i.accent ? "#f5a623" : "inherit" }}>{i.value}</div>
            <div style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>{i.label}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
