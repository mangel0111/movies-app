
import Home from './Home/Home';
import { QueryClientProvider, QueryClient } from 'react-query';
 
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}
 
export default App;