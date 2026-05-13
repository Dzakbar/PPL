import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import api from '../services/api'

const portraitTone = {
  accent: 'bg-wigra-accent text-white',
  gold: 'bg-wigra-gold text-wigra-black',
  dark: 'bg-wigra-black text-white',
  light: 'border border-wigra-black/10 bg-white text-wigra-black',
  muted: 'bg-wigra-muted text-white',
}

function TeamMemberCard({ member, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="group"
    >
      <div
        className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg ${
          portraitTone[member.tone] || portraitTone.dark
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.34),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.2),transparent_45%)] opacity-80" />
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span className="relative font-serif text-6xl font-semibold tracking-tight md:text-7xl">
            {member.initials}
          </span>
        )}
      </div>

      <div className="mt-4">
        <h3 className="inline-flex rounded-full border border-wigra-black/35 px-3 py-1 text-sm font-semibold leading-none">
          {member.name}
        </h3>
        <p className="mt-2 text-sm text-wigra-black/60">{member.role}</p>
      </div>
    </motion.article>
  )
}

export default function OurTeamPage() {
  const [team, setTeam] = useState(null)

  useEffect(() => {
    api.getTeams().then(setTeam)
  }, [])

  if (!team) return <div className="min-h-screen bg-wigra-gray" />

  const featuredMembers = team.slice(0, 3)
  const remainingMembers = team.slice(3)

  return (
    <PageTransition>
      <section className="min-h-screen bg-wigra-gray px-6 pb-20 pt-32 text-wigra-black md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.header
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="max-w-5xl"
          >
            <div className="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
              <span className="h-3 w-3 rotate-45 bg-wigra-accent" />
              <span className="rounded-full border border-wigra-black/35 px-3 py-1">
                Who
              </span>
              <span className="rounded-full border border-wigra-black/35 px-3 py-1">
                We
              </span>
              <span className="rounded-full border border-wigra-black/35 px-3 py-1">
                Are
              </span>
            </div>
            <h1 className="max-w-4xl font-sans text-4xl font-semibold uppercase leading-[0.98] tracking-normal md:text-6xl lg:text-7xl">
              A Team Of Film Creators
            </h1>
          </motion.header>

          <div className="my-10 h-px w-full bg-wigra-black/10 md:my-14" />

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="max-w-xl text-base font-semibold uppercase leading-7 tracking-[0.05em] md:text-lg"
            >
              W/ Their Gratitude started as a creative space to develop stories,
              production discipline, and friendship through film.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="space-y-5 text-sm leading-7 text-wigra-black/60 md:text-base"
            >
              <p>
                Our collaborators move between directing, writing, producing,
                editing, events, and community building. Each project is treated as a
                place to sharpen taste, process, and trust.
              </p>
              <p>
                The team structure stays flexible so every production can find the
                right mix of people, from short films and commercials to filmmaker
                gatherings.
              </p>
            </motion.div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredMembers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}

            <motion.aside
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="flex min-h-[260px] flex-col justify-between rounded-lg bg-wigra-accent p-6 text-white"
            >
              <div className="flex gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-wigra-black text-xs font-semibold">
                  IG
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-wigra-black text-xs font-semibold">
                  YT
                </span>
              </div>
              <p className="text-sm leading-6 text-white/85">
                "Good films are built by people who listen closely before the camera
                starts rolling."
              </p>
              <div>
                <h3 className="inline-flex rounded-full border border-white/60 px-3 py-1 text-sm font-semibold leading-none">
                  Collective
                </h3>
                <p className="mt-2 text-sm text-white/75">Creative Production House</p>
              </div>
            </motion.aside>

            {remainingMembers.map((member, index) => (
              <TeamMemberCard
                key={member.name}
                member={member}
                index={index + featuredMembers.length + 1}
              />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
