import { assert, describe, test } from "vitest"

import { calculateMaximumProfit } from "./calculateMaximumProfit"

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
const randomInts = (len: number, min: number, max: number) => {
  const ints = []
  for (let i = 0; i < len; i++) {
    ints.push(randomInt(min, max))
  }
  return ints
}

const bruteForceCalculateMaximumProfit = (prices: number[]) => {
  let maxProfit = 0
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      maxProfit = Math.max(maxProfit, prices[j] - prices[i])
    }
  }
  return maxProfit
}

describe("calculateMaximumProfit", () => {
  test("case 1 - empty price list", () => {
    assert.equal(calculateMaximumProfit([]), 0)
  })
  test("case 2 - single price", () => {
    assert.equal(calculateMaximumProfit([1]), 0)
  })
  test("case 3 - buy then sell", () => {
    assert.equal(calculateMaximumProfit([1, 10]), 10 - 1)
  })
  test("case 4 - buy without sell", () => {
    assert.equal(calculateMaximumProfit([10, 9, 8, 1]), 0)
  })
  test("case 5 - sell at highest", () => {
    assert.equal(calculateMaximumProfit([1, 7, 5, 10, 9, 8]), 10 - 1)
  })
  test("case 6 - higher profit", () => {
    assert.equal(calculateMaximumProfit([3, 4, 9, 1, 8]), 8 - 1)
  })
  test("case 7 - random", () => {
    const prices = randomInts(100, 1, 100)

    assert.equal(calculateMaximumProfit(prices), bruteForceCalculateMaximumProfit(prices))
  })
})
