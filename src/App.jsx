import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import FilmsPage from './pages/FilmsPage'
import EventsPage from './pages/EventsPage'

function App() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

export default App
