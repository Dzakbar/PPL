import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import api from '../services/api'

/* ─── Image Gallery ─── */
function ImageGallery({ images }) {
  const [current, setCurrent] = useState(0)

  if (!images || images.length === 0) return null

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`Gallery ${current + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((p) => (p > 0 ? p - 1 : images.length - 1))}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center 
                       rounded-full bg-black/50 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 
                       transition-all duration-300"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrent((p) => (p < images.length - 1 ? p + 1 : 0))}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center 
                       rounded-full bg-black/50 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 
                       transition-all duration-300"
          >
            ›
          </button>
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-white w-4' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ─── Event Modal ─── */
function EventModal({ event, onClose }) {
  if (!event) return null

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
        className="glass-card max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 
                       text-white/50 hover:text-white hover:border-white/30 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="px-6 pb-2">
          <ImageGallery images={event.images} />
        </div>

        <div className="p-6 md:p-8">
          <h2 className="font-serif text-2xl md:text-3xl mb-2">{event.title}</h2>
          <p className="text-sm text-wigra-accent tracking-wide uppercase mb-4">
            {event.date}
          </p>
          <p className="text-sm text-white/70 leading-relaxed">{event.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── EVENTS PAGE ─── */
export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    api.getEvents().then(setEvents)
  }, [])

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center pt-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl uppercase tracking-wide text-wigra-black">
            Festival & Events
          </h1>
          <div className="w-24 h-[2px] bg-wigra-black/20 mx-auto mt-6 mb-6" />
          <p className="section-subheading mx-auto !text-wigra-black/60">
            Join us at our upcoming events, festivals, and community gatherings where
            we celebrate filmmaking and creative excellence.
          </p>
        </motion.div>
      </section>

      {/* Events Grid */}
      <section className="page-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {events.map((event, i) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card overflow-hidden hover-lift cursor-pointer group"
              onClick={() => setSelectedEvent(event)}
            >
              <ImageGallery images={event.images} />
              <div className="p-6">
                <h2 className="font-serif text-xl md:text-2xl mb-2 group-hover:text-wigra-accent transition-colors duration-300">
                  {event.title}
                </h2>
                <p className="text-xs text-wigra-accent tracking-wide uppercase mb-3">
                  {event.date}
                </p>
                <p className="text-sm text-white/50 line-clamp-3 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
