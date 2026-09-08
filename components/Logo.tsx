import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo-wrap">
      <Image src="/signalos-mark.svg" alt="SignalOS" width={34} height={34} priority />
      {!compact && <span className="logo-word">Signal<span>OS</span></span>}
    </div>
  );
}
