import { CryptoCard } from "@/app/components/layout/crypto-card";
import { NewsCard } from "@/app/components/layout/news-card";
import { StatCard } from "@/app/components/ui/stat-card";
import { MARKET_CRYPTOS, MARKET_NEWS } from "@/app/lib/market-data";
import { TrendingUp, BarChart2, Globe } from "lucide-react";

export default function HomePage() {
  const totalMarketCap = "R$ 8,3T";
  const btcDominance = "42,3%";
  const activeCryptos = "14.820";

  return (
    <div className="page-enter space-y-10">
      {/* Hero */}
      <section>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Mercado ao vivo
          </span>
          <h1 className="text-3xl font-bold text-slate-100 md:text-4xl">
            Dashboard de Criptomoedas
          </h1>
          <p className="mt-1 text-slate-400">
            Acompanhe preços, variações e notícias do mercado em tempo real.
          </p>
        </div>
      </section>

      {/* Market overview stats */}
      <section className="stagger-1 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Market Cap Global"
          value={totalMarketCap}
          trend="up"
          trendValue="3,2% hoje"
          icon={<Globe size={16} />}
        />
        <StatCard
          label="Dominância BTC"
          value={btcDominance}
          trend="neutral"
          sub="vs. semana anterior"
          icon={<TrendingUp size={16} />}
        />
        <StatCard
          label="Criptos Ativas"
          value={activeCryptos}
          trend="up"
          trendValue="+42 este mês"
          icon={<BarChart2 size={16} />}
        />
      </section>

      {/* Crypto grid */}
      <section className="stagger-2">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-100">
            Top Criptomoedas
          </h2>
          <span className="text-xs text-slate-500">Dados em BRL</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MARKET_CRYPTOS.map((crypto) => (
            <CryptoCard
              key={crypto.id}
              iconUrl={crypto.iconUrl}
              name={crypto.name}
              symbol={crypto.symbol}
              price={crypto.price}
              change24h={crypto.change24h}
              marketCap={crypto.marketCap}
              volume24h={crypto.volume24h}
              rank={crypto.rank}
            />
          ))}
        </div>
      </section>

      {/* News grid */}
      <section className="stagger-3">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-100">
              Últimas Notícias
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Fique por dentro do mercado cripto
            </p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MARKET_NEWS.map((item, index) => (
            <NewsCard
              key={index}
              title={item.title}
              summary={item.summary}
              date={item.date}
              source={item.source}
              url={item.url}
              imageUrl={item.imageUrl}
              category={item.category}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
