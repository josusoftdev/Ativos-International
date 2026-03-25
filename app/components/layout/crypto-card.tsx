import Image from "next/image";
import { Badge } from "@/app/components/ui/badge";

interface CryptoCardProps {
  iconUrl: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: string;
  volume24h?: string;
  rank?: number;
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: value >= 1 ? 2 : 6,
  }).format(value);
}

export function CryptoCard({
  iconUrl,
  name,
  symbol,
  price,
  change24h,
  marketCap,
  volume24h,
  rank,
}: CryptoCardProps) {
  const isPositive = change24h >= 0;

  return (
    <div className="card-glow group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm transition-all duration-300">
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image
              src={iconUrl}
              alt={`${name} logo`}
              fill
              className="rounded-full object-contain"
              unoptimized
            />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 leading-tight">{name}</h3>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {symbol}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          {rank && (
            <Badge variant="outline">#{rank}</Badge>
          )}
          <Badge variant={isPositive ? "success" : "danger"}>
            {isPositive ? "+" : ""}
            {change24h.toFixed(2)}%
          </Badge>
        </div>
      </div>

      {/* Price */}
      <div className="mt-4">
        <p className="text-2xl font-bold tracking-tight text-slate-100">
          {formatBRL(price)}
        </p>
        <p className="mt-0.5 text-xs text-slate-500">Preço atual em BRL</p>
      </div>

      {/* Footer */}
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-800 pt-4">
        <div>
          <p className="text-xs text-slate-500">Market Cap</p>
          <p className="text-sm font-medium text-slate-300">{marketCap}</p>
        </div>
        {volume24h && (
          <div>
            <p className="text-xs text-slate-500">Vol. 24h</p>
            <p className="text-sm font-medium text-slate-300">{volume24h}</p>
          </div>
        )}
      </div>
    </div>
  );
}
