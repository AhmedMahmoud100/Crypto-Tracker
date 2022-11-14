import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CryptoContext } from './context/CurrencyContext'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CryptoContext>
        <App />
      </CryptoContext>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
)
