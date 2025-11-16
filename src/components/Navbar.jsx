import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-blue-600" />
          <span className="font-bold text-lg">VisitPazar</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
          <a href="#recommended" className="hover:text-blue-600">Preporučeno</a>
          <a href="#guides" className="hover:text-blue-600">Vodiči</a>
          <a href="#events" className="hover:text-blue-600">Događaji</a>
          <a href="#premium" className="hover:text-blue-600">Premium</a>
          <Link to="/test" className="hover:text-blue-600">Test backend</Link>
        </nav>
        <a href="#admin" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-3 py-2 rounded">
          Dodaj sadržaj
        </a>
      </div>
    </header>
  )
}

export default Navbar
