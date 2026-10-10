import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { categories, gigs, talents } from '../data/marketplace'
import { useMarket } from '../context/MarketplaceContext'
import GigCard from '../components/GigCard'
import JobCard from '../components/JobCard'
import TalentCard from '../components/TalentCard'
import { btnBlue, btnNavy, card, kicker, muted, pill } from '../ui'

export default function Home() {
  const { jobs } = useMarket()
  const [mode, setMode] = useState('gigs')
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const go = (e) => {
    e.preventDefault()
    const path = mode === 'jobs' ? '/jobs' : mode === 'talent' ? '/talent' : '/gigs'
    navigate(`${path}?q=${encodeURIComponent(q)}`)
  }

  return (
    <>
      <section className="grid items-center gap-9 py-14 pb-7 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className={kicker}>Gigs + jobs in one harbor</p>
          <h1 className="my-2.5 text-[clamp(2.4rem,5vw,4.4rem)]">Hire the finished offer, or the person behind it.</h1>
          <p className="max-w-[52ch] text-[1.12rem] text-ink-soft">
            Workora mixes Fiverr-style packaged gigs with Upwork-style briefs and hourly talent. Shop a catalog, or
            post a job and collect proposals — no backend required for this demo.
          </p>
          <form
            className="mt-7 flex flex-col gap-1.5 rounded-[18px] border border-line bg-card p-1.5 shadow-[0_18px_40px_rgba(15,40,90,0.1)] sm:flex-row sm:rounded-full"
            onSubmit={go}
          >
            <select className="border-0 bg-transparent px-3.5 py-2.5 outline-none" value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="gigs">Gigs</option>
              <option value="jobs">Jobs</option>
              <option value="talent">Talent</option>
            </select>
            <input
              className="flex-1 border-0 bg-transparent px-3.5 py-2.5 outline-none"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Brand system, React rebuild, launch film…"
            />
            <button className={btnBlue} type="submit">
              Search
            </button>
          </form>
        </div>
        <aside className={`${card} rounded-[28px] shadow-[0_18px_40px_rgba(15,40,90,0.1)]`}>
          <img
            className="h-[220px] w-full object-cover"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
            alt="Studio collaboration"
          />
          <div className="px-5 pt-[18px] pb-[22px]">
            <p className={kicker}>Today on the floor</p>
            <h2 className="my-1.5 mb-2.5">8 live gigs · {jobs.length} open briefs</h2>
            <div className="flex flex-wrap gap-2">
              <span className={pill}>Packages from $85</span>
              <span className={pill}>Hourly from $40</span>
              <span className={pill}>Top Rated talent</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="py-7 pb-2">
        <div className="mb-[18px] flex items-end justify-between gap-4">
          <h2>Shop by craft</h2>
          <Link to="/gigs">See all gigs →</Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              className={`${card} flex min-h-[110px] flex-col justify-between bg-linear-to-br from-card to-[#dce8f8] p-[18px]`}
              to={`/gigs?cat=${c.id}`}
            >
              <span className="text-[1.3rem]">{c.icon}</span>
              <strong>{c.label}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-7 pb-2">
        <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-3">
          <article className="rounded-[22px] bg-navy p-[22px] text-ice">
            <p className={`${kicker} text-[#c5d8f5]`}>Like Fiverr</p>
            <h3 className="my-2 text-[1.45rem]">Buy a gig</h3>
            <p>Pick a package, know the price, get a delivery date. Perfect when you already know the output.</p>
          </article>
          <article className="rounded-[22px] bg-blue p-[22px] text-ice">
            <p className={`${kicker} text-[#d6e4ff]`}>Like Upwork</p>
            <h3 className="my-2 text-[1.45rem]">Post a job</h3>
            <p>Write a brief, set a budget, collect proposals. Better when the work is still taking shape.</p>
          </article>
          <article className="rounded-[22px] bg-[#0f2744] p-[22px] text-ice">
            <p className={`${kicker} text-[#9eb6d9]`}>Both</p>
            <h3 className="my-2 text-[1.45rem]">Keep the talent</h3>
            <p>Hire hourly after a gig, or turn a contract into a packaged offer. Same people, two doors.</p>
          </article>
        </div>
      </section>

      <section className="py-7 pb-2">
        <div className="mb-[18px] flex items-end justify-between gap-4">
          <div>
            <h2>Featured gigs</h2>
            <p className={muted}>Packaged work with a starting price</p>
          </div>
          <Link to="/gigs">Browse catalog</Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gigs.slice(0, 4).map((g) => (
            <GigCard key={g.id} gig={g} />
          ))}
        </div>
      </section>

      <section className="grid gap-[18px] py-7 pb-2 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-[18px] flex items-end justify-between gap-4">
            <div>
              <h2>Open jobs</h2>
              <p className={muted}>Briefs looking for proposals</p>
            </div>
            <Link to="/jobs">Job board</Link>
          </div>
          <div className="grid gap-3">
            {jobs.slice(0, 3).map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </div>
        <div>
          <div className="mb-[18px] flex items-end justify-between gap-4">
            <div>
              <h2>Top talent</h2>
              <p className={muted}>Hourly, vetted, ready</p>
            </div>
            <Link to="/talent">Directory</Link>
          </div>
          <div className="grid gap-3">
            {talents.slice(0, 2).map((t) => (
              <TalentCard key={t.id} person={t} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${card} my-7 mb-9 p-7`}>
        <p className={kicker}>For clients</p>
        <h2 className="my-2 mb-3 text-[2rem]">Have a fuzzy brief? Don’t force it into a gig.</h2>
        <p className="max-w-[52ch] text-[1.12rem] text-ink-soft">
          Post the job, invite proposals, then hire by the hour or a fixed fee.
        </p>
        <div className="mt-[18px]">
          <Link className={btnNavy} to="/post-job">
            Post a job
          </Link>
        </div>
      </section>
    </>
  )
}
