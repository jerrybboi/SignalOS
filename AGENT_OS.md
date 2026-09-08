# Binance Agent OS integration

SignalOS is built on Binance Agent OS market capabilities. The hackathon V1 deliberately uses only public market-data scope so the core demo requires no account funding or paid API.

## MCP endpoint

`https://agent.binance.com/mcp/agentic`

Binance documents public market-data access for tickers, order books, candlesticks and funding rates without authentication. SignalOS uses those market-data classes in its deterministic agent pipeline:

1. **Observed** — market data from Binance.
2. **Derived** — volume ratio, momentum, volatility, depth imbalance and thesis/risk state calculated by SignalOS.
3. **Interpreted** — concise evidence-backed explanation generated from those structured observations.

The application does not request withdrawal permission or execute trades. `Review Trade` is intentionally outside the hackathon V1 execution path.
