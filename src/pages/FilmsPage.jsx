import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import api from '../services/api'

function FilmModal({ film, films, onClose, onNavigate }) {
  if (!film) return null

  const currentIndex = films.findIndex((f) => f.id === film.id)

  const goPrev = () => {
    const prev = currentIndex > 0 ? currentIndex - 1 : films.length - 1
    onNavigate(films[prev])
  }

  const goNext = () => {
    const next = currentIndex < films.length - 1 ? currentIndex + 1 : 0
    onNavigate(films[next])
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all"
            aria-label="Close film details"
          >
            x
          </button>
        </div>

        <div className="relative px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={goPrev}
              className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all text-xl"
              aria-label="Previous film"
            >
              &lt;
            </button>
            <div className="flex-1 aspect-video rounded-lg overflow-hidden">
              <img
                src={film.image}
                alt={film.title}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={goNext}
              className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all text-xl"
              aria-label="Next film"
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">{film.title}</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Director', value: film.director },
              { label: 'Duration', value: film.duration },
              { label: 'Genre', value: film.genre },
            ].map(({ label, value }) => (
              <div key={label}>
                <span className="block text-xs text-white/40 uppercase tracking-wider mb-1">
                  {label}
                </span>
                <span className="text-sm">{value}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-xs text-white/40 uppercase tracking-wider mb-2">Synopsis</h3>
            <p className="text-sm text-white/70 leading-relaxed">{film.synopsis}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function UpcomingFilms({ films }) {
  return (
    <section className="px-6 md:px-12 lg:px-20 pb-16">
      <div className="mx-auto max-w-6xl space-y-6">
        {films.map((film, i) => (
          <motion.article
            key={film.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[300px] overflow-hidden">
                <img
                  src={film.image}
                  alt={film.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-wigra-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                    Upcoming Film
                  </span>
                  <span className="rounded-full border border-white/30 bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                    {film.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-wigra-gold">
                    {film.genre}
                  </p>
                  <h2 className="font-serif text-3xl font-semibold md:text-5xl">
                    {film.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
                    {film.synopsis}
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="border-t border-white/10 pt-4">
                      <span className="block text-xs uppercase tracking-[0.18em] text-white/40">
                        Production Window
                      </span>
                      <span className="mt-1 block text-sm text-white">
                        {film.productionWindow}
                      </span>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <span className="block text-xs uppercase tracking-[0.18em] text-white/40">
                        Deadline
                      </span>
                      <span className="mt-1 block text-sm text-wigra-gold">
                        {film.registrationDeadline}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {film.openRoles.map((role) => (
                      <span
                        key={role}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    to={`/registration?film=${film.slug}`}
                    className="btn-accent"
                  >
                    Daftar Sekarang -&gt;
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default function FilmsPage() {
  const [films, setFilms] = useState([])
  const [upcomingFilms, setUpcomingFilms] = useState([])
  const [filter, setFilter] = useState('films')
  const [selectedFilm, setSelectedFilm] = useState(null)

  useEffect(() => {
    api.getFilms().then(setFilms)
    api.getUpcomingFilms().then(setUpcomingFilms)
  }, [])

  const filtered = filter === 'upcoming'
    ? []
    : films.filter((film) => film.category === filter)

  const filters = [
    { key: 'films', label: 'Films' },
    { key: 'other', label: 'Other Projects' },
    { key: 'upcoming', label: 'Upcoming' },
  ]

  return (
    <PageTransition>
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center pt-20 px-6"
        >
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl italic text-wigra-black">
            PROJECTS CATALOGUES
          </h1>
          <p className="section-subheading mx-auto mt-4 !text-wigra-black/60">
            Explore our collection of documentaries, commercials, original productions,
            and upcoming projects opening for collaborators.
          </p>
        </motion.div>
      </section>

      <section className="page-section pb-8">
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => {
                setFilter(key)
                setSelectedFilm(null)
              }}
              className={`px-6 py-2.5 rounded-full text-sm tracking-wide transition-all duration-300 ${
                filter === key
                  ? 'bg-wigra-accent text-white'
                  : 'border border-white/20 text-white/50 hover:text-white hover:border-white/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {filter === 'upcoming' ? (
        <UpcomingFilms films={upcomingFilms} />
      ) : (
        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filtered.map((film) => (
                <motion.div
                  layout
                  key={film.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedFilm(film)}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer"
                >
                  <img
                    src={film.image}
                    alt={film.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-xl mb-1">{film.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-white/50">
                      <span>{film.director}</span>
                      <span>-</span>
                      <span>{film.duration}</span>
                    </div>
                    <p className="text-xs text-white/40 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {film.genre}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      )}

      <section className="page-section text-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading mb-4">Have A Project In Mind?</h2>
          <p className="section-subheading mx-auto mb-10">
            Let's collaborate and bring your vision to life
          </p>
          <a
            href="https://wa.me/62812811109850"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent"
          >
            Get in Touch
          </a>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedFilm && (
          <FilmModal
            film={selectedFilm}
            films={filtered}
            onClose={() => setSelectedFilm(null)}
            onNavigate={setSelectedFilm}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
