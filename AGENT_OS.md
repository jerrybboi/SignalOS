# Binance Agent OS integration

SignalOS is built for the Binance Agent OS Mini Hackathon and uses Binance market capabilities as its runtime data layer. The hackathon V1 deliberately stays within public market-data scope so the core demo requires no account funding, private API key, or paid market-data plan.

## What the web app uses at runtime

The deployed SignalOS web app currently retrieves public Binance market data through Binance's public API endpoints for:

- tickers / 24h market statistics;
- candlesticks;
- order-book depth;
- funding-rate context when available.

Binance Agent OS is broader than MCP alone: Binance describes Agent OS as bringing together Binance APIs, MCP, Wallet Agentic Hub, x402, and Skill Hub. SignalOS V1 therefore uses the **Binance API component of Agent OS** for its deterministic market pipeline.

## MCP extension path

Official Binance MCP endpoint:

`https://agent.binance.com/mcp/agentic`

The current web V1 does **not** pretend that its server-side REST requests are MCP calls. MCP is documented as the next connection layer for compatible AI-agent clients and for future permissioned account/trading capabilities.

## SignalOS intelligence pipeline

1. **Observed** — live/public market observations from Binance.
2. **Derived** — volume ratio, momentum, volatility, depth imbalance, signal confidence inputs, thesis state, and Guard risk state calculated by SignalOS.
3. **Interpreted** — concise evidence-backed explanations generated from those structured observations.

The hackathon V1 does not request withdrawal permission and does not execute trades. Guard evaluates hypothetical actions only. Any future execution flow would require explicit Binance permission and user review.
