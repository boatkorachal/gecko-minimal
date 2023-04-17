import { rest } from "msw"

import coinsIdBitcoinOHLC1d from "./coins-id-bitcoin-ohlc-1d.json"
import coinsIdBitcoinOHLC7d from "./coins-id-bitcoin-ohlc-7d.json"
import coinsIdBitcoinOHLC30d from "./coins-id-bitcoin-ohlc-30d.json"
import coinsIdBitcoinOHLC365d from "./coins-id-bitcoin-ohlc-365d.json"
import coinsIdBitcoinOHLCAll from "./coins-id-bitcoin-ohlc-all.json"
import coinsIdBitcoin from "./coins-id-bitcoin.json"
import coinsList from "./coins-list.json"
import searchTrending from "./search-trending.json"
import search from "./search.json"

export const handlers = [
  rest.get("https://api.coingecko.com/api/v3/coins/list", (req, res, ctx) => {
    return res(ctx.json(coinsList))
  }),
  rest.get("https://api.coingecko.com/api/v3/search", (req, res, ctx) => {
    return res(ctx.json(search))
  }),
  rest.get("https://api.coingecko.com/api/v3/search/trending", (req, res, ctx) => {
    return res(ctx.json(searchTrending))
  }),
  rest.get("https://api.coingecko.com/api/v3/coins/:id", (req, res, ctx) => {
    return res(ctx.json(coinsIdBitcoin))
  }),
  rest.get("https://api.coingecko.com/api/v3/coins/:id/ohlc", (req, res, ctx) => {
    const days = req.url.searchParams.get("days")
    if (days === "1") return res(ctx.json(coinsIdBitcoinOHLC1d))
    else if (days === "7") return res(ctx.json(coinsIdBitcoinOHLC7d))
    else if (days === "30") return res(ctx.json(coinsIdBitcoinOHLC30d))
    else if (days === "365") return res(ctx.json(coinsIdBitcoinOHLC365d))
    else if (days === "max") return res(ctx.json(coinsIdBitcoinOHLCAll))
    else return res(ctx.json(coinsIdBitcoinOHLC7d))
  }),
]
