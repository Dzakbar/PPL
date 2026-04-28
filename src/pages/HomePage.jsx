import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import api from '../services/api'



/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section
      id="home-section-0"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        loop
      >
        <source src="/asset/Motion Page.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.02em]">
          W/ THEIR GRATITUDE
        </h1>
        <p className="font-sans text-sm md:text-base tracking-[0.3em] uppercase text-white/60 mt-4">
          Production House
        </p>
        <Link to="/about" className="btn-primary mt-10 inline-block">
          Explore
        </Link>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
      </motion.div>
    </section>
  )
}

/* ─── Film Showcase Section ─── */
function FilmShowcase({ films }) {
  return (
    <section
      id="home-section-1"
      className="min-h-screen flex flex-col justify-center page-section bg-wigra-dark"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-heading text-center mb-4">Film Catalogues</h2>
        <p className="section-subheading text-center mx-auto mb-12">Selected Works</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        {films.slice(0, 3).map((film, i) => (
          <motion.div
            key={film.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer"
          >
            <img
              src={film.image}
              alt={film.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-serif text-xl mb-1">{film.title}</h3>
              <p className="text-xs text-white/50 tracking-wide">{film.genre}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center mt-12"
      >
        <Link to="/films" className="btn-primary">
          View All Films
        </Link>
      </motion.div>
    </section>
  )
}

/* ─── Events Preview Section ─── */
function EventsPreview({ events }) {
  return (
    <section
      id="home-section-2"
      className="min-h-screen flex flex-col justify-center page-section"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-heading text-center mb-4">Festival & Events</h2>
        <p className="section-subheading text-center mx-auto mb-12">
          Join us at our upcoming community gatherings
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
        {events.slice(0, 2).map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="glass-card p-6 hover-lift group"
          >
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
              <img
                src={event.images[0]}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="font-serif text-xl mb-2">{event.title}</h3>
            <p className="text-xs text-wigra-accent tracking-wide uppercase mb-2">{event.date}</p>
            <p className="text-sm text-white/50 line-clamp-2">{event.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-12"
      >
        <Link to="/events" className="btn-primary">
          View All Events
        </Link>
      </motion.div>
    </section>
  )
}

/* ─── HOME PAGE ─── */
export default function HomePage() {
  const [films, setFilms] = useState([])
  const [events, setEvents] = useState([])


  useEffect(() => {
    api.getFilms().then(setFilms)
    api.getEvents().then(setEvents)
  }, [])



  return (
    <PageTransition>

      <HeroSection />
      <FilmShowcase films={films} />
      <EventsPreview events={events} />
    </PageTransition>
  )
}
