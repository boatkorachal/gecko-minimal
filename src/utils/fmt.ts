import * as numerable from "numerable"
import dayjs from "dayjs"

export const date = (d: Date, format = "YYYY-MM-DD"): string => {
  return dayjs(d).format(format)
}

export const int = (n: number): string => {
  return numerable.format(n, "0,0")
}

export const usd = (n: number): string => {
  return numerable.format(n, "$$0,0.00")
}

export const float2 = (n: number): string => {
  return numerable.format(n, "0,0.0#")
}
