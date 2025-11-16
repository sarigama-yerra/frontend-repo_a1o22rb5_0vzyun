import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { Sections } from './components/Sections'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [monetization, setMonetization] = useState(null)

  useEffect(() => {
    fetch(`${baseUrl}/api/monetization`).then(r => r.json()).then(setMonetization).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero monetization={monetization} />
      <Sections />
      <footer className="border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} VisitPazar</p>
          <a href="/test" className="text-blue-600 hover:underline">Provera konekcije</a>
        </div>
      </footer>
    </div>
  )
}

export default App
