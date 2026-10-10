import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categories, gigs } from '../data/marketplace'
import GigCard from '../components/GigCard'
import { card, chip, kicker, muted } from '../ui'

export default function Gigs() {
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || 'all'
  const q = (params.get('q') || '').toLowerCase()

  const list = useMemo(() => {
    return gigs.filter((g) => {
      const okCat = cat === 'all' || g.category === cat
      const okQ = !q || `${g.title} ${g.tags.join(' ')} ${g.desc}`.toLowerCase().includes(q)
      return okCat && okQ
    })
  }, [cat, q])

  return (
    <div className="pt-7 pb-2">
      <p className={kicker}>Gig catalog</p>
      <h1>Ready-made offers with a price on the door.</h1>
      <p className={muted}>Fiverr energy: packages, reviews, and a starting rate.</p>
      <div className="my-4 mb-5 flex flex-wrap gap-2">
        <button className={chip(cat === 'all')} onClick={() => setParams({})}>
          All
        </button>
        {categories.map((c) => (
          <button key={c.id} className={chip(cat === c.id)} onClick={() => setParams({ cat: c.id })}>
            {c.label}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <div className={`${card} p-8 text-center text-muted`}>No gigs match that filter.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((g) => (
            <GigCard key={g.id} gig={g} />
          ))}
        </div>
      )}
    </div>
  )
}
