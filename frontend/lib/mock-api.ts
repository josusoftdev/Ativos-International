// Mock API utilities — simulates async server calls with delay

export async function mockDelay(ms = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export async function mockLogin(
  email: string,
  _password: string,
): Promise<ApiResponse<{ token: string; user: { name: string; email: string } }>> {
  await mockDelay(1200);

  // Simulate wrong credentials
  if (email === "erro@teste.com") {
    return { success: false, error: "Email ou senha inválidos." };
  }

  return {
    success: true,
    data: {
      token: "mock-jwt-token-xyz",
      user: { name: "Usuário Demo", email },
    },
  };
}

export async function mockRegister(
  name: string,
  email: string,
  _password: string,
): Promise<ApiResponse<{ message: string }>> {
  await mockDelay(1400);

  if (email === "existente@teste.com") {
    return { success: false, error: "Este email já está em uso." };
  }

  return {
    success: true,
    data: { message: `Bem-vindo, ${name}! Conta criada com sucesso.` },
  };
}

// CoinGecko mock data (used as fallback when API is unavailable)
export const MOCK_CRYPTOS = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    iconUrl: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    price: 188350.12,
    change24h: 2.53,
    marketCap: "R$ 3,5T",
    volume24h: "R$ 180B",
    rank: 1,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    iconUrl: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    price: 8200.45,
    change24h: -1.28,
    marketCap: "R$ 1,7T",
    volume24h: "R$ 60B",
    rank: 2,
  },
  {
    id: "binancecoin",
    name: "BNB",
    symbol: "BNB",
    iconUrl: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    price: 3450.0,
    change24h: 0.87,
    marketCap: "R$ 480B",
    volume24h: "R$ 12B",
    rank: 3,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    iconUrl: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    price: 780.0,
    change24h: 3.12,
    marketCap: "R$ 340B",
    volume24h: "R$ 25B",
    rank: 4,
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    iconUrl: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    price: 5.12,
    change24h: 4.16,
    marketCap: "R$ 280B",
    volume24h: "R$ 8B",
    rank: 5,
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    iconUrl: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    price: 0.58,
    change24h: -0.67,
    marketCap: "R$ 72B",
    volume24h: "R$ 4B",
    rank: 6,
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    iconUrl: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    price: 12.40,
    change24h: 1.95,
    marketCap: "R$ 620B",
    volume24h: "R$ 32B",
    rank: 7,
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    iconUrl: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    price: 38.50,
    change24h: -2.41,
    marketCap: "R$ 52B",
    volume24h: "R$ 3B",
    rank: 8,
  },
];

export const MOCK_NEWS = [
  {
    title: "Bitcoin alcança nova máxima histórica após anúncio de ETF",
    summary: "O Bitcoin ultrapassou a marca de R$ 200.000 após a aprovação de novos fundos de investimento em criptomoedas nos Estados Unidos.",
    date: "20 Mar 2026",
    source: "CryptoNews",
    url: "#",
    category: "Bitcoin",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=300&fit=crop",
  },
  {
    title: "Novo projeto DeFi atrai R$ 500 milhões em investimentos",
    summary: "Plataforma inovadora de finanças descentralizadas recebe aporte recorde de investidores institucionais de todo o mundo.",
    date: "18 Mar 2026",
    source: "DeFi Pulse",
    url: "#",
    category: "DeFi",
    imageUrl: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=600&h=300&fit=crop",
  },
  {
    title: "Reguladores discutem novas regras para criptomoedas",
    summary: "Governos de diversos países se reúnem para estabelecer diretrizes globais sobre regulamentação de ativos digitais.",
    date: "17 Mar 2026",
    source: "Financial Times",
    url: "#",
    category: "Regulação",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=300&fit=crop",
  },
  {
    title: "Solana supera Ethereum em volume de transações diário",
    summary: "A rede Solana processou mais de 5 milhões de transações em 24 horas, superando o Ethereum pela primeira vez na história.",
    date: "16 Mar 2026",
    source: "The Block",
    url: "#",
    category: "Solana",
    imageUrl: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=600&h=300&fit=crop",
  },
  {
    title: "Empresa brasileira lança stablecoin lastreada em real",
    summary: "Nova criptomoeda estável oferece alternativa nacional para transações e armazenamento de valor em reais digitais.",
    date: "15 Mar 2026",
    source: "Valor Econômico",
    url: "#",
    category: "Brasil",
    imageUrl: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&h=300&fit=crop",
  },
  {
    title: "Web3 ganha tração com parceria entre bancos tradicionais",
    summary: "Grandes bancos globais anunciam integração com protocolos descentralizados para pagamentos internacionais mais rápidos.",
    date: "14 Mar 2026",
    source: "Bloomberg Crypto",
    url: "#",
    category: "Web3",
    imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=300&fit=crop",
  },
];
