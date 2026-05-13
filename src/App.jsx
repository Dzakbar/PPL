import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import FilmsPage from './pages/FilmsPage'
import EventsPage from './pages/EventsPage'
import OurStoryPage from './pages/OurStoryPage'
import OurTeamPage from './pages/OurTeamPage'
import RegistrationPage from './pages/RegistrationPage'

function App() {
  const location = useLocation()

  return (
    <Layout>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/our-team" element={<OurTeamPage />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </Layout>
  )
}

export default App
