import type { MarketSnapshot } from "./binance";

export type ThesisCondition = { label:string; met:boolean; critical?:boolean; observed:string };
export type Thesis = { title:string; statement:string; status:"VALID"|"WEAKENING"|"INVALID"; conditions:ThesisCondition[]; note:string };

export function buildThesis(m: MarketSnapshot): Thesis {
  const latest = m.klines.slice(0,-1).at(-1) ?? m.klines.at(-1)!;
  const breakout = latest.open;
  const bullish = m.change24h >= 0;
  const conditions: ThesisCondition[] = [
    { label:"Volume remains above 1.2× hourly baseline", met:m.volumeRatio>=1.2, observed:`${m.volumeRatio.toFixed(2)}×` },
    { label:`Price holds ${bullish?"above":"below"} the latest hourly open`, met:bullish?m.price>=breakout:m.price<=breakout, critical:true, observed:`$${m.price.toFixed(2)}` },
    { label:"Absolute funding remains below 0.05%", met:m.fundingRate==null||Math.abs(m.fundingRate)<.0005, observed:m.fundingRate==null?"Unavailable":`${(m.fundingRate*100).toFixed(4)}%` },
    { label:`Order-book pressure does not contradict the ${bullish?"bullish":"bearish"} move`, met:m.orderBookImbalance==null||(bullish?m.orderBookImbalance>=.45:m.orderBookImbalance<=.55), observed:m.orderBookImbalance==null?"Unavailable":`${Math.round(m.orderBookImbalance*100)}% bid` },
    { label:"Volatility remains below 2.5× baseline", met:m.volatilityRatio<2.5, critical:true, observed:`${m.volatilityRatio.toFixed(2)}×` },
  ];
  const brokenCritical = conditions.some(c=>c.critical&&!c.met);
  const met = conditions.filter(c=>c.met).length;
  const status:Thesis["status"] = brokenCritical ? "INVALID" : met < 4 ? "WEAKENING" : "VALID";
  const statement = `${m.symbol} remains ${bullish?"constructive":"under pressure"} while participation stays elevated, leverage remains controlled, and price structure does not reverse.`;
  const broken = conditions.filter(c=>!c.met).map(c=>c.label.toLowerCase());
  const note = broken.length ? `Watch: ${broken.join("; ")}.` : "All tracked conditions are currently satisfied.";
  return { title:`${m.symbol} ${bullish?"Momentum":"Downside"} Thesis`, statement, status, conditions, note };
}
