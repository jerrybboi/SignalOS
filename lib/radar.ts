import type { MarketSnapshot } from "./binance";

export type SignalType = "Volume Spike" | "Momentum Shift" | "Funding Anomaly" | "Order Book Imbalance" | "Volatility Expansion";
export type RadarSignal = MarketSnapshot & { type: SignalType; confidence: number; summary: string; evidence: string[]; risks: string[] };
const clamp = (n:number,min=0,max=100)=>Math.max(min,Math.min(max,n));

export function classifySignal(m: MarketSnapshot): RadarSignal {
  const candidates: { type: SignalType; score: number }[] = [
    { type: "Volume Spike", score: clamp((m.volumeRatio - 1) * 45 + 50) },
    { type: "Momentum Shift", score: clamp(Math.abs(m.momentum4h) * 13 + 45) },
    { type: "Volatility Expansion", score: clamp((m.volatilityRatio - 1) * 38 + 50) },
    { type: "Funding Anomaly", score: m.fundingRate == null ? 0 : clamp(Math.abs(m.fundingRate) * 100000 + 35) },
    { type: "Order Book Imbalance", score: m.orderBookImbalance == null ? 0 : clamp(Math.abs(m.orderBookImbalance - .5) * 260 + 45) },
  ];
  const best = candidates.sort((a,b)=>b.score-a.score)[0];
  const evidence:string[]=[]; const risks:string[]=[];
  if (m.volumeRatio >= 1.5) evidence.push(`Volume is ${m.volumeRatio.toFixed(1)}× its recent hourly baseline`);
  if (m.momentum4h >= 2) evidence.push(`4h momentum is +${m.momentum4h.toFixed(1)}%`);
  if (m.momentum4h <= -2) evidence.push(`4h momentum is ${m.momentum4h.toFixed(1)}%`);
  if (m.orderBookImbalance != null && m.orderBookImbalance >= .58) evidence.push(`Top-of-book depth is bid-heavy (${Math.round(m.orderBookImbalance*100)}% bid share)`);
  if (m.orderBookImbalance != null && m.orderBookImbalance <= .42) risks.push(`Top-of-book depth is ask-heavy (${Math.round((1-m.orderBookImbalance)*100)}% ask share)`);
  if (m.volatilityRatio >= 1.5) risks.push(`Hourly range is ${m.volatilityRatio.toFixed(1)}× its recent baseline`);
  if (m.fundingRate != null && Math.abs(m.fundingRate) >= .0005) risks.push(`Funding is elevated at ${(m.fundingRate*100).toFixed(3)}%`);
  if (!evidence.length) evidence.push("Market activity deviates from its recent baseline");
  if (!risks.length) risks.push("No major contradiction detected in the current snapshot");
  const direction = m.change24h >= 0 ? "up" : "down";
  return { ...m, type: best.type, confidence: Math.round(best.score), summary: `${m.symbol} is ${direction} ${Math.abs(m.change24h).toFixed(1)}% over 24h; ${best.type.toLowerCase()} is the strongest detected condition.`, evidence, risks };
}
export function rankSignals(markets: MarketSnapshot[]) { return markets.map(classifySignal).sort((a,b)=>b.confidence-a.confidence); }
