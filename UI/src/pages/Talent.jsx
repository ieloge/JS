import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { talents } from '../data/marketplace'
import TalentCard from '../components/TalentCard'
import { kicker, muted } from '../ui'

export default function Talent() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').toLowerCase()
  const list = useMemo(() => {
    return talents.filter((t) => {
      return !q || `${t.name} ${t.title} ${t.tags.join(' ')} ${t.about}`.toLowerCase().includes(q)
    })
  }, [q])

  return (
    <div className="pt-7 pb-2">
      <p className={kicker}>Talent directory</p>
      <h1>People you can hire by the hour — or for a packaged gig.</h1>
      <p className={muted}>Success scores and hourly rates from the job world; levels from the gig world.</p>
      <div className="mt-[22px] grid grid-cols-1 gap-4 pb-10 md:grid-cols-2">
        {list.map((t) => (
          <TalentCard key={t.id} person={t} />
        ))}
      </div>
    </div>
  )
}
