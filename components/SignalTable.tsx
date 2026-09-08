import Link from "next/link";

export const signals = [
  {symbol:"SOL",name:"Solana",type:"Volume Spike",price:"$148.21",change:"+5.4%",confidence:82,summary:"Trading volume 3.4× above baseline with strong spot activity."},
  {symbol:"BNB",name:"BNB",type:"Funding Anomaly",price:"$572.11",change:"+3.2%",confidence:76,summary:"Price rising while funding rates increase faster than spot."},
  {symbol:"ETH",name:"Ethereum",type:"Momentum Shift",price:"$3,342",change:"+2.6%",confidence:74,summary:"Breakout from recent range with stronger volume confirmation."},
  {symbol:"SUI",name:"Sui",type:"Order Book Imbalance",price:"$2.11",change:"+6.3%",confidence:69,summary:"Buy-side depth is materially stronger than sell-side depth."},
  {symbol:"TAO",name:"Bittensor",type:"Volatility Expansion",price:"$312.10",change:"+5.1%",confidence:66,summary:"Short-term volatility is 2.8× above its recent baseline."},
];

export function SignalTable(){return <div className="table-wrap"><table><thead><tr><th>#</th><th>Asset</th><th>Signal</th><th>Price</th><th>24h</th><th>Confidence</th><th>Summary</th><th/></tr></thead><tbody>{signals.map((s,i)=><tr key={s.symbol}><td>{i+1}</td><td><b>{s.symbol}</b><small>{s.name}</small></td><td><span className="signal-chip">{s.type}</span></td><td>{s.price}</td><td className="positive">{s.change}</td><td>{s.confidence}%</td><td>{s.summary}</td><td><Link className="btn secondary" href={`/investigate/${s.symbol.toLowerCase()}`}>Investigate →</Link></td></tr>)}</tbody></table></div>}
