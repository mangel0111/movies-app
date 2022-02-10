import { QueryClient, QueryClientProvider } from 'react-query'

/**
 * FOR TESTING ONLY
 */
export const wrapper = ({ children }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

const withQueryClient = (Component) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>{Component}</QueryClientProvider>
  )
}
export default withQueryClient
