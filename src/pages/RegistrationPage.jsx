import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import api from '../services/api'

const fieldClass =
  'w-full rounded-lg border border-wigra-black/10 bg-white px-4 py-3 text-sm text-wigra-black outline-none transition focus:border-wigra-accent focus:ring-2 focus:ring-wigra-accent/20'

export default function RegistrationPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [films, setFilms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    filmSlug: '',
    fullName: '',
    contact: '',
    role: '',
    portfolio: '',
    notes: '',
  })

  useEffect(() => {
    api.getUpcomingFilms().then((data) => {
      setFilms(data)
      setIsLoading(false)
    })
  }, [])

  const requestedSlug = searchParams.get('film')
  const selectedFilm =
    films.find((film) => film.slug === requestedSlug) || films[0] || null

  useEffect(() => {
    if (!selectedFilm) return

    setForm((current) => ({
      ...current,
      filmSlug: selectedFilm.slug,
      role: selectedFilm.openRoles.includes(current.role)
        ? current.role
        : selectedFilm.openRoles[0] || '',
    }))
  }, [selectedFilm])

  const updateField = (field, value) => {
    setSubmitted(false)
    setForm((current) => ({ ...current, [field]: value }))
  }

  const changeProject = (slug) => {
    const nextFilm = films.find((film) => film.slug === slug)
    setSearchParams({ film: slug })
    setForm((current) => ({
      ...current,
      filmSlug: slug,
      role: nextFilm?.openRoles[0] || '',
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  if (!selectedFilm) {
    return (
      <PageTransition>
        <section className="flex min-h-screen items-center justify-center bg-wigra-black px-6 text-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-wigra-accent">
              Registration
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold">
              {isLoading ? 'Loading project details' : 'No registration projects available'}
            </h1>
          </div>
        </section>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <section className="relative min-h-[56vh] overflow-hidden bg-wigra-black">
        <img
          src={selectedFilm.image}
          alt={selectedFilm.title}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-wigra-black via-wigra-black/75 to-wigra-black/25" />

        <div className="relative z-10 page-section flex min-h-[56vh] items-end pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="max-w-4xl"
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-wigra-accent">
              Registration
            </p>
            <h1 className="section-heading leading-tight">
              Join the next Wigra production.
            </h1>
            <p className="section-subheading mt-6">
              {selectedFilm.title} is opening space for collaborators across
              creative, production, and documentation roles.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-section bg-wigra-gray text-wigra-black">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="rounded-lg bg-wigra-black p-6 text-white md:p-8"
          >
            <span className="inline-flex rounded-full bg-wigra-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
              {selectedFilm.status}
            </span>
            <h2 className="mt-6 font-serif text-3xl font-semibold">
              {selectedFilm.title}
            </h2>
            <p className="mt-3 text-sm text-wigra-gold">{selectedFilm.genre}</p>
            <p className="mt-5 text-sm leading-7 text-white/60">
              {selectedFilm.synopsis}
            </p>

            <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
              <div>
                <span className="block text-xs uppercase tracking-[0.18em] text-white/40">
                  Production Window
                </span>
                <span className="mt-1 block text-sm">{selectedFilm.productionWindow}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-[0.18em] text-white/40">
                  Deadline
                </span>
                <span className="mt-1 block text-sm text-wigra-gold">
                  {selectedFilm.registrationDeadline}
                </span>
              </div>
            </div>

            <Link
              to="/films"
              className="mt-8 inline-block text-sm text-white/50 transition hover:text-white"
            >
              Back to projects -&gt;
            </Link>
          </motion.aside>

          <motion.form
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="rounded-lg border border-wigra-black/10 bg-wigra-light p-6 md:p-8"
          >
            <div className="mb-8">
              <h2 className="font-serif text-3xl font-semibold">Registration Form</h2>
              <p className="mt-2 text-sm leading-6 text-wigra-black/60">
                Tell us who you are and where you want to contribute.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-wigra-black/50">
                  Project
                </span>
                <select
                  value={form.filmSlug}
                  onChange={(event) => changeProject(event.target.value)}
                  className={fieldClass}
                >
                  {films.map((film) => (
                    <option key={film.slug} value={film.slug}>
                      {film.title}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-wigra-black/50">
                  Full Name
                </span>
                <input
                  required
                  value={form.fullName}
                  onChange={(event) => updateField('fullName', event.target.value)}
                  className={fieldClass}
                  placeholder="Nama lengkap"
                />
              </label>

              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-wigra-black/50">
                  Email / WhatsApp
                </span>
                <input
                  required
                  value={form.contact}
                  onChange={(event) => updateField('contact', event.target.value)}
                  className={fieldClass}
                  placeholder="Kontak aktif"
                />
              </label>

              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-wigra-black/50">
                  Role
                </span>
                <select
                  value={form.role}
                  onChange={(event) => updateField('role', event.target.value)}
                  className={fieldClass}
                >
                  {selectedFilm.openRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-wigra-black/50">
                  Portfolio Link
                </span>
                <input
                  value={form.portfolio}
                  onChange={(event) => updateField('portfolio', event.target.value)}
                  className={fieldClass}
                  placeholder="Instagram, Drive, Behance"
                />
              </label>

              <label className="md:col-span-2">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-wigra-black/50">
                  Notes
                </span>
                <textarea
                  value={form.notes}
                  onChange={(event) => updateField('notes', event.target.value)}
                  className={`${fieldClass} min-h-[140px] resize-y`}
                  placeholder="Ceritakan pengalaman, minat, atau jadwal yang perlu kami tahu"
                />
              </label>
            </div>

            {submitted && (
              <div className="mt-6 rounded-lg border border-wigra-accent/30 bg-wigra-accent/10 px-4 py-3 text-sm text-wigra-accent">
                Preview pendaftaran sudah tersimpan di halaman ini. Saat backend siap,
                form ini bisa disambungkan ke database atau email.
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="submit" className="btn-accent">
                Submit Registration
              </button>
              <Link
                to="/films"
                className="text-sm text-wigra-black/50 transition hover:text-wigra-black"
              >
                Cancel
              </Link>
            </div>
          </motion.form>
        </div>
      </section>
    </PageTransition>
  )
}
