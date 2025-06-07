import { useRoutes } from 'react-router'
import { Toaster } from 'sonner'
import Header from './components/header'
import routes from './router'

function App() {
  const element = useRoutes(routes)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      {element}
      <Toaster richColors position="top-right" />
    </div>
  )
}

export default App
