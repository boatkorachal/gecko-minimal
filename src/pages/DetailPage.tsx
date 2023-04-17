import React from "react"
import { generatePath, useNavigate, useParams } from "react-router-dom"

import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material"

import { useQuery } from "@tanstack/react-query"

import * as fmt from "@/utils/fmt"
import coinGeckoClient, { OHLCDayOptions } from "@/clients/CoinGecko"
import { CoinHighchart } from "@/components/CoinChart"
import { CurrentPriceBox } from "@/components/CurrentPriceBox"
import { SearchBoxCmdKButton } from "@/components/SearchBox"

const DEFAULT_CHART_DATE_RANGE: OHLCDayOptions = "7d"

export const DetailPageWithParams = ({ id }: { id: string }) => {
  const navigate = useNavigate()
  const [chartDateRange, setChartDateRange] = React.useState<OHLCDayOptions>(DEFAULT_CHART_DATE_RANGE)
  const { data: trendingCoins } = useQuery({
    queryKey: ["TrendingCoins"],
    queryFn: () => coinGeckoClient.listTrendingCoins(),
  })
  const { data: allCoins } = useQuery({ queryKey: ["AllCoins"], queryFn: () => coinGeckoClient.listAllCoins() })

  const { data: coinInfo } = useQuery({
    queryKey: ["CoinInfo", id],
    queryFn: () => coinGeckoClient.getCoinInfo(id),
  })
  const { data: ohlcPrices } = useQuery({
    queryKey: ["CoinOHLC", id, chartDateRange],
    queryFn: () => coinGeckoClient.getCoinOHLCPrices(id, chartDateRange),
  })

  const handleCoinSelect = (id: string) => {
    navigate(generatePath("/:id", { id }))
  }

  const handleChartDateRangeChange = (_e: React.MouseEvent<HTMLElement>, newChartDateRange: OHLCDayOptions) => {
    setChartDateRange(newChartDateRange)
  }

  return (
    <Container sx={{ pt: "64px" }}>
      <AppBar color="inherit" elevation={1} sx={{ alignItems: "center", height: "64px" }}>
        <Toolbar disableGutters>
          <SearchBoxCmdKButton
            allCoins={allCoins || "loading"}
            trendingCoins={trendingCoins || "loading"}
            onCoinSelect={handleCoinSelect}
          />
        </Toolbar>
      </AppBar>
      {coinInfo && (
        <Container>
          <Stack direction="row" spacing={2} mt={4} alignItems="center">
            <Avatar sx={{ width: 40, height: 40, alignSelf: "center" }} src={coinInfo.imageUrl} />
            <Typography variant="h4">
              {coinInfo.name}{" "}
              <Typography component="span" variant="h6" color="text.secondary">
                {coinInfo.symbol}
              </Typography>
            </Typography>
            {coinInfo.marketCapRank && (
              <Chip label={`#${fmt.int(coinInfo.marketCapRank)}`} variant="outlined" size="small" />
            )}
          </Stack>
          <Box mt={1} ml={7}>
            <CurrentPriceBox price={coinInfo.currentPrice} percentChange={coinInfo.priceChangePct24hr} />
          </Box>

          <Grid container spacing={2} mt={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ px: 3, py: 2, minHeight: 500 }}>
                <Stack direction="row" justifyContent="center" py={2}>
                  <ToggleButtonGroup
                    exclusive
                    size="small"
                    value={chartDateRange}
                    onChange={handleChartDateRangeChange}
                  >
                    {OHLCDayOptions.map((option) => (
                      <ToggleButton key={option} sx={{ px: 2 }} value={option}>
                        {option}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Stack>
                {ohlcPrices && <CoinHighchart key={chartDateRange} data={ohlcPrices} />}
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} pt={2} px={2}>
                  Statistics
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Market Cap</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">{fmt.usd(coinInfo.marketCap)}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>All-Time High</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">{fmt.usd(coinInfo.athPrice)}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>All-Time Low</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">{fmt.usd(coinInfo.atlPrice)}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
    </Container>
  )
}
export const DetailPage = () => {
  const { id } = useParams()
  if (!id) return null
  return <DetailPageWithParams id={id} />
}
