import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}

function MapEmbed({ center = { lat: 43.1367, lng: 20.5122 }, zoom = 13, query = 'Novi Pazar' }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-white">
      <div className="p-3 text-sm text-gray-700 flex items-center justify-between">
        <span>Mapa: {query}</span>
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Otvori u Google Maps</a>
      </div>
      <iframe
        title="Google Maps"
        className="w-full h-72"
        loading="lazy"
        allowFullScreen
        src={src}
      />
    </div>
  )
}

function Card({ title, desc, badge, image, actions }) {
  return (
    <div className="rounded-lg border hover:shadow-md transition bg-white overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] bg-gray-100">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
        )}
        {badge && <span className="absolute top-2 left-2 text-xs px-2 py-1 bg-yellow-100 text-yellow-900 rounded">{badge}</span>}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <p className="font-semibold text-gray-900">{title}</p>
        {desc && <p className="text-sm text-gray-600 mt-1 line-clamp-3">{desc}</p>}
        {actions && actions.length > 0 && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {actions.map((a, i) => (
              <a key={i} href={a.href} target="_blank" rel="noreferrer" className="text-xs px-2 py-1 rounded border text-blue-700 border-blue-200 hover:bg-blue-50">
                {a.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PlaceCard({ place }) {
  const [thumb, setThumb] = useState(null)
  useEffect(() => {
    if ((!place.images || place.images.length === 0) && place.name) {
      fetch(`${baseUrl}/api/wiki/summary?title=${encodeURIComponent(place.name)}`)
        .then(r => r.json())
        .then((d) => {
          if (d.thumbnail) setThumb(d.thumbnail)
        })
        .catch(() => {})
    }
  }, [place])

  const image = (place.images && place.images[0]) || thumb
  const mapQ = place.latitude && place.longitude
    ? `${place.latitude},${place.longitude}`
    : place.address || place.name

  const actions = [
    { label: 'Mapa', href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQ)}` },
    { label: 'Wikipedia', href: `https://en.wikipedia.org/wiki/${encodeURIComponent((place.name || '').replace(/\s+/g, '_'))}` },
  ]

  return (
    <Card title={place.name} desc={place.description} badge={place.is_recommended ? 'Istaknuto' : undefined} image={image} actions={actions} />
  )
}

export function Sections() {
  const [recommended, setRecommended] = useState([])
  const [guides, setGuides] = useState([])
  const [events, setEvents] = useState([])
  const [premium, setPremium] = useState([])
  const [seeded, setSeeded] = useState(false)

  const loadAll = async () => {
    try {
      const [r1, r2, r3, r4] = await Promise.all([
        fetch(`${baseUrl}/api/recommended`).then(r => r.json()),
        fetch(`${baseUrl}/api/guides`).then(r => r.json()),
        fetch(`${baseUrl}/api/events`).then(r => r.json()),
        fetch(`${baseUrl}/api/premium`).then(r => r.json()),
      ])
      setRecommended(Array.isArray(r1) ? r1 : [])
      setGuides(Array.isArray(r2) ? r2 : [])
      setEvents(Array.isArray(r3) ? r3 : [])
      setPremium(Array.isArray(r4) ? r4 : [])

      if ((Array.isArray(r1) && r1.length === 0) && !seeded) {
        await seedDemo()
        setSeeded(true)
        // reload after seeding
        const r = await fetch(`${baseUrl}/api/recommended`).then(r => r.json())
        setRecommended(Array.isArray(r) ? r : [])
      }
    } catch (e) {
      // silent
    }
  }

  const seedDemo = async () => {
    const demoPlaces = [
      { name: 'Altun-Alem Mosque', type: 'znamenitost', address: 'Novi Pazar', is_recommended: true, latitude: 43.1328, longitude: 20.5166, tags: ['historija','ar'] },
      { name: 'Sopoćani Monastery', type: 'znamenitost', address: 'Ras', is_recommended: true, latitude: 43.1474, longitude: 20.3737, tags: ['UNESCO','kultura'] },
      { name: 'Stari Ras', type: 'znamenitost', address: 'Novi Pazar', is_recommended: true, latitude: 43.1350, longitude: 20.5170, tags: ['UNESCO'] },
      { name: 'Novi Pazar Fortress', type: 'znamenitost', address: 'Novi Pazar', is_recommended: true, latitude: 43.1367, longitude: 20.5122, tags: ['tvrđava'] },
      { name: 'Restoran Vrelo', type: 'restoran', address: 'Novi Pazar', is_recommended: true, tags: ['hrana'] },
    ]
    for (const p of demoPlaces) {
      try {
        await fetch(`${baseUrl}/api/places`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) })
      } catch (e) {}
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  return (
    <div className="bg-gray-50">
      <Section id="recommended" title="Preporučena mesta" subtitle="Restorani, hoteli, muzeji i znamenitosti">
        <div className="mb-6">
          <MapEmbed query="Novi Pazar" />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recommended.length === 0 && <p className="text-gray-500">Učitavanje preporučenih mesta...</p>}
          {recommended.map((p, i) => (
            <PlaceCard key={i} place={p} />
          ))}
        </div>
      </Section>

      <Section id="guides" title="Vodiči" subtitle="Lokalni vodiči spremni za ture">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {guides.length === 0 && <p className="text-gray-500">Dodajte prvog vodiča iz admin dela.</p>}
          {guides.map((g, i) => (
            <Card key={i} title={g.name} desc={g.bio} image={g.avatar_url} />
          ))}
        </div>
      </Section>

      <Section id="events" title="Događaji" subtitle="Kalendar kulturnih dešavanja">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events.length === 0 && <p className="text-gray-500">Trenutno nema događaja.</p>}
          {events.map((e, i) => (
            <Card key={i} title={e.title} desc={e.description} image={e.image_url} />
          ))}
        </div>
      </Section>

      <Section id="premium" title="Premium vodiči i AR ture" subtitle="Ekskluzivan sadržaj (1-3€)">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {premium.length === 0 && <p className="text-gray-500">Uskoro dostupno.</p>}
          {premium.map((p, i) => (
            <Card key={i} title={p.title} desc={p.description} badge="Premium" image={p.asset_url} />
          ))}
        </div>
      </Section>
    </div>
  )
}
