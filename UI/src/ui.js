export const shell = 'mx-auto w-[min(1180px,calc(100%-2rem))]'

export const btnNavy =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-navy px-[18px] py-[11px] font-bold text-ice transition hover:-translate-y-px'

export const btnBlue =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-blue px-[18px] py-[11px] font-bold text-white transition hover:-translate-y-px'

export const btnGhost =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-line bg-transparent px-[18px] py-[11px] font-bold text-ink transition hover:-translate-y-px'

export const card = 'overflow-hidden rounded-[18px] border border-line bg-card'

export const hoverLift = 'transition hover:-translate-y-[3px] hover:shadow-[0_18px_40px_rgba(15,40,90,0.1)]'

export const pill = 'rounded-full bg-ice px-[11px] py-1.5 text-[0.82rem] font-semibold'

export const pillNavy = 'rounded-full bg-navy px-[11px] py-1.5 text-[0.82rem] font-semibold text-ice'

export const kicker = 'text-[0.75rem] font-bold uppercase tracking-[0.08em] text-blue'

export const muted = 'text-muted'

export const field = 'w-full rounded-xl border border-line bg-white px-3.5 py-3 outline-none'

export const chip = (on) =>
  on
    ? 'cursor-pointer rounded-full border border-navy bg-navy px-3.5 py-2 font-semibold text-ice'
    : 'cursor-pointer rounded-full border border-line bg-transparent px-3.5 py-2 font-semibold hover:border-navy hover:bg-navy hover:text-ice'
