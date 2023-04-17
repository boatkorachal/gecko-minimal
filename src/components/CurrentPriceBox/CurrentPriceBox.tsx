import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import { Stack, Typography } from "@mui/material"
import { green, red } from "@mui/material/colors"

import * as fmt from "@/utils/fmt"

export const CurrentPriceBox = ({ price, percentChange }: { price: number; percentChange: number }) => {
  const [Icon, color] = percentChange < 0 ? [ArrowDropDownIcon, red.A700] : [ArrowDropUpIcon, green.A700]
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="h4" fontWeight={700}>
        {fmt.usd(price)}
      </Typography>
      <Stack direction="row" alignItems="center">
        <Icon sx={{ color: color }} />
        <Typography color={color}>{fmt.float2(percentChange)}%</Typography>
      </Stack>
    </Stack>
  )
}
