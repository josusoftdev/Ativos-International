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
  maxItems?: number;
};

export function NewsSection({ news, maxItems = 6 }: NewsSectionProps) {
  const displayedNews = news.slice(0, maxItems);

  return (
    <section className="mt-12">

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