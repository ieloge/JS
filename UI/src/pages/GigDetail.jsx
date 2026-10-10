import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { gigById, talentById } from '../data/marketplace'
import { useMarket } from '../context/MarketplaceContext'
import { btnBlue, btnGhost, card, kicker, muted, pillNavy } from '../ui'

export default function GigDetail() {
  const { id } = useParams()
  const gig = gigById(id)
  const seller = talentById(gig?.sellerId)
  const { placeOrder, toggleSave, saved } = useMarket()
  const [pkg, setPkg] = useState(0)

  if (!gig) {
    return (
      <div className="p-8 text-center text-muted">
        Gig not found. <Link to="/gigs">Back to catalog</Link>
      </div>
    )
  }

  const pack = gig.packages[pkg]

  const buy = () => {
    placeOrder({
      id: crypto.randomUUID(),
      gigId: gig.id,
      title: gig.title,
      package: pack.name,
      price: pack.price,
      when: new Date().toISOString(),
    })
  }

  return (
    <div className="grid gap-[22px] py-6 pb-12 lg:grid-cols-[1.35fr_0.65fr]">
      <div>
        <div className="overflow-hidden rounded-3xl border border-line">
          <img className="h-[360px] w-full object-cover" src={gig.image} alt="" />
        </div>
        <p className={`${kicker} mt-[22px]`}>{gig.category}</p>
        <h1 className="my-2 mb-3 text-[2.2rem]">{gig.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-[0.86rem] text-muted">
          <img className="h-9 w-9 rounded-full border-2 border-white object-cover" src={seller.avatar} alt="" />
          <Link to={`/talent/${seller.id}`}>{seller.name}</Link>
          <span className={pillNavy}>{seller.level}</span>
          <span className="font-bold text-blue">★ {gig.rating}</span>
        </div>
        <p className="mt-[18px] text-[1.05rem]">{gig.desc}</p>
        <h2 className="mt-7 mb-2">About this gig</h2>
        <p className={muted}>
          Delivery in {pack.days} days on the {pack.name} package. You can always upgrade later or hire{' '}
          {seller.name.split(' ')[0]} hourly from their profile.
        </p>
        <h2 className="mt-7 mb-2">FAQ</h2>
        {gig.faqs.map((f) => (
          <div className="border-t border-line py-3" key={f.q}>
            <strong>{f.q}</strong>
            <p className={muted}>{f.a}</p>
          </div>
        ))}
        <h2 className="mt-7 mb-2">Reviews</h2>
        {gig.reviewsList.map((r) => (
          <div className="border-b border-line py-3" key={r.name}>
            <strong>{r.name}</strong> <span className="font-bold text-blue">{'★'.repeat(r.stars)}</span>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
      <aside className={`${card} sticky top-[92px] p-[18px]`}>
        <div className="mb-3 grid grid-cols-3 gap-2">
          {gig.packages.map((p, i) => (
            <button
              key={p.name}
              className={`cursor-pointer rounded-[14px] border bg-white p-2.5 text-left ${
                pkg === i ? 'border-navy shadow-[inset_0_0_0_1px_#1a4f9c]' : 'border-line'
              }`}
              onClick={() => setPkg(i)}
            >
              <strong>{p.name}</strong>
              <div>${p.price}</div>
            </button>
          ))}
        </div>
        <h3 className="text-[1.8rem]">${pack.price}</h3>
        <p className={muted}>{pack.days} day delivery</p>
        <ul>
          {pack.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button className={`${btnBlue} w-full`} onClick={buy}>
          Continue (${pack.price})
        </button>
        <button className={`${btnGhost} mt-2 w-full`} onClick={() => toggleSave(gig.id)}>
          {saved.includes(gig.id) ? 'Saved' : 'Save gig'}
        </button>
        <p className={`${muted} mt-3 text-[0.85rem]`}>Demo checkout — stored in your browser only.</p>
      </aside>
    </div>
  )
}
