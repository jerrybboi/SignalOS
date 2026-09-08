"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Logo } from "./Logo";

const nav = [["/", "Home"],["/radar", "Radar"],["/theses", "Theses"],["/guard", "Guard"]] as const;

export function Nav() {
  const path = usePathname();
  return <header className="topbar"><Logo/><nav className="navlinks">{nav.map(([href,label])=>{const active=href==="/"?path==="/":path.startsWith(href);return <Link key={href} className={active?"active":""} href={href}>{label}</Link>})}</nav><div className="navtools"><div className="search"><Search size={15}/><span>Search assets or ask SignalOS...</span></div><span className="status-dot"/><span className="status-label">Agent Active</span><Bell size={18}/><div className="avatar">S</div></div></header>;
}
