const BASE_URL = "https://api.coingecko.com/api/v3"

const COINS_LIST = "/coins/list"
const SEARCH_TRENDING = "/search/trending"
const SEARCH = "/search"
const COINS = (id: string) => `/coins/${id}`
const COINS_MARKET_CHART = (id: string, days: number) => `/coins/${id}/market_chart?vs_currency=usd&days=${days}`
const COINS_OHLC = (id: string, days: string) => `/coins/${id}/ohlc?vs_currency=usd&days=${days}`

export type Coin = {
  id: string
  symbol: string
  name: string
  thumb: string
  marketCapRank: number | null
}

export type CoinInfo = {
  id: string
  symbol: string
  name: string
  imageUrl: string
  currentPrice: number
  priceChangePct24hr: number
  marketCapRank: number | null
  marketCap: number
  athPrice: number
  athDate: Date
  atlPrice: number
  atlDate: Date
}
export type OHLCPrice = {
  date: Date
  open: number
  high: number
  low: number
  close: number
}

export const OHLCDayOptions = ["1d", "7d", "30d", "1y", "All"] as const
export type OHLCDayOptions = (typeof OHLCDayOptions)[number]

export class CoinGecko {
  #baseUrl: string

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl
  }

  // singleton
  private static instance: CoinGecko
  static getInstance(): CoinGecko {
    if (!CoinGecko.instance) {
      CoinGecko.instance = new CoinGecko(BASE_URL)
    }

    return CoinGecko.instance
  }

  async listAllCoins(): Promise<Coin[]> {
    type Data = {
      coins: {
        id: string
        name: string
        symbol: string
        thumb: string
        market_cap_rank: number | null
      }[]
    }
    const { coins } = await this.getJson<Data>(SEARCH)
    return coins.map(({ id, name, symbol, thumb, market_cap_rank }) => ({
      id,
      name,
      symbol,
      thumb,
      marketCapRank: market_cap_rank,
    }))
  }

  async listTrendingCoins(): Promise<Coin[]> {
    type Data = {
      coins: {
        item: {
          id: string
          name: string
          symbol: string
          thumb: string
          market_cap_rank: number | null
        }
      }[]
    }
    const { coins } = await this.getJson<Data>(SEARCH_TRENDING)
    return coins.map(({ item }) => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      thumb: item.thumb,
      marketCapRank: item.market_cap_rank,
    }))
  }

  async getCoinInfo(id: string): Promise<CoinInfo> {
    type Data = {
      id: string
      symbol: string
      name: string
      image: {
        small: string
      }
      market_cap_rank: number
      market_data: {
        current_price: {
          usd: number
        }
        price_change_percentage_24h_in_currency: {
          usd: number
        }
        market_cap: {
          usd: number
        }
        ath: {
          usd: number
        }
        ath_date: {
          usd: string
        }
        atl: {
          usd: number
        }
        atl_date: {
          usd: string
        }
      }
    }
    const data = await this.getJson<Data>(COINS(id))
    return {
      id: data.id,
      // TODO: check why symbol lowercase
      symbol: data.symbol.toUpperCase(),
      name: data.name,
      imageUrl: data.image.small,
      marketCapRank: data.market_cap_rank,
      marketCap: data.market_data.market_cap.usd,
      currentPrice: data.market_data.current_price.usd,
      priceChangePct24hr: data.market_data.price_change_percentage_24h_in_currency.usd,
      athPrice: data.market_data.ath.usd,
      athDate: new Date(data.market_data.ath_date.usd),
      atlPrice: data.market_data.atl.usd,
      atlDate: new Date(data.market_data.atl_date.usd),
    }
  }

  async getCoinOHLCPrices(id: string, dayOption: OHLCDayOptions): Promise<OHLCPrice[]> {
    type Data = [number, number, number, number, number][]
    const days = this.dayOptionToDay(dayOption)
    const data = await this.getJson<Data>(COINS_OHLC(id, days))
    return data.map(([d, o, h, l, c]) => ({ date: new Date(d), open: o, high: h, low: l, close: c }))
  }

  private async getJson<T>(path: string): Promise<T> {
    const res = await fetch(this.#baseUrl + path, { headers: { "Content-Type": "application/json" } })
    const json = await res.json()
    return json
  }

  private dayOptionToDay(dayOption: OHLCDayOptions): string {
    switch (dayOption) {
      case "1d":
        return "1"
      case "7d":
        return "7"
      case "30d":
        return "30"
      case "1y":
        return "365"
      case "All":
        return "max"
    }
  }
}

export default CoinGecko.getInstance()
