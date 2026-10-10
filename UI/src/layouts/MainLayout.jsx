import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useMarket } from '../context/MarketplaceContext'
import { shell } from '../ui'

export default function MainLayout() {
  const { toast } = useMarket()
  return (
    <>
      <Navbar />
      <main className={shell}>
        <Outlet />
      </main>
      <Footer />
      {toast ? (
        <div className="fixed bottom-[22px] left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink px-[18px] py-3 text-ice shadow-[0_18px_40px_rgba(15,40,90,0.1)]">
          {toast}
        </div>
      ) : null}
    </>
  )
}
