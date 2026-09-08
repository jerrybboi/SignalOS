export type Kline = {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  quoteVolume: number;
};

export type MarketSnapshot = {
  symbol: string;
  price: number;
  change24h: number;
  quoteVolume24h: number;
  volumeRatio: number;
  momentum4h: number;
  volatilityRatio: number;
  orderBookImbalance: number | null;
  fundingRate: number | null;
  klines: Kline[];
  observedAt: string;
};

const SPOT_BASE = "https://data-api.binance.vision";
const FUTURES_BASE = "https://fapi.binance.com";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`Binance request failed (${res.status})`);
  return res.json() as Promise<T>;
}

function avg(values: number[]) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

export async function getSnapshot(baseSymbol: string): Promise<MarketSnapshot> {
  const symbol = `${baseSymbol.toUpperCase()}USDT`;
  const [ticker, rawKlines, depth, funding] = await Promise.all([
    getJson<{ lastPrice: string; priceChangePercent: string; quoteVolume: string }>(`${SPOT_BASE}/api/v3/ticker/24hr?symbol=${symbol}`),
    getJson<Array<[number,string,string,string,string,string,number,string]>>(`${SPOT_BASE}/api/v3/klines?symbol=${symbol}&interval=1h&limit=25`),
    getJson<{ bids: [string,string][]; asks: [string,string][] }>(`${SPOT_BASE}/api/v3/depth?symbol=${symbol}&limit=50`).catch(() => null),
    getJson<{ lastFundingRate: string }>(`${FUTURES_BASE}/fapi/v1/premiumIndex?symbol=${symbol}`).catch(() => null),
  ]);

  const klines: Kline[] = rawKlines.map(k => ({
    openTime: k[0], open: Number(k[1]), high: Number(k[2]), low: Number(k[3]), close: Number(k[4]), volume: Number(k[5]), quoteVolume: Number(k[7]),
  }));

  const completed = klines.slice(0, -1);
  const latest = completed.at(-1) ?? klines.at(-1)!;
  const baseline = completed.slice(-21, -1);
  const baselineVolume = avg(baseline.map(k => k.quoteVolume));
  const volumeRatio = baselineVolume ? latest.quoteVolume / baselineVolume : 1;
  const recent5 = completed.slice(-5);
  const first4h = recent5[0]?.open ?? latest.open;
  const momentum4h = first4h ? ((latest.close - first4h) / first4h) * 100 : 0;
  const ranges = baseline.map(k => k.open ? ((k.high - k.low) / k.open) * 100 : 0);
  const latestRange = latest.open ? ((latest.high - latest.low) / latest.open) * 100 : 0;
  const baselineRange = avg(ranges);
  const volatilityRatio = baselineRange ? latestRange / baselineRange : 1;

  let orderBookImbalance: number | null = null;
  if (depth) {
    const bidNotional = depth.bids.reduce((sum,[p,q]) => sum + Number(p) * Number(q), 0);
    const askNotional = depth.asks.reduce((sum,[p,q]) => sum + Number(p) * Number(q), 0);
    if (bidNotional + askNotional > 0) orderBookImbalance = bidNotional / (bidNotional + askNotional);
  }

  return {
    symbol: baseSymbol.toUpperCase(), price: Number(ticker.lastPrice), change24h: Number(ticker.priceChangePercent), quoteVolume24h: Number(ticker.quoteVolume), volumeRatio, momentum4h, volatilityRatio, orderBookImbalance,
    fundingRate: funding ? Number(funding.lastFundingRate) : null, klines, observedAt: new Date().toISOString(),
  };
}

export async function getSnapshots(symbols: string[]) {
  const settled = await Promise.allSettled(symbols.map(getSnapshot));
  return settled.flatMap(r => r.status === "fulfilled" ? [r.value] : []);
}
