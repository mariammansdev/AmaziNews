import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


import { onCLS } from 'web-vitals';

// onCLS((metric) => {
//   // Put a breakpoint here if you want
//   console.log('[web-vitals] CLS update:', metric.value, metric);
// }, { reportAllChanges: true });

// // Ensure final value is delivered when page is hidden or navigated away
// addEventListener('visibilitychange', () => {
//   if (document.visibilityState === 'hidden') {
//     // Just touching onCLS again ensures final dispatch if pending:
//     onCLS((metric) => {
//       console.log('[web-vitals] CLS final (visibilitychange):', metric.value, metric);
//     });
//   }
// });



const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
        cacheTime: 10*60*1000,
        staleTime: 10*60*1000
      }
    }
})
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
     <App />
  </QueryClientProvider>
   
)
