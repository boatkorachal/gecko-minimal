import { setupWorker } from "msw"

import { handlers } from "./coingecko/handlers"

export const worker = setupWorker(...handlers)
