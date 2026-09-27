import { NotFoundView } from "@/components/layout/NotFoundView";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return <NotFoundView />;
}
