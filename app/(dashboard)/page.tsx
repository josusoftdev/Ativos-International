import { Header } from '../components/layout/header';
import { CryptoCard } from '../components/layout/crypto-card';
import { NewsSection } from '../components/layout/news-section';
const cryptos = [
  {
    iconUrl: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 188350.12,
    change24h: 2.53,
    marketCap: 'R$ 3,5T',
  },
  {
    iconUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 8200.45,
    change24h: -1.28,
    marketCap: 'R$ 1,7T',
  },
  {
    iconUrl: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    name: 'Cardano',
    symbol: 'ADA',
    price: 5.12,
    change24h: 4.16,
    marketCap: 'R$ 280B',
  },
  {
    iconUrl: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.58,
    change24h: -0.67,
    marketCap: 'R$ 72B',
  },
];

const news = [
  {
    title: 'Bitcoin alcança nova máxima histórica após anúncio de ETF',
    summary: 'O Bitcoin ultrapassou a marca de R$ 200.000 após a aprovação de novos fundos de investimento em criptomoedas nos Estados Unidos.',
    date: '20 Mar 2026',
    source: 'CryptoNews',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=200&fit=crop',
  },
  {
    title: 'Novo projeto DeFi atrai R$ 500 milhões em investimentos',
    summary: 'Plataforma inovadora de finanças descentralizadas recebe aporte recorde de investidores institucionais.',
    date: '18 Mar 2026',
    source: 'DeFi Pulse',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=200&fit=crop',
  },
  {
    title: 'Reguladores discutem novas regras para criptomoedas',
    summary: 'Governos de diversos países se reúnem para estabelecer diretrizes globais sobre regulamentação de ativos digitais.',
    date: '17 Mar 2026',
    source: 'Financial Times',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop',
  },
  {
    title: 'NFTs de arte digital batem recorde de vendas mensais',
    summary: 'O mercado de tokens não fungíveis continua em crescimento, com vendas ultrapassando R$ 2 bilhões no último mês.',
    date: '16 Mar 2026',
    source: 'NFT World',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=400&h=200&fit=crop',
  },
  {
    title: 'Empresa brasileira lança stablecoin lastreada em real',
    summary: 'Nova criptomoeda estável oferece alternativa nacional para transações e armazenamento de valor em reais digitais.',
    date: '15 Mar 2026',
    source: 'Valor Econômico',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=200&fit=crop',
  },
];

export default function HomePage() {
  return (
    <div className='min-h-screen bg-[#050813] text-slate-100'>
      <Header />
      <main className='mx-auto max-w-6xl px-4 py-10'>
        <h1 className='text-3xl font-bold'>Dashboard de Criptomoedas</h1>
        <p className='mt-3 text-slate-300'>Veja os principais preços e variações do dia.</p>

        <section className='mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {cryptos.map((crypto) => (
            <CryptoCard
              key={crypto.symbol}
              iconUrl={crypto.iconUrl}
              name={crypto.name}
              symbol={crypto.symbol}
              price={crypto.price}
              change24h={crypto.change24h}
              marketCap={crypto.marketCap}
            />
          ))}
        </section>

        <h1 className='mt-8 text-3xl font-bold'>Notícias</h1>
        <p className='mt-3 text-slate-300'>Veja o que está acontecendo no mercado.</p>

        <NewsSection news={news} />
      </main>
    </div>
  );
}
