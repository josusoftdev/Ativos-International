import { Badge } from "@/app/components/ui/badge";

interface NewsCardProps {
  title: string;
  summary: string;
  date: string;
  source: string;
  url: string;
  imageUrl?: string;
  category?: string;
}

export function NewsCard({
  title,
  summary,
  date,
  source,
  url,
  imageUrl,
  category,
}: NewsCardProps) {
  return (
    <article className="card-glow flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all duration-300">
      {imageUrl && (
        <div className="relative h-44 w-full bg-slate-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          {category && (
            <div className="absolute bottom-3 left-4">
              <Badge variant="info">{category}</Badge>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <span className="font-semibold text-indigo-400">{source}</span>
          <span>{date}</span>
        </div>

        <h3 className="text-base font-semibold leading-snug text-slate-100 line-clamp-2">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-3 flex-1">
          {summary}
        </p>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Ler mais
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  );
}
