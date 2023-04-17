import { generatePath, useNavigate } from "react-router-dom"

import { Box, Container, Stack, Typography } from "@mui/material"

import { useQuery } from "@tanstack/react-query"

import coinGeckoClient from "@/clients/CoinGecko"
import { SearchBox } from "@/components/SearchBox"

export const SearchPage = () => {
  const navigate = useNavigate()
  const { data: trendingCoins } = useQuery({
    queryKey: ["TrendingCoins"],
    queryFn: () => coinGeckoClient.listTrendingCoins(),
  })
  const { data: allCoins } = useQuery({ queryKey: ["AllCoins"], queryFn: () => coinGeckoClient.listAllCoins() })

  const handleCoinSelect = (id: string) => {
    navigate(generatePath("/:id", { id }))
  }

  return (
    <Container>
      <Stack direction="column" alignItems="center" spacing={4} my={10}>
        <Typography variant="h1">Gecko Minimal</Typography>
        <Box width={700}>
          <SearchBox
            allCoins={allCoins || "loading"}
            trendingCoins={trendingCoins || "loading"}
            onCoinSelect={handleCoinSelect}
          />
        </Box>
      </Stack>
    </Container>
  )
}
