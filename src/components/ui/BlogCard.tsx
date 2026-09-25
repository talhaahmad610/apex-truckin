import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/types";
import { formatDate, cn } from "@/lib/utils";

export function BlogCard({ post, featured = false, priority = false }: { post: Post; featured?: boolean; priority?: boolean }) {
  return (
    <article
      className={cn(
        "group bezel h-full transition-[transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] hover:border-amber/40 hover:shadow-[0_0_60px_-20px_rgba(245,166,35,0.45)]",
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={cn("bezel-core flex h-full flex-col overflow-hidden", featured && "md:grid md:grid-cols-2")}
      >
        <div className={cn("relative overflow-hidden", featured ? "aspect-[16/10] md:aspect-auto md:min-h-[26rem]" : "aspect-[16/10]")}>
          {post.cover_image_url ? (
            <Image
              src={post.cover_image_url}
              alt=""
              fill
              priority={priority}
              sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
              className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-grad opacity-30" />
          )}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f1117]/80 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber ring-1 ring-white/10">
            {post.category}
          </span>
        </div>
        <div className={cn("flex flex-1 flex-col p-6 md:p-7", featured && "md:justify-center md:p-12")}>
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time> · {post.read_time} min read
          </p>
          <h3
            className={cn(
              "mt-3 font-display font-bold uppercase leading-[1.02] text-white transition-colors group-hover:text-amber",
              featured ? "text-[clamp(2rem,3.4vw,3rem)]" : "text-[1.7rem]",
            )}
          >
            {post.title}
          </h3>
          {post.excerpt && <p className={cn("mt-3 text-muted", featured ? "text-base" : "line-clamp-3 text-sm")}>{post.excerpt}</p>}
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-semibold uppercase tracking-[0.18em] text-amber">
            Read more
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber/10 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-px">
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="bezel h-full" aria-hidden>
      <div className="bezel-core h-full overflow-hidden">
        <div className="aspect-[16/10] animate-pulse bg-white/5" />
        <div className="space-y-3 p-7">
          <div className="h-3 w-1/3 animate-pulse rounded bg-white/10" />
          <div className="h-6 w-5/6 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-full animate-pulse rounded bg-white/5" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}
