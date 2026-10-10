import { Link } from 'react-router-dom'
import { gigs } from '../data/marketplace'
import { useMarket } from '../context/MarketplaceContext'
import GigCard from '../components/GigCard'
import { card, kicker, muted } from '../ui'

export default function Dashboard() {
  const { saved, orders, proposals, jobs } = useMarket()
  const savedGigs = gigs.filter((g) => saved.includes(g.id))
  const myJobs = jobs.filter((j) => j.local)

  return (
    <div className="pt-7 pb-2">
      <p className={kicker}>Your desk</p>
      <h1>Orders, proposals, and saved gigs — all local.</h1>
      <div className="my-[22px] grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          ['Orders', orders.length],
          ['Proposals sent', proposals.length],
          ['Saved gigs', saved.length],
          ['Jobs you posted', myJobs.length],
        ].map(([label, n]) => (
          <div className={`${card} p-[18px]`} key={label}>
            <span className={muted}>{label}</span>
            <b className="block font-display text-[1.8rem]">{n}</b>
          </div>
        ))}
      </div>

      <h2>Active orders</h2>
      {orders.length === 0 ? (
        <p className={`${muted} my-2 mb-6`}>
          No orders yet. <Link to="/gigs">Buy a gig</Link>
        </p>
      ) : (
        <div className="my-3 mb-7 grid grid-cols-1 gap-4 md:grid-cols-2">
          {orders.map((o) => (
            <div className={`${card} p-4`} key={o.id}>
              <strong>{o.title}</strong>
              <p>
                {o.package} · ${o.price}
              </p>
              <p className={muted}>{new Date(o.when).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      <h2>Saved gigs</h2>
      {savedGigs.length === 0 ? (
        <p className={`${muted} my-2 mb-7`}>Heart a gig to keep it here.</p>
      ) : (
        <div className="my-3 mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {savedGigs.map((g) => (
            <GigCard key={g.id} gig={g} />
          ))}
        </div>
      )}

      <h2>Your posted jobs</h2>
      {myJobs.length === 0 ? (
        <p className={`${muted} my-2 mb-10`}>
          <Link to="/post-job">Post a brief</Link> and it will appear on the job board.
        </p>
      ) : (
        <div className="my-3 mb-10 grid gap-2.5">
          {myJobs.map((j) => (
            <Link key={j.id} className={`${card} p-4`} to={`/jobs/${j.id}`}>
              <strong>{j.title}</strong>
              <p className={muted}>{j.budget}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
