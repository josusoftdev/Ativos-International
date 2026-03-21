import Image from 'next/image';

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
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-slate-800">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback para imagem padrão se a URL falhar
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMWEyMDMxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+SW1hZ2VtIG5vw6NvIGRpc3BvbsOtdmVsPC90ZXh0Pgo8L3N2Zz4=';
            }}
          />
        </div>
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