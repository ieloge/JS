import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories } from '../data/marketplace'
import { useMarket } from '../context/MarketplaceContext'
import { btnNavy, card, field, kicker } from '../ui'

export default function PostJob() {
  const { postJob } = useMarket()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    category: 'design',
    type: 'Fixed',
    budget: '',
    experience: 'Intermediate',
    skills: '',
    desc: '',
  })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const id = `job-${crypto.randomUUID().slice(0, 8)}`
    postJob({
      id,
      title: form.title,
      category: form.category,
      type: form.type,
      budget: form.budget,
      experience: form.experience,
      posted: 'Just now',
      proposals: 0,
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      client: { name: 'You', spend: '$0', hires: 0, location: 'Remote' },
      desc: form.desc,
      local: true,
    })
    navigate(`/jobs/${id}`)
  }

  return (
    <div className="max-w-[720px] pt-7 pb-2">
      <p className={kicker}>Post a job</p>
      <h1>Write the brief. Talent will come to you.</h1>
      <form className={`${card} mt-5 grid gap-3 p-[22px]`} onSubmit={submit}>
        <input className={field} required placeholder="Job title" value={form.title} onChange={set('title')} />
        <select className={field} value={form.category} onChange={set('category')}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <select className={field} value={form.type} onChange={set('type')}>
          <option>Fixed</option>
          <option>Hourly</option>
        </select>
        <input className={field} required placeholder="Budget (e.g. $2,000 – $3,500)" value={form.budget} onChange={set('budget')} />
        <select className={field} value={form.experience} onChange={set('experience')}>
          <option>Entry</option>
          <option>Intermediate</option>
          <option>Expert</option>
        </select>
        <input className={field} placeholder="Skills, comma separated" value={form.skills} onChange={set('skills')} />
        <textarea className={field} required rows={6} placeholder="Describe the work" value={form.desc} onChange={set('desc')} />
        <button className={btnNavy} type="submit">
          Publish to the board
        </button>
      </form>
    </div>
  )
}
