export const calculateMaximumProfit = (prices: number[]): number => {
  let lowestBuy = Infinity
  let maxProfit = 0
  for (let price of prices) {
    lowestBuy = Math.min(lowestBuy, price)
    maxProfit = Math.max(maxProfit, price - lowestBuy)
  }
  return maxProfit
}
