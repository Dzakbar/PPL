import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import api from '../services/api'
import { ASSETS } from '../constants/assets'

export default function OurStoryPage() {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    api.getCompanyInfo().then(setInfo)
  }, [])

  if (!info) return <div className="min-h-screen" />

  const { story } = info

  return (
    <PageTransition>
      <section className="relative min-h-[72vh] flex items-end overflow-hidden bg-wigra-black">
        <img
          src={ASSETS.filmmaker}
          alt="W/ Their Gratitude creative process"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-wigra-black via-wigra-black/70 to-wigra-black/20" />

        <div className="relative z-10 page-section w-full pt-32">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-wigra-accent">
              Our Story
            </p>
            <h1 className="section-heading max-w-3xl leading-tight">
              A home for stories, filmmakers, and the work between them.
            </h1>
            <p className="section-subheading mt-6">
              Mengenal latar belakang, visi, dan misi yang membentuk cara W/ Their
              Gratitude berkarya bersama komunitas film Indonesia.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-section bg-wigra-gray text-wigra-black">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid gap-10 border-y border-wigra-black/10 py-12 lg:grid-cols-[0.8fr_1.2fr]"
          >
            <div>
              <div className="mb-6 h-[2px] w-20 bg-wigra-accent" />
              <h2 className="font-serif text-4xl font-semibold md:text-5xl">
                Latar Belakang
              </h2>
            </div>
            <p className="text-base leading-8 text-wigra-black/60 md:text-lg">
              {story.background}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-section bg-wigra-light text-wigra-black">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-lg border border-wigra-black/10 bg-white p-8 md:p-10"
          >
            <span className="mb-8 inline-block rounded-full border border-wigra-accent/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-wigra-accent">
              Vision
            </span>
            <h2 className="mb-5 font-serif text-3xl font-semibold md:text-4xl">
              Visi
            </h2>
            <p className="text-base leading-8 text-wigra-black/60">
              {story.vision}
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="rounded-lg bg-wigra-black p-8 text-white md:p-10"
          >
            <span className="mb-8 inline-block rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Mission
            </span>
            <h2 className="mb-6 font-serif text-3xl font-semibold md:text-4xl">
              Misi
            </h2>
            <div className="space-y-5">
              {story.mission.map((item, index) => (
                <div key={item} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-wigra-accent text-xs font-semibold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-7 text-white/70 md:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.article>
        </div>
      </section>

      <section className="page-section text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-heading mb-4">Meet The People Behind It</h2>
          <p className="section-subheading mx-auto mb-10">
            The story continues through the collaborators who shape every project.
          </p>
          <Link to="/our-team" className="btn-accent">
            Our Team
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  )
}
