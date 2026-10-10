import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useMarket } from '../context/MarketplaceContext'
import { btnGhost, btnNavy, shell } from '../ui'

const links = [
  { to: '/gigs', label: 'Gigs' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/talent', label: 'Talent' },
  { to: '/messages', label: 'Messages' },
  { to: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const { saved } = useMarket()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const go = (path) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur-2xl">
      <div className={`${shell} flex min-h-[72px] items-center gap-[22px]`}>
        <NavLink
          to="/"
          end
          className="flex items-center gap-2.5 text-[1.15rem] font-bold"
          onClick={() => setOpen(false)}
        >
          <svg className="h-8 w-8" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#1a4f9c" />
            <path
              d="M8 21.5V10.5h4.2c2.4 0 3.9 1.4 3.9 3.5 0 1.3-.7 2.3-1.8 2.9 1.3.5 2.2 1.6 2.2 3.1 0 2.3-1.7 3.5-4.2 3.5H8Zm3.1-6.7h1.1c1.1 0 1.7-.5 1.7-1.4s-.6-1.4-1.7-1.4h-1.1v2.8Zm0 5.2h1.4c1.2 0 1.9-.6 1.9-1.6s-.7-1.5-1.9-1.5H11.1v3.1Z"
              fill="#eef4ff"
            />
            <circle cx="23.2" cy="11.2" r="2.2" fill="#5b8def" />
          </svg>
          Workora
        </NavLink>
        <nav className="hidden flex-1 gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-[0.95rem] font-semibold ${
                  isActive ? 'bg-white text-navy' : 'text-ink-soft hover:bg-white hover:text-navy'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <button className={`${btnGhost} hidden lg:inline-flex`} onClick={() => go('/dashboard')}>
            Saved {saved.length}
          </button>
          <button className={`${btnNavy} hidden lg:inline-flex`} onClick={() => go('/post-job')}>
            Post a job
          </button>
          <img
            className="hidden h-9 w-9 rounded-full border-2 border-white object-cover lg:block"
            src="https://i.pravatar.cc/80?img=5"
            alt="You"
          />
          <button className={`${btnGhost} lg:hidden`} aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      {open ? (
        <div className={`${shell} flex flex-col gap-2 pb-4 lg:hidden`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-xl bg-white px-3 py-2.5 font-semibold"
            >
              {l.label}
            </NavLink>
          ))}
          <button className={btnGhost} onClick={() => go('/dashboard')}>
            Saved {saved.length}
          </button>
          <button className={btnNavy} onClick={() => go('/post-job')}>
            Post a job
          </button>
        </div>
      ) : null}
    </header>
  )
}
