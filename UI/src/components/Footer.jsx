import { Link } from 'react-router-dom'
import { muted, shell } from '../ui'

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-line py-7 pb-10 text-muted">
      <div className={`${shell} grid gap-[18px] md:grid-cols-4`}>
        <div>
          <strong className="text-ink">Workora</strong>
          <p className={`${muted} mt-2`}>
            Shop ready-made gigs or hire by the hour. One marketplace, two ways to get the work done.
          </p>
        </div>
        <div>
          <strong className="text-ink">Explore</strong>
          <p>
            <Link to="/gigs">Gig catalog</Link>
          </p>
          <p>
            <Link to="/jobs">Job board</Link>
          </p>
          <p>
            <Link to="/talent">Talent directory</Link>
          </p>
        </div>
        <div>
          <strong className="text-ink">For clients</strong>
          <p>
            <Link to="/post-job">Post a brief</Link>
          </p>
          <p>
            <Link to="/dashboard">Orders & saved</Link>
          </p>
        </div>
        <div>
          <strong className="text-ink">For talent</strong>
          <p>
            <Link to="/gigs">Open a gig</Link>
          </p>
          <p>
            <Link to="/messages">Inbox</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
