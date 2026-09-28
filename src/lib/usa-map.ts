// Simplified contiguous-USA outline + key freight cities, projected to a 960×430 viewBox.
// Equirectangular with a cos(38°) longitude correction — light enough to inline, accurate enough to read.

const OUTLINE: [number, number][] = [
  [-124.7, 48.4], [-123.1, 49.0], [-95.2, 49.0], [-94.8, 49.4], [-94.6, 48.7], [-91.4, 48.1], [-89.6, 48.0],
  [-88.4, 48.3], [-86.5, 46.6], [-84.8, 46.5], [-84.1, 46.2], [-83.5, 45.9], [-84.7, 45.8], [-85.5, 45.1],
  [-86.3, 44.2], [-86.5, 43.2], [-86.2, 42.4], [-87.2, 41.6], [-87.6, 42.2], [-87.9, 43.3], [-87.5, 44.8],
  [-87.8, 45.6], [-86.3, 45.9], [-85.0, 46.0], [-84.4, 45.6], [-83.4, 45.1], [-83.3, 44.3], [-82.9, 44.0],
  [-82.4, 43.0], [-83.1, 42.0], [-81.5, 41.8], [-79.8, 42.3], [-79.0, 42.8], [-79.2, 43.3], [-77.6, 43.3],
  [-76.4, 43.6], [-76.2, 44.2], [-74.7, 45.0], [-71.5, 45.0], [-70.9, 45.3], [-70.0, 46.7], [-69.2, 47.4],
  [-67.8, 47.1], [-67.8, 45.7], [-67.0, 44.8], [-68.8, 44.3], [-70.2, 43.6], [-70.8, 42.7], [-70.6, 42.0],
  [-70.0, 41.8], [-70.2, 41.6], [-71.4, 41.4], [-72.9, 41.2], [-73.9, 40.6], [-74.1, 39.7], [-75.0, 38.9],
  [-75.5, 38.4], [-75.2, 38.0], [-76.0, 37.0], [-75.7, 36.0], [-75.5, 35.2], [-76.6, 34.7], [-77.9, 33.9],
  [-79.2, 33.2], [-79.9, 32.7], [-81.1, 31.8], [-81.4, 30.4], [-81.2, 29.4], [-80.6, 28.4], [-80.1, 26.6],
  [-80.4, 25.2], [-81.1, 25.1], [-81.8, 26.1], [-82.7, 27.7], [-82.8, 29.2], [-84.0, 30.0], [-85.4, 29.7],
  [-86.5, 30.4], [-88.0, 30.4], [-89.5, 30.2], [-89.4, 29.0], [-90.2, 29.1], [-91.0, 29.3], [-92.3, 29.6],
  [-93.8, 29.7], [-95.0, 29.2], [-96.4, 28.3], [-97.2, 27.7], [-97.4, 26.0], [-98.5, 26.2], [-99.1, 26.5],
  [-99.5, 27.5], [-100.3, 28.3], [-101.4, 29.8], [-102.4, 29.8], [-103.1, 29.0], [-104.5, 29.7], [-105.0, 30.7],
  [-106.5, 31.8], [-108.2, 31.8], [-108.2, 31.3], [-111.1, 31.3], [-114.8, 32.5], [-117.1, 32.5], [-117.3, 33.2],
  [-118.4, 33.8], [-119.2, 34.1], [-120.6, 34.6], [-120.9, 35.4], [-121.9, 36.6], [-122.5, 37.8], [-123.0, 38.0],
  [-123.8, 39.8], [-124.4, 40.4], [-124.1, 41.7], [-124.2, 42.0], [-124.5, 43.0], [-124.1, 44.6], [-124.0, 46.2],
  [-124.1, 47.0], [-124.7, 48.4],
];

const W = 960;
const H = 430;
const LON0 = -125.5;
const LAT0 = 49.8;
const KX = 15.95;
const KY = KX / Math.cos((38 * Math.PI) / 180) * 0.78;

export function project(lon: number, lat: number): [number, number] {
  return [(lon - LON0) * KX + 12, (LAT0 - lat) * KY + 20];
}

export const USA_VIEWBOX = `0 0 ${W} ${H}`;

export const USA_PATH =
  OUTLINE.map(([lon, lat], i) => {
    const [x, y] = project(lon, lat);
    return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ") + " Z";

export const CITIES = {
  seattle: { name: "Seattle", ll: [-122.3, 47.6] },
  la: { name: "Los Angeles", ll: [-118.2, 34.05] },
  phoenix: { name: "Phoenix", ll: [-112.07, 33.45] },
  denver: { name: "Denver", ll: [-104.99, 39.74] },
  dallas: { name: "Dallas", ll: [-96.8, 32.78] },
  chicago: { name: "Chicago", ll: [-87.63, 41.88] },
  atlanta: { name: "Atlanta", ll: [-84.39, 33.75] },
  miami: { name: "Miami", ll: [-80.19, 25.76] },
  nyc: { name: "New York", ll: [-74.0, 40.71] },
  kc: { name: "Kansas City", ll: [-94.58, 39.1] },
} as const;

export type CityKey = keyof typeof CITIES;

export const cityXY = (k: CityKey) => project(CITIES[k].ll[0], CITIES[k].ll[1]);

/** Smooth route through cities as quadratic curves bowed slightly north. */
export function routePath(keys: CityKey[], bow = 0.12): string {
  const pts = keys.map(cityXY);
  let d = `M${pts[0]![0].toFixed(1)} ${pts[0]![1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]!;
    const [x1, y1] = pts[i]!;
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    const dx = x1 - x0;
    const dy = y1 - y0;
    const cx = mx + dy * bow;
    const cy = my - Math.abs(dx) * bow;
    d += ` Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  return d;
}

/**
 * Candidate main routes, one chosen at random per page load (CoverageMapSection). Index 0 is the
 * SSR default — rendered on the server and again on the client's first paint, so there is no
 * hydration mismatch; the random pick happens after mount via a direct DOM write, the same way
 * the truck's position is already updated outside of React state.
 */
export const ROUTES: CityKey[][] = [
  ["la", "phoenix", "dallas", "kc", "chicago", "nyc"],
  ["seattle", "denver", "kc", "chicago", "nyc"],
  ["la", "phoenix", "dallas", "atlanta", "miami"],
  ["seattle", "la", "phoenix", "dallas", "atlanta"],
  ["miami", "atlanta", "chicago", "nyc"],
  ["dallas", "kc", "chicago", "atlanta", "miami"],
];
export const MAIN_ROUTE: CityKey[] = ROUTES[0]!;
export const SIDE_ROUTES: CityKey[][] = [
  ["seattle", "denver", "kc"],
  ["dallas", "atlanta", "miami"],
  ["atlanta", "nyc"],
  ["la", "denver", "chicago"],
];
