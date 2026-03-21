type NewsCardProps = {
  title: string;
  summary: string;
  date: string;
  source: string;
  url: string;
  imageUrl?: string;
};

export function NewsCard({ title, summary, date, source, url, imageUrl }: NewsCardProps) {
  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-md hover:border-slate-600 transition-colors">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      <div className="space-y-3">
        <h3 className="text-xl font-bold text-slate-100 line-clamp-2">
          {title}
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
          {summary}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{source}</span>
          <span>{date}</span>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
        >
          Ler mais →
        </a>
      </div>
    </article>
  );
}