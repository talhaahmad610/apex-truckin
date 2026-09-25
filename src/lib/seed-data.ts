// Seed content — used as local fallback when Supabase isn't configured
// and as the source for supabase/seed.sql (scripts/generate-seed.ts).
import type { Post, Testimonial } from "../types/index.ts";

export const SEED_POSTS: Post[] = [
  {
    id: "8f1c2a4e-3b7d-4c1a-9e2f-0a1b2c3d4e01",
    title: "How to Find the Best Paying Loads as an Owner-Operator in 2025",
    slug: "best-paying-loads-owner-operator-2025",
    excerpt:
      "Load boards are only the starting line. Here's how top owner-operators plan lanes, read markets and negotiate to keep their RPM above $2.75 — even in a soft freight market.",
    meta_description:
      "Proven strategies owner-operators use to find the best paying loads in 2025: lane planning, market timing, broker relationships and rate negotiation.",
    cover_image_url: "/images/blog-best-loads.webp",
    published_at: "2025-06-12T14:00:00.000Z",
    created_at: "2025-06-12T14:00:00.000Z",
    category: "Owner-Operator",
    author: "Ryan Mitchell",
    read_time: 7,
    is_published: true,
    content: `
<p>The freight market in 2025 rewards carriers who plan, not carriers who react. Spot rates have stabilized after two years of oversupply, but the gap between an owner-operator averaging <strong>$2.10 a mile</strong> and one averaging <strong>$2.85</strong> has never been wider. The difference usually isn't the truck — it's the process behind every booked load.</p>

<h2>1. Stop thinking in loads. Think in loops.</h2>
<p>The single most expensive mistake we see is booking the highest-paying outbound load without checking where it leaves you. A $3.40/mile load into South Florida looks great until you're sitting two days waiting on a $1.40 backhaul.</p>
<ul>
  <li>Before you book, check the outbound market from the <strong>delivery</strong> city on DAT or Truckstop.</li>
  <li>Calculate your average RPM across the full round trip — including deadhead — not just the headhaul.</li>
  <li>Build 3–4 day loops that end near home or in a strong outbound market.</li>
</ul>

<h2>2. Know your markets by day of week</h2>
<p>Freight has rhythm. Mondays and Thursdays tend to post the most loads, and Friday afternoon is where desperate brokers pay premiums to cover weekend freight. Reefer rates spike in produce season — California and Arizona in spring, Georgia and the Carolinas in early summer, Texas in the fall.</p>
<blockquote>The best-paying load is almost never the first one posted. It's the one a broker still can't cover at 3 PM.</blockquote>

<h2>3. Build broker relationships that bypass the board</h2>
<p>Roughly half of the freight moved by mid-size brokers never touches a public load board. Those loads go to carriers the broker already trusts. Getting on that list takes consistency:</p>
<ol>
  <li>Deliver on time and send proactive check calls — before they ask.</li>
  <li>Send clean paperwork: signed rate con, BOL and POD the same day.</li>
  <li>After two or three good loads, ask directly: <em>"Do you have any recurring freight in this lane?"</em></li>
</ol>

<h2>4. Negotiate with data, not emotion</h2>
<p>Every rate negotiation should start with three numbers: the lane's 7-day average spot rate, your cost per mile, and the broker's likely margin. If the broker posts at $1,800 and the lane average is $2,300, you have room. Counter with the market data — brokers respond to carriers who sound like they know the lane.</p>

<h3>What to always negotiate</h3>
<ul>
  <li><strong>Detention:</strong> $50–$75/hour after 2 hours free time.</li>
  <li><strong>TONU:</strong> $150–$250 if the load cancels after dispatch.</li>
  <li><strong>Layover:</strong> $200–$300/day if appointments slip.</li>
  <li><strong>Tarp pay</strong> for flatbed, <strong>stop-off pay</strong> for multi-stops.</li>
</ul>

<h2>5. Know your true cost per mile</h2>
<p>You can't negotiate if you don't know your floor. Add fuel, truck and trailer payments, insurance, maintenance reserve, permits, ELD and your own salary, then divide by your monthly miles. Most owner-operators we onboard underestimate their cost per mile by 20–30 cents.</p>

<table>
  <thead><tr><th>Cost item</th><th>Typical monthly</th><th>Per mile (10,000 mi)</th></tr></thead>
  <tbody>
    <tr><td>Fuel</td><td>$6,200</td><td>$0.62</td></tr>
    <tr><td>Truck payment</td><td>$2,400</td><td>$0.24</td></tr>
    <tr><td>Insurance</td><td>$1,300</td><td>$0.13</td></tr>
    <tr><td>Maintenance reserve</td><td>$1,500</td><td>$0.15</td></tr>
    <tr><td>Other (ELD, permits, tolls)</td><td>$800</td><td>$0.08</td></tr>
  </tbody>
</table>

<h2>6. Let a dispatcher do the grinding</h2>
<p>Finding great loads is a full-time job. Searching boards, calling brokers, negotiating, submitting packets and chasing paperwork can eat 3–4 hours a day. A professional dispatcher lets you spend that time driving — and a good one pays for itself with higher rates and less deadhead.</p>
<p>At Apex Truckin, our dispatchers plan your week in loops, negotiate every accessorial and send every load for your approval. <a href="/contact">Talk to a dispatcher today</a> and see what your lanes should be paying.</p>
`.trim(),
  },
  {
    id: "8f1c2a4e-3b7d-4c1a-9e2f-0a1b2c3d4e02",
    title: "Dry Van vs Flatbed: Which Haul Type Is Right for Your Trucking Business?",
    slug: "dry-van-vs-flatbed",
    excerpt:
      "Dry van offers volume. Flatbed offers premiums. We break down startup costs, rates, workload and lifestyle so you can pick the equipment that fits your business.",
    meta_description:
      "Dry van vs flatbed trucking compared: startup costs, average rates per mile, workload, insurance and which equipment type is best for new owner-operators.",
    cover_image_url: "/images/blog-dryvan-vs-flatbed.webp",
    published_at: "2025-05-20T14:00:00.000Z",
    created_at: "2025-05-20T14:00:00.000Z",
    category: "Dispatch Tips",
    author: "Darnell Brooks",
    read_time: 6,
    is_published: true,
    content: `
<p>Choosing your equipment type is one of the biggest decisions you'll make as an owner-operator. It determines your startup cost, your weekly routine, the brokers you work with and, ultimately, your profit. Here's an honest look at the two most popular options.</p>

<h2>The quick comparison</h2>
<table>
  <thead><tr><th></th><th>Dry Van</th><th>Flatbed</th></tr></thead>
  <tbody>
    <tr><td>Avg. spot rate (2025)</td><td>$2.40 – $3.10/mi</td><td>$2.75 – $3.60/mi</td></tr>
    <tr><td>Used trailer cost</td><td>$25K – $40K</td><td>$30K – $55K + securement</td></tr>
    <tr><td>Load volume</td><td>Highest in the U.S.</td><td>Moderate, seasonal</td></tr>
    <tr><td>Physical workload</td><td>Low (mostly no-touch)</td><td>High (tarping, straps, chains)</td></tr>
    <tr><td>Competition</td><td>Very high</td><td>Lower</td></tr>
  </tbody>
</table>

<h2>Dry van: volume and simplicity</h2>
<p>Dry van freight is everywhere — consumer goods, retail replenishment, packaging, non-perishable food. That volume means you'll almost always find a load, which makes dry van the most forgiving choice for new authorities.</p>
<ul>
  <li><strong>Pros:</strong> easiest to learn, lowest physical demand, huge broker pool, dedicated lane opportunities.</li>
  <li><strong>Cons:</strong> most competitive rates, long dock wait times, easy to get stuck in low-paying markets.</li>
</ul>

<h2>Flatbed: skill pays</h2>
<p>Flatbed pays more because it's harder. Securement, tarping and weather exposure keep a lot of drivers out, which keeps rates higher. Construction, steel and lumber also create strong regional markets in the Southeast, Midwest and Texas.</p>
<ul>
  <li><strong>Pros:</strong> higher RPM, tarp pay, less competition, strong shipper relationships.</li>
  <li><strong>Cons:</strong> physically demanding, seasonal slowdowns in winter, more securement gear and training.</li>
</ul>

<blockquote>If you enjoy the work and have the experience, flatbed often out-earns dry van by $400–$900 a week.</blockquote>

<h2>Which is better for a new authority?</h2>
<p>For most new owner-operators with limited capital and no flatbed experience, <strong>dry van</strong> is the safer starting point. Broker setups are easier, insurance is usually cheaper and there's more freight to learn on. Experienced flatbed drivers, though, should strongly consider staying in flatbed — the skill premium is real.</p>

<h3>Consider a step deck</h3>
<p>If you're leaning flatbed, a step deck gives you access to both flatbed freight and taller machinery loads that pay a premium — a versatile middle ground.</p>

<h2>The bottom line</h2>
<p>Neither is "better" — it's about your experience, capital and lifestyle. Whichever you choose, the fastest way to profitability is smart lane planning and strong negotiation. Apex Truckin dispatches both, and we'll help you run the numbers before you buy. <a href="/services">Explore our dispatch services</a>.</p>
`.trim(),
  },
  {
    id: "8f1c2a4e-3b7d-4c1a-9e2f-0a1b2c3d4e03",
    title: "5 Signs You Need a Professional Truck Dispatcher (And How It Pays for Itself)",
    slug: "signs-you-need-a-truck-dispatcher",
    excerpt:
      "Spending hours on load boards, running empty miles and missing detention pay? These five warning signs mean a dispatcher could add thousands to your monthly revenue.",
    meta_description:
      "Five signs you need a professional truck dispatcher and the math on how dispatch services pay for themselves through higher rates and less deadhead.",
    cover_image_url: "/images/blog-dispatcher.webp",
    published_at: "2025-04-28T14:00:00.000Z",
    created_at: "2025-04-28T14:00:00.000Z",
    category: "Dispatch Tips",
    author: "Alicia Moreno",
    read_time: 5,
    is_published: true,
    content: `
<p>Most owner-operators start out booking their own loads. It makes sense — you know your truck and you want control. But as your business grows, doing it all yourself starts to cost more than it saves. Here are five signs it's time to bring in a professional.</p>

<h2>1. You spend more than two hours a day on load boards</h2>
<p>If you're refreshing DAT at every fuel stop and calling brokers from the sleeper, you're working two jobs. Those hours could be spent driving or resting — and fatigue is a real safety cost.</p>

<h2>2. Your deadhead is above 15%</h2>
<p>Every empty mile costs you fuel, wear and time. If more than 15% of your monthly miles are unpaid, your loads aren't being planned as loops. Dispatchers plan the next load before you deliver the current one.</p>

<h2>3. You rarely get paid detention or TONU</h2>
<p>Brokers only pay accessorials that are written into the rate confirmation. If you're not negotiating detention, layover and TONU on every load, you're leaving hundreds of dollars a month on the table.</p>

<h2>4. Paperwork keeps slipping</h2>
<p>Late PODs mean late payments. Missing broker packets mean missed loads. If invoicing and factoring submissions are piling up, cash flow will suffer — even if your rates are good.</p>

<h2>5. Your weekly revenue has plateaued</h2>
<p>If you've been stuck at the same weekly gross for months, you've probably hit the ceiling of what one person can negotiate and plan. A dispatcher brings market data, broker relationships and time you simply don't have.</p>

<h2>How a dispatcher pays for itself</h2>
<p>Let's run the numbers for a typical dry van owner-operator running 2,500 miles a week:</p>
<table>
  <thead><tr><th></th><th>Self-dispatched</th><th>With Apex</th></tr></thead>
  <tbody>
    <tr><td>Avg. RPM</td><td>$2.20</td><td>$2.60</td></tr>
    <tr><td>Weekly gross</td><td>$5,500</td><td>$6,500</td></tr>
    <tr><td>Accessorials collected</td><td>$50</td><td>$220</td></tr>
    <tr><td>Dispatch fee (5%)</td><td>—</td><td>–$325</td></tr>
    <tr><td><strong>Net weekly revenue</strong></td><td><strong>$5,550</strong></td><td><strong>$6,395</strong></td></tr>
  </tbody>
</table>
<p>That's roughly <strong>$3,600 more per month</strong> — after the dispatch fee — plus the hours back in your week.</p>

<blockquote>A great dispatcher isn't an expense. It's the highest-ROI hire an owner-operator can make.</blockquote>

<h2>What to look for in a dispatcher</h2>
<ul>
  <li>No forced dispatch — you approve every load.</li>
  <li>Transparent pricing with no hidden fees.</li>
  <li>24/7 availability, not just business hours.</li>
  <li>Experience with your specific equipment type.</li>
  <li>Weekly reporting on RPM, deadhead and revenue.</li>
</ul>
<p>If three or more of these signs sound familiar, it's time to talk. <a href="/contact">Get a free lane review from Apex Truckin</a>.</p>
`.trim(),
  },
];

