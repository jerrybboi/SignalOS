# SignalOS

**From signal to decision.**

SignalOS is an AI market-decision agent built for the Binance Agent OS Mini Hackathon (Track A). It turns live Binance market conditions into a four-stage workflow: detect what deserves attention, investigate the evidence, define what must remain true, and check the contextual risk of a proposed action before the user acts.

## Live app

Production: https://signalos-agent.netlify.app

## Demo / Hackathon submission

X demo: https://x.com/dfw_jerryboi/status/2097435071334474219

## Core workflow

**Radar → MoveLens → Thesis → Guard**

- **Radar** ranks unusual market conditions such as volume expansion, momentum shifts, funding anomalies, volatility expansion, and order-book imbalance.
- **MoveLens** investigates the selected asset and separates supporting evidence from contradicting/risk evidence.
- **Thesis** converts the investigation into explicit conditions that can be **VALID**, **WEAKENING**, or **INVALID**.
- **Guard** evaluates a hypothetical buy/sell action against current conditions without executing a trade.

## Data honesty

SignalOS keeps three layers distinct:

1. **Observed** — market data retrieved from Binance public market-data endpoints.
2. **Derived** — metrics such as volume ratio, momentum, volatility ratio, depth imbalance, confidence inputs, thesis state, and Guard risk state calculated by SignalOS.
3. **Interpreted** — concise explanations based on those structured observations.

A SignalOS confidence score is confidence in the detected market condition, **not** a probability that price will go up or down.

## Binance Agent OS

The project is designed around Binance Agent OS market capabilities and documents the Agent OS MCP endpoint in [`AGENT_OS.md`](./AGENT_OS.md). The hackathon V1 deliberately uses public market-data scope so the demo does not require account funding or trade execution.

## $0 build constraint

SignalOS is designed to be developed, deployed, and demonstrated for **$0**.

The V1 requires:

- no paid market-data API;
- no paid AI credits;
- no database;
- no trading capital;
- no autonomous execution.

## Stack

- Next.js 15
- React 19
- TypeScript
- Binance public market-data capabilities / Agent OS architecture
- Netlify
- GitHub

## Routes

- `/` — live agent overview
- `/radar` — ranked market conditions
- `/investigate/[symbol]` — MoveLens investigation
- `/theses` — thesis overview
- `/theses/[id]` — live thesis conditions
- `/guard` — contextual trade-risk check

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Safety

SignalOS is decision support, not an autonomous trading bot. It does not promise profit, does not treat signals as guaranteed future-price predictions, surfaces contradicting evidence, and does not execute trades in the hackathon V1.

## Hackathon demo

See [`SUBMISSION.md`](./SUBMISSION.md) for the golden demo path, suggested 60–90 second voiceover, and final submission checklist.
