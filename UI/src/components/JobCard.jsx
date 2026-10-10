import { Link } from 'react-router-dom'
import { card, hoverLift, muted, pill } from '../ui'

export default function JobCard({ job }) {
  return (
    <article className={`${card} ${hoverLift} p-[18px]`}>
      <div className="mb-2.5 flex flex-wrap gap-x-4 gap-y-2.5 text-[0.9rem] text-muted">
        <span>{job.posted}</span>
        <span>{job.type}</span>
        <span>{job.experience}</span>
      </div>
      <Link to={`/jobs/${job.id}`}>
        <h3 className="mb-2 text-[1.2rem]">{job.title}</h3>
      </Link>
      <p className={muted}>{job.desc.slice(0, 140)}…</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {job.skills.map((s) => (
          <span className={pill} key={s}>
            {s}
          </span>
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2.5 text-[0.9rem] text-muted">
        <strong className="text-ink">{job.budget}</strong>
        <span>{job.proposals} proposals</span>
        <span>{job.client.name}</span>
      </div>
    </article>
  )
}
