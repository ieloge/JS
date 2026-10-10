import { Link, useParams } from 'react-router-dom'
import { gigs, talentById } from '../data/marketplace'
import GigCard from '../components/GigCard'
import { btnGhost, btnNavy, card, kicker, muted, pill, pillNavy } from '../ui'

export default function TalentProfile() {
  const { id } = useParams()
  const person = talentById(id)
  const theirGigs = gigs.filter((g) => g.sellerId === id)

  if (!person) {
    return (
      <div className="p-8 text-center text-muted">
        Profile not found. <Link to="/talent">Back</Link>
      </div>
    )
  }

  return (
    <div className="py-6 pb-12">
      <img className="h-[180px] w-full rounded-3xl object-cover" src={person.cover} alt="" />
      <div className="-mt-[42px] flex items-end gap-[18px] px-2 pb-[18px]">
        <img className="h-[108px] w-[108px] rounded-full border-4 border-paper object-cover" src={person.avatar} alt="" />
        <div>
          <h1>{person.name}</h1>
          <p className={muted}>
            {person.title} · {person.location}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={pillNavy}>{person.level}</span>
            <span className={pill}>{person.available}</span>
          </div>
        </div>
      </div>
      <div className="grid gap-[18px] lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2>About</h2>
          <p className="mt-2.5">{person.about}</p>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {person.tags.map((t) => (
              <span className={pill} key={t}>
                {t}
              </span>
            ))}
          </div>
          <h2 className="mt-7">Gigs from {person.name.split(' ')[0]}</h2>
          <div className="mt-3.5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {theirGigs.map((g) => (
              <GigCard key={g.id} gig={g} />
            ))}
          </div>
        </div>
        <aside className={`${card} sticky top-[92px] p-[18px]`}>
          <p className={kicker}>Hire</p>
          <h3 className="text-[2rem]">${person.hourly}/hr</h3>
          <p>
            ★ {person.rating} · {person.reviews} reviews
          </p>
          <p>{person.success}% job success</p>
          <p className={muted}>{person.earned} earned</p>
          <p className={muted}>Languages: {person.languages.join(', ')}</p>
          <Link className={`${btnNavy} mt-3 w-full`} to="/messages">
            Message
          </Link>
          <Link className={`${btnGhost} mt-2 w-full`} to="/post-job">
            Invite to a job
          </Link>
        </aside>
      </div>
    </div>
  )
}
