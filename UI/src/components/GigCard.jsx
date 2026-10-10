import { Link } from 'react-router-dom'
import { talentById } from '../data/marketplace'
import { useMarket } from '../context/MarketplaceContext'
import { btnGhost, card, hoverLift, muted } from '../ui'

export default function GigCard({ gig }) {
  const seller = talentById(gig.sellerId)
  const { saved, toggleSave } = useMarket()
  const isSaved = saved.includes(gig.id)

  return (
    <article className={`${card} ${hoverLift}`}>
      <Link to={`/gigs/${gig.id}`}>
        <img className="h-[168px] w-full object-cover" src={gig.image} alt="" />
      </Link>
      <div className="px-4 pt-3.5 pb-4">
        <div className="flex items-center gap-2 text-[0.86rem] text-muted">
          <img className="h-9 w-9 rounded-full border-2 border-white object-cover" src={seller?.avatar} alt="" />
          <span>{seller?.name}</span>
          <button
            className={`${btnGhost} ml-auto px-2.5 py-1`}
            onClick={() => toggleSave(gig.id)}
            aria-label="Save gig"
          >
            {isSaved ? '♥' : '♡'}
          </button>
        </div>
        <Link to={`/gigs/${gig.id}`}>
          <h3 className="mt-2.5 text-[1.05rem]">{gig.title}</h3>
        </Link>
        <div className="mt-2 font-bold text-blue">
          ★ {gig.rating} <span className={muted}>({gig.reviews})</span>
        </div>
        <div className="mt-2.5 font-extrabold">From ${gig.starting}</div>
      </div>
    </article>
  )
}
