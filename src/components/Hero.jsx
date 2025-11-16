function Hero({ monetization }) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Interaktivni vodič kroz Novi Pazar uz AR
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Istraži znamenitosti, probaj lokalne specijalitete i rezerviši ture – sve na jednom mestu.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#recommended" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded">
              Počni istraživanje
            </a>
            <a href="#premium" className="bg-gray-900 hover:bg-black text-white font-semibold px-5 py-3 rounded">
              Premium sadržaj
            </a>
          </div>
          {monetization && (
            <div className="mt-8 p-4 rounded border border-blue-100 bg-blue-50/60">
              <p className="font-semibold text-gray-800">Kako aplikacija zarađuje</p>
              <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
                {monetization.streams?.map((s, i) => (
                  <li key={i}>{s.name} {s.range_eur_per_month && `(${s.range_eur_per_month}€)`} {s.percent && `- ${s.percent}%`} {s.price_eur && `- ${s.price_eur}€`}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl" />
          <div className="absolute -bottom-6 -left-6 bg-white shadow-lg rounded-lg p-4 w-56">
            <p className="text-sm font-semibold">AR Info: Altun-alem džamija</p>
            <p className="text-xs text-gray-600 mt-1">Usmeri kameru i saznaj istoriju, legende i zanimljivosti.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
