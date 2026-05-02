import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WelcomeData } from "./components/WelcomData";
import './App.css';

const queryClient = new QueryClient();

export function App(){
  return (
    <QueryClientProvider client={queryClient}>
      <WelcomeData />
    </QueryClientProvider>
  );
}

export default App;