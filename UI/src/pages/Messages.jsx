import { useState } from 'react'
import { useMarket } from '../context/MarketplaceContext'
import { btnNavy, kicker, muted } from '../ui'

export default function Messages() {
  const { threads } = useMarket()
  const [active, setActive] = useState(threads[0].id)
  const [draft, setDraft] = useState('')
  const [local, setLocal] = useState({})
  const thread = threads.find((t) => t.id === active)
  const extras = local[active] || []

  const send = (e) => {
    e.preventDefault()
    if (!draft.trim()) return
    setLocal((prev) => ({
      ...prev,
      [active]: [...(prev[active] || []), { from: 'me', text: draft, time: 'Now' }],
    }))
    setDraft('')
  }

  return (
    <div className="pt-7 pb-2">
      <p className={kicker}>Inbox</p>
      <h1>Talk to clients and talent in one thread list.</h1>
      <div className="mt-5 mb-10 grid min-h-[520px] overflow-hidden rounded-[20px] border border-line bg-card lg:grid-cols-[280px_1fr]">
        <div>
          {threads.map((t) => (
            <button
              key={t.id}
              className={`block w-full cursor-pointer border-0 border-b border-line p-3.5 text-left ${
                t.id === active ? 'bg-ice' : 'bg-transparent'
              }`}
              onClick={() => setActive(t.id)}
            >
              <strong>{t.with}</strong>
              <p className={muted}>{t.preview}</p>
            </button>
          ))}
        </div>
        <div className="flex flex-col p-4">
          <h3 className="mb-3">{thread.with}</h3>
          {[...thread.messages, ...extras].map((m, i) => (
            <div
              key={i}
              className={`mb-2 max-w-[70%] rounded-[14px] px-3 py-2.5 ${
                m.from === 'me' ? 'ml-auto bg-navy text-ice' : 'bg-ice'
              }`}
            >
              {m.text}
            </div>
          ))}
          <form
            className="mt-auto flex flex-col gap-1.5 rounded-[18px] border border-line bg-white p-1.5 sm:flex-row sm:rounded-full"
            onSubmit={send}
          >
            <input
              className="flex-1 border-0 bg-transparent px-3.5 py-2.5 outline-none"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a message"
            />
            <button className={btnNavy} type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
