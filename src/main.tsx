import React from "react"
import ReactDOM from "react-dom/client"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"

import { CssBaseline } from "@mui/material"

import { ThemeProvider } from "@emotion/react"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { DetailPage } from "@/pages/DetailPage"
import { SearchPage } from "@/pages/SearchPage"

import theme from "./theme"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
  },
  {
    path: "/:id",
    element: <DetailPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
    mutations: { retry: false },
  },
})

// Start the mocking conditionally.
// if (process.env.NODE_ENV === "development") {
//   const { worker } = await import("./mocks/browser")
//   await worker.start({
//     onUnhandledRequest(request, print) {
//       return
//     },
//   })
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
