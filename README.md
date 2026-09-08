# SignalOS

**From signal to decision.**

SignalOS is an AI market-decision agent built for the Binance Agent OS Mini Hackathon (Track A). It detects unusual market conditions, investigates supporting and contradicting evidence, builds falsifiable theses, and checks the risk of a proposed trade before a user acts.

## Core workflow

**Radar → MoveLens → Thesis → Guard**

- **Radar** detects abnormal market conditions.
- **MoveLens** investigates why a move is happening.
- **Thesis** turns an investigation into explicit, testable conditions.
- **Guard** evaluates a hypothetical trade against current conditions and thesis health.

## Build constraint

SignalOS is designed to be developed, deployed, and demoed for **$0**. The hackathon V1 does not require paid APIs, AI credits, a database, or trading capital.

## Stack

- Next.js
- React
- TypeScript
- Binance Agent OS / Binance public market-data capabilities
- Vercel
- Local browser persistence for hackathon V1

## Safety

SignalOS is decision support, not an autonomous trading bot. It separates observed market data from derived calculations and agent interpretation, surfaces contradictory evidence, and does not claim guaranteed outcomes.
