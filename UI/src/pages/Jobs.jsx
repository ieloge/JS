import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMarket } from '../context/MarketplaceContext'
import { categories } from '../data/marketplace'
import JobCard from '../components/JobCard'
import { chip, kicker, muted } from '../ui'

export default function Jobs() {
  const { jobs } = useMarket()
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || 'all'
  const q = (params.get('q') || '').toLowerCase()

  const list = useMemo(() => {
    return jobs.filter((j) => {
      const okCat = cat === 'all' || j.category === cat
      const okQ = !q || `${j.title} ${j.desc} ${j.skills.join(' ')}`.toLowerCase().includes(q)
      return okCat && okQ
    })
  }, [jobs, cat, q])

  return (
    <div className="pt-7 pb-2">
      <p className={kicker}>Job board</p>
      <h1>Briefs with a budget. Pitch your approach.</h1>
      <p className={muted}>Upwork energy: proposals, client history, hourly or fixed.</p>
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
      <div className="grid gap-3 pb-10">
        {list.map((j) => (
          <JobCard key={j.id} job={j} />
        ))}
      </div>
    </div>
  )
}
