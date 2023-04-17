import React from "react"

import { Avatar, Box, Stack, Typography } from "@mui/material"

import { Command } from "cmdk"
import { matchSorter } from "match-sorter"

import "./SearchBox.scss"

export type Coin = {
  id: string
  symbol: string
  name: string
  thumb: string
  marketCapRank: number | null
}

const filterCoins = (coins: Coin[], search: string, length: number) => {
  // TODO: improve ranking
  return matchSorter(coins, search, {
    keys: ["symbol", "name"],
    sorter: (rankedItem) =>
      rankedItem.sort((a, b) =>
        // push null market cap rank to last
        a.item.marketCapRank === null
          ? 1
          : b.item.marketCapRank === null
          ? -1
          : a.item.marketCapRank - b.item.marketCapRank
      ),
  }).slice(0, length)
}

const CoinItemDisplay = (props: { symbol: string; name: string; thumb: string }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ width: 25, height: 25 }} src={props.thumb} />
      <Typography>{`${props.name} (${props.symbol})`}</Typography>
    </Stack>
  )
}

export type SearchBoxProps = {
  trendingCoins: "loading" | Coin[]
  allCoins: "loading" | Coin[]
  onCoinSelect: (id: string) => void
}
export const SearchBox = ({ allCoins, trendingCoins, onCoinSelect }: SearchBoxProps) => {
  const [searchText, setSearchText] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef.current])

  const trimmedSearchText = searchText.trim()
  const displayState =
    trimmedSearchText === ""
      ? {
          type: "trendings" as const,
          items: trendingCoins === "loading" ? [] : trendingCoins,
        }
      : {
          type: "search" as const,
          items: allCoins === "loading" ? [] : filterCoins(allCoins, trimmedSearchText, 20),
        }

  return (
    <Box className="raycast" width="100%">
      <Command shouldFilter={false} loop>
        <Command.Input value={searchText} onValueChange={setSearchText} ref={inputRef} />
        {displayState.type === "trendings" && (
          <Command.List>
            <Command.Group heading={<Typography variant="h6">🔥&nbsp;&nbsp;Trendings</Typography>}>
              {displayState.items.map((item) => (
                <Command.Item key={item.id} value={item.id} onSelect={onCoinSelect}>
                  <CoinItemDisplay name={item.name} symbol={item.symbol} thumb={item.thumb} />
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        )}
        {displayState.type === "search" && (
          <Command.List>
            {displayState.items.map((item) => (
              <Command.Item key={item.id} value={item.id} onSelect={onCoinSelect}>
                <CoinItemDisplay name={item.name} symbol={item.symbol} thumb={item.thumb} />
              </Command.Item>
            ))}
          </Command.List>
        )}
      </Command>
    </Box>
  )
}
