import { createContext, useContext, useMemo, useState } from 'react'
import { seedJobs, threads as seedThreads } from '../data/marketplace'

const MarketplaceContext = createContext(null)
const LS = {
  saved: 'workora-saved',
  jobs: 'workora-jobs',
  orders: 'workora-orders',
  proposals: 'workora-proposals',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function MarketplaceProvider({ children }) {
  const [saved, setSaved] = useState(() => read(LS.saved, []))
  const [jobs, setJobs] = useState(() => {
    const extra = read(LS.jobs, [])
    return [...extra, ...seedJobs]
  })
  const [orders, setOrders] = useState(() => read(LS.orders, []))
  const [proposals, setProposals] = useState(() => read(LS.proposals, []))
  const [threads] = useState(seedThreads)
  const [toast, setToast] = useState('')

  const ping = (msg) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 2400)
  }

  const persist = (key, value) => localStorage.setItem(key, JSON.stringify(value))

  const toggleSave = (gigId) => {
    setSaved((prev) => {
      const next = prev.includes(gigId) ? prev.filter((id) => id !== gigId) : [...prev, gigId]
      persist(LS.saved, next)
      ping(prev.includes(gigId) ? 'Removed from saved' : 'Saved to your list')
      return next
    })
  }

  const postJob = (job) => {
    setJobs((prev) => {
      const next = [job, ...prev]
      persist(
        LS.jobs,
        next.filter((j) => j.local),
      )
      return next
    })
    ping('Job posted to the board')
  }

  const placeOrder = (order) => {
    setOrders((prev) => {
      const next = [order, ...prev]
      persist(LS.orders, next)
      return next
    })
    ping('Order placed — seller will see it in Messages')
  }

  const submitProposal = (proposal) => {
    setProposals((prev) => {
      const next = [proposal, ...prev]
      persist(LS.proposals, next)
      return next
    })
    ping('Proposal sent to the client')
  }

  const value = useMemo(
    () => ({
      saved,
      jobs,
      orders,
      proposals,
      threads,
      toast,
      toggleSave,
      postJob,
      placeOrder,
      submitProposal,
    }),
    [saved, jobs, orders, proposals, threads, toast],
  )

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>
}

export function useMarket() {
  const ctx = useContext(MarketplaceContext)
  if (!ctx) throw new Error('useMarket must be used inside MarketplaceProvider')
  return ctx
}
