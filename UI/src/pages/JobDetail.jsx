import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMarket } from '../context/MarketplaceContext'
import { btnBlue, btnGhost, btnNavy, card, field, kicker, muted, pill } from '../ui'

export default function JobDetail() {
  const { id } = useParams()
  const { jobs, submitProposal, proposals } = useMarket()
  const job = jobs.find((j) => j.id === id)
  const [open, setOpen] = useState(false)
  const [bid, setBid] = useState('')
  const [cover, setCover] = useState('')
  const mine = proposals.filter((p) => p.jobId === id)

  if (!job) {
    return (
      <div className="p-8 text-center text-muted">
        Job not found. <Link to="/jobs">Back to board</Link>
      </div>
    )
  }

  const send = (e) => {
    e.preventDefault()
    submitProposal({
      id: crypto.randomUUID(),
      jobId: job.id,
      bid,
      cover,
      when: new Date().toISOString(),
    })
    setOpen(false)
    setBid('')
    setCover('')
  }

  return (
    <div className="grid gap-[22px] py-6 pb-12 lg:grid-cols-[1.35fr_0.65fr]">
      <div>
        <p className={kicker}>{job.posted}</p>
        <h1 className="my-2 mb-3 text-[2.2rem]">{job.title}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-2.5 text-[0.9rem] text-muted">
          <strong className="text-ink">{job.budget}</strong>
          <span>{job.type}</span>
          <span>{job.experience}</span>
          <span>
            {job.proposals + mine.length} proposal{job.proposals + mine.length === 1 ? '' : 's'}
          </span>
        </div>
        <p className="mt-4 text-[1.05rem]">{job.desc}</p>
        <h2 className="mt-6 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((s) => (
            <span className={pill} key={s}>
              {s}
            </span>
          ))}
        </div>
        {mine.length > 0 && (
          <div className={`${card} mt-6 p-4`}>
            <strong>Your proposal is in</strong>
            <p className={muted}>{mine[0].cover}</p>
            <p>Bid: {mine[0].bid}</p>
          </div>
        )}
      </div>
      <aside className={`${card} sticky top-[92px] p-[18px]`}>
        <p className={kicker}>Client</p>
        <h3>{job.client.name}</h3>
        <p className={muted}>{job.client.location}</p>
        <div className="my-2.5 flex flex-wrap gap-x-4 gap-y-2.5 text-[0.9rem] text-muted">
          <span>{job.client.spend} spent</span>
          <span>{job.client.hires} hires</span>
        </div>
        <button className={`${btnNavy} w-full`} onClick={() => setOpen(true)}>
          Submit a proposal
        </button>
        <Link className={`${btnGhost} mt-2 w-full`} to="/talent">
          Invite talent instead
        </Link>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/45 p-5"
          onClick={() => setOpen(false)}
        >
          <form
            className="grid w-[min(520px,100%)] gap-3 rounded-[20px] bg-card p-[22px]"
            onClick={(e) => e.stopPropagation()}
            onSubmit={send}
          >
            <h2>Proposal</h2>
            <p className={muted}>This stays in your browser for the demo.</p>
            <input
              className={field}
              required
              placeholder="Your bid (e.g. $4,200 or $90/hr)"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
            />
            <textarea
              className={field}
              required
              rows={5}
              placeholder="How you’d approach the work"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
            />
            <button className={btnBlue} type="submit">
              Send proposal
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
