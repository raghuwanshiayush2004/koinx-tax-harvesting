// Mock Capital Gains API Response
export const mockCapitalGains = {
  capitalGains: {
    stcg: { profits: 1540, losses: 743 },
    ltcg: { profits: 1200, losses: 650 },
  },
};

// Mock Holdings API Response
export const mockHoldings = [
  {
    coin: "BTC",
    coinName: "Bitcoin",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    totalHoldings: 0.83776,
    averageBuyPrice: 65432.1,
    currentPrice: 66050.15,
    stcg: { gain: -1200, balance: 4.28 },
    ltcg: { gain: 2400, balance: 2.14 },
  },
  {
    coin: "ETH",
    coinName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    totalHoldings: 5.8736,
    averageBuyPrice: 1520.5,
    currentPrice: 1589.21,
    stcg: { gain: 55320.15, balance: 3.084 },
    ltcg: { gain: -88220.29, balance: 3.084 },
  },
  {
    coin: "USDT",
    coinName: "Tether",
    logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    totalHoldings: 3096.54,
    averageBuyPrice: 1.01,
    currentPrice: 1.0,
    stcg: { gain: -1200, balance: 1548.27 },
    ltcg: { gain: 2400, balance: 1548.27 },
  },
  {
    coin: "MATIC",
    coinName: "Polygon",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
    totalHoldings: 2210,
    averageBuyPrice: 2.05,
    currentPrice: 2.116,
    stcg: { gain: -1200, balance: 802 },
    ltcg: { gain: 2400, balance: 802 },
  },
  {
    coin: "ETH2",
    coinName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    totalHoldings: 5.8738,
    averageBuyPrice: 1520.5,
    currentPrice: 1589.21,
    stcg: { gain: 55320.15, balance: 3.084 },
    ltcg: { gain: -88220.29, balance: 3.084 },
  },
  {
    coin: "USDT2",
    coinName: "Tether",
    logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    totalHoldings: 3096.54,
    averageBuyPrice: 1.01,
    currentPrice: 1.0,
    stcg: { gain: -1200, balance: 1548.27 },
    ltcg: { gain: 2400, balance: 1548.27 },
  },
];

// Mock API functions (simulating async calls)
export const fetchCapitalGains = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockCapitalGains), 800));

export const fetchHoldings = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockHoldings), 1000));
