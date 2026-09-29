import { getTestimonials } from "@/lib/cms";
import { json } from "@/lib/http";

export const dynamic = "force-dynamic";

/** GET /api/testimonials — all testimonials, featured first. */
export async function GET() {
  const data = await getTestimonials();
  const average = data.length ? Number((data.reduce((a, t) => a + t.rating, 0) / data.length).toFixed(2)) : null;
  return json({ data, meta: { count: data.length, average_rating: average } });
}
