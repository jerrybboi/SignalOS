import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "SignalOS — From signal to decision",
  description: "AI market decision agent built with Binance Agent OS.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Nav/><main>{children}</main><footer><span>SignalOS</span><span>From signal to decision.</span><span>Built for Binance Agent OS</span></footer></body></html>;
}
