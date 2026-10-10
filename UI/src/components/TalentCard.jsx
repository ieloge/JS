import { Link } from 'react-router-dom'
import { card, hoverLift, muted, pill, pillNavy } from '../ui'

export default function TalentCard({ person }) {
  return (
    <article className={`${card} ${hoverLift} p-4`}>
      <div className="flex gap-3">
        <img className="h-16 w-16 rounded-full object-cover" src={person.avatar} alt="" />
        <div>
          <Link to={`/talent/${person.id}`}>
            <h3>{person.name}</h3>
          </Link>
          <p className={muted}>{person.title}</p>
          <span className={pillNavy}>{person.level}</span>
        </div>
      </div>
      <p className={`${muted} mt-3`}>{person.about.slice(0, 110)}…</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {person.tags.map((t) => (
          <span className={pill} key={t}>
            {t}
          </span>
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2.5 text-[0.9rem] text-muted">
        <strong className="text-ink">${person.hourly}/hr</strong>
        <span>★ {person.rating}</span>
        <span>{person.success}% job success</span>
      </div>
    </article>
  )
}
