import { AuthProvider } from "@/contexts/AuthContext"
import { router } from "@/routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from "react-router-dom"

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>

      <AuthProvider>
        <RouterProvider router={router} />
        
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}

export default App
