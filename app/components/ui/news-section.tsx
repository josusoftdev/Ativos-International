import { NewsCard } from './news-card';

type NewsItem = {
  title: string;
  summary: string;
  date: string;
  source: string;
  url: string;
  imageUrl?: string;
};

type NewsSectionProps = {
  news: NewsItem[];
  title?: string;
  maxItems?: number;
};

export function NewsSection({ news, title = "Últimas Notícias", maxItems = 6 }: NewsSectionProps) {
  const displayedNews = news.slice(0, maxItems);

  return (
    <section className="mt-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">{title}</h2>
        <p className="text-slate-400">Fique por dentro das principais notícias do mercado</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedNews.map((newsItem, index) => (
          <NewsCard
            key={index}
            title={newsItem.title}
            summary={newsItem.summary}
            date={newsItem.date}
            source={newsItem.source}
            url={newsItem.url}
            imageUrl={newsItem.imageUrl}
          />
        ))}
      </div>

      {news.length > maxItems && (
        <div className="mt-8 text-center">
          <button className="rounded-md bg-indigo-600 px-6 py-2 font-semibold text-white shadow-sm transition hover:bg-indigo-500">
            Ver mais notícias
          </button>
        </div>
      )}
    </section>
  );
}