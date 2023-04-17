/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MOCK_COINGECKO: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