export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: "5a0d7c1e-9b2f-4e3a-8c1d-7f6e5d4c3b01",
    carrier_name: "Marcus J.",
    truck_type: "Dry Van",
    rating: 5,
    review_text:
      "Apex Truckin found me loads paying 30% more than I was getting on my own. I haven't touched a load board in 6 months.",
    location: "Dallas, TX",
    is_featured: true,
    created_at: "2025-06-01T12:00:00.000Z",
  },
  {
    id: "5a0d7c1e-9b2f-4e3a-8c1d-7f6e5d4c3b02",
    carrier_name: "Sandra K.",
    truck_type: "Flatbed",
    rating: 5,
    review_text: "Professional, responsive, and they actually negotiate. Best dispatchers I've ever worked with.",
    location: "Atlanta, GA",
    is_featured: true,
    created_at: "2025-05-22T12:00:00.000Z",
  },
  {
    id: "5a0d7c1e-9b2f-4e3a-8c1d-7f6e5d4c3b03",
    carrier_name: "DeShawn W.",
    truck_type: "Reefer",
    rating: 5,
    review_text: "24/7 support is real. Called at 2am with a load issue and someone picked up immediately.",
    location: "Chicago, IL",
    is_featured: true,
    created_at: "2025-05-10T12:00:00.000Z",
  },
  {
    id: "5a0d7c1e-9b2f-4e3a-8c1d-7f6e5d4c3b04",
    carrier_name: "Carlos M.",
    truck_type: "Hotshot",
    rating: 5,
    review_text: "Went from 3 loads a week to 7. Apex keeps my truck rolling.",
    location: "Phoenix, AZ",
    is_featured: false,
    created_at: "2025-04-18T12:00:00.000Z",
  },
  {
    id: "5a0d7c1e-9b2f-4e3a-8c1d-7f6e5d4c3b05",
    carrier_name: "Jennifer T.",
    truck_type: "Box Truck",
    rating: 5,
    review_text: "They handle everything — rate cons, broker setup, paperwork. I just drive.",
    location: "Miami, FL",
    is_featured: false,
    created_at: "2025-03-30T12:00:00.000Z",
  },
];
