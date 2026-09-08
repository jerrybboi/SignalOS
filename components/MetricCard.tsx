export function MetricCard({value,label,sub}:{value:string;label:string;sub:string}){return <div className="metric-card"><strong>{value}</strong><span>{label}</span><small>{sub}</small></div>}
