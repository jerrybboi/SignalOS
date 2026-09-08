import Link from "next/link";
import { MetricCard } from "@/components/MetricCard";

export default function Home(){
  return <div className="page">
    <section className="hero">
      <div><p className="eyebrow">AGENT ACTIVE</p><h1>Markets move.<br/><em>SignalOS watches.</em></h1><p>Your AI market agent detects opportunities, investigates the why, builds theses and checks risk — so you can make clearer decisions.</p><div className="actions"><Link className="btn primary" href="/radar">See Latest Signals →</Link><a className="btn secondary" href="#workflow">How It Works</a></div></div>
      <div className="hero-orb"><div className="pulse-ring"/><blockquote>“Attention is an edge.”<small>SignalOS</small></blockquote></div>
    </section>
    <section className="metrics"><MetricCard value="4" label="Active Signals" sub="↑ 2 new today"/><MetricCard value="3" label="Active Theses" sub="2 valid · 1 weakening"/><MetricCard value="5" label="Risk Checks" sub="Today"/><MetricCard value="12" label="Assets Monitored" sub="Binance markets"/></section>
    <section className="grid-2" id="workflow"><article className="panel"><div className="panel-head"><h2>Agent Brief</h2><span>live market layer</span></div><p>SignalOS separates observed market data from derived signals and interpretation, then surfaces both supporting and contradicting evidence before a user acts.</p><Link href="/radar" className="text-link">Open Radar →</Link></article><article className="panel"><div className="panel-head"><h2>Top Signal Right Now</h2><span className="signal-chip">Volume Spike</span></div><h3>SOL <small>Solana</small></h3><div className="price-line"><strong>$148.21</strong><span className="positive">+5.4%</span></div><div className="confidence"><span style={{width:"82%"}}/></div><small>Condition confidence: 82%</small></article></section>
    <section className="grid-2"><article className="panel"><div className="panel-head"><h2>Agent Workflow</h2><Link href="/radar">Start →</Link></div><ul className="activity"><li>Radar detects unusual conditions <span>DETECT</span></li><li>MoveLens investigates evidence <span>INVESTIGATE</span></li><li>Thesis defines what must remain true <span>BUILD</span></li><li>Guard checks contextual trade risk <span>GUARD</span></li></ul></article><article className="panel quick-guard"><h2>Quick Guard</h2><p>Check a trade idea before you act.</p><Link className="guard-input" href="/guard">e.g. Buy 200 USDT of SOL <b>→</b></Link></article></section>
  </div>
}
