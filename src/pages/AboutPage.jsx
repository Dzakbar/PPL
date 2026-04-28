import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import api from '../services/api'

export default function AboutPage() {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    api.getCompanyInfo().then(setInfo)
  }, [])

  if (!info) return <div className="min-h-screen" />

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-wigra-black">
        <div className="relative z-10 page-section pt-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="section-heading leading-tight">
                About W/ Their Gratitude
              </h1>
              <p className="section-subheading mt-6">
                Discover our story, the people behind our work, and how we create
                compelling productions for the filmmaking community.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="aspect-video rounded-xl overflow-hidden"
            >
              <img
                src="/asset/filmmaker.jpeg"
                alt="W/ Their Gratitude Office"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Columns */}
      <section className="page-section bg-wigra-gray text-wigra-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {info.sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group"
            >
              <div className="h-[2px] w-12 bg-wigra-accent mb-6 transition-all duration-500 group-hover:w-20" />
              <h3 className="font-serif text-2xl mb-4">{section.title}</h3>
              <p className="text-sm text-wigra-black/60 leading-relaxed">
                {section.description}
              </p>
              {i < 2 && (
                <button className="mt-4 text-sm text-wigra-accent tracking-wide hover:tracking-wider transition-all duration-300">
                  Read More →
                </button>
              )}
              {i === 2 && (
                <span className="mt-4 inline-block text-sm text-wigra-black/30 tracking-wide">
                  Coming Soon →
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="page-section text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading mb-4">Ready To Collaborate?</h2>
          <p className="section-subheading mx-auto mb-10">
            Let's create something amazing together
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
    </PageTransition>
  )
}
