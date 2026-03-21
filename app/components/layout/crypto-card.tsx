import Image from 'next/image';

type CryptoCardProps = {
  iconUrl: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: string;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function CryptoCard({ iconUrl, name, symbol, price, change24h, marketCap }: CryptoCardProps) {
  const isPositive = change24h >= 0;
  const changeClass = isPositive ? 'text-emerald-400' : 'text-rose-400';

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={iconUrl}
            alt={`${name} logo`}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-slate-700 bg-slate-800 object-contain"
            unoptimized
          />
          <div>
            <h3 className="text-lg font-bold text-slate-100">{name}</h3>
            <p className="text-sm text-slate-400 uppercase">{symbol}</p>
          </div>
        </div>
        <span className={`text-sm font-bold ${changeClass}`}>
          {isPositive ? '+' : ''}{change24h.toFixed(2)}%
        </span>
      </div>

      <div className="mt-4">
        <p className="text-xs text-slate-400">Preço</p>
        <p className="text-2xl font-bold text-slate-100">{formatCurrency(price)}</p>
      </div>

      <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
        <span>Market cap</span>
        <span>{marketCap}</span>
      </div>
    </div>
  );
}