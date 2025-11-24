import { Toaster } from "@/components/ui/sonner"
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
      <Toaster position="top-right" richColors/>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}

export default App
