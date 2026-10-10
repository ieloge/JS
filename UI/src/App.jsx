import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Gigs from './pages/Gigs'
import GigDetail from './pages/GigDetail'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import Talent from './pages/Talent'
import TalentProfile from './pages/TalentProfile'
import Dashboard from './pages/Dashboard'
import Messages from './pages/Messages'
import PostJob from './pages/PostJob'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="gigs" element={<Gigs />} />
        <Route path="gigs/:id" element={<GigDetail />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetail />} />
        <Route path="talent" element={<Talent />} />
        <Route path="talent/:id" element={<TalentProfile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="messages" element={<Messages />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
