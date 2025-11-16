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

function Card({ title, desc, badge }) {
  return (
    <div className="rounded-lg border p-4 hover:shadow-md transition bg-white">
      {badge && <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">{badge}</span>}
      <p className="mt-1 font-semibold">{title}</p>
      {desc && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{desc}</p>}
    </div>
  )
}

export function Sections() {
  const [recommended, setRecommended] = useState([])
  const [guides, setGuides] = useState([])
  const [events, setEvents] = useState([])
  const [premium, setPremium] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}/api/recommended`).then(r => r.json()).then(setRecommended).catch(() => {})
    fetch(`${baseUrl}/api/guides`).then(r => r.json()).then(setGuides).catch(() => {})
    fetch(`${baseUrl}/api/events`).then(r => r.json()).then(setEvents).catch(() => {})
    fetch(`${baseUrl}/api/premium`).then(r => r.json()).then(setPremium).catch(() => {})
  }, [])

  return (
    <div className="bg-gray-50">
      <Section id="recommended" title="Preporučena mesta" subtitle="Restorani, hoteli, muzeji">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recommended.length === 0 && <p className="text-gray-500">Nema istaknutih mesta još uvek.</p>}
          {recommended.map((p, i) => (
            <Card key={i} title={p.name} desc={p.description} badge="Istaknuto" />
          ))}
        </div>
      </Section>

      <Section id="guides" title="Vodiči" subtitle="Lokalni vodiči spremni za ture">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {guides.length === 0 && <p className="text-gray-500">Još nema vodiča.</p>}
          {guides.map((g, i) => (
            <Card key={i} title={g.name} desc={g.bio} />
          ))}
        </div>
      </Section>

      <Section id="events" title="Događaji" subtitle="Kalendar kulturnih dešavanja">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events.length === 0 && <p className="text-gray-500">Trenutno nema događaja.</p>}
          {events.map((e, i) => (
            <Card key={i} title={e.title} desc={e.description} />
          ))}
        </div>
      </Section>

      <Section id="premium" title="Premium vodiči i AR ture" subtitle="Ekskluzivan sadržaj (1-3€)">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {premium.length === 0 && <p className="text-gray-500">Uskoro dostupno.</p>}
          {premium.map((p, i) => (
            <Card key={i} title={p.title} desc={p.description} badge="Premium" />
          ))}
        </div>
      </Section>
    </div>
  )
}
