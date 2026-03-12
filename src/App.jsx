import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Linkedin,
  Github,
  Mail,
  FileText,
  ArrowDown,
  ExternalLink,
  Terminal,
  Sparkles,
  TrendingUp,
  Users,
  Rocket,
  DollarSign,
  Briefcase,
  Layers,
  Zap,
  Target,
  Code,
  Bot,
  Lock,
  X,
} from 'lucide-react'

/* ───────────────────────── helpers ───────────────────────── */

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = (e) => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return mobile
}

function AnimCard({ children, index = 0, className = '', ...rest }) {
  const mobile = useIsMobile()
  if (mobile) {
    return <div className={className} {...rest}>{children}</div>
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

function Section({ children, id, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const mobile = useIsMobile()

  if (mobile) {
    return (
      <section id={id} className={`relative px-6 md:px-12 lg:px-20 ${className}`}>
        {children}
      </section>
    )
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`relative px-6 md:px-12 lg:px-20 ${className}`}
    >
      {children}
    </motion.section>
  )
}

function SectionTitle({ children, sub }) {
  return (
    <div className="mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
        {children}
      </h2>
      {sub && (
        <p className="mt-3 text-zinc-400 text-lg max-w-2xl">{sub}</p>
      )}
      <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent-orange to-accent-orange-light" />
    </div>
  )
}

function GlowBlob({ className }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-20 ${className}`}
    />
  )
}

function CVModal({ isOpen, onClose }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(false)

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setChecking(true)
    setError(false)

    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

    if (hashHex === '5fc1188e2bfbaf68b62aa2fb37686c6713c289aa80a2d7cb762bfe0e16b9c468') {
      window.open('https://drive.google.com/file/d/199ctf6_1NTa5krLXEVMiCNgvef6TRKFk/view?usp=sharing', '_blank')
      setPassword('')
      onClose()
    } else {
      setError(true)
    }
    setChecking(false)
  }, [password, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-dark-800 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <Lock className="mx-auto w-10 h-10 text-accent-orange mb-3" />
              <h3 className="text-xl font-bold text-white">Download CV</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Enter the password to download.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false) }}
                placeholder="Password"
                autoFocus
                className="w-full rounded-xl border border-white/10 bg-dark-900 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-accent-orange/50 transition-colors"
              />
              {error && (
                <p className="mt-2 text-xs text-red-400">
                  Incorrect password. Please try again.
                </p>
              )}
              <button
                type="submit"
                disabled={checking || !password}
                className="mt-4 w-full rounded-xl bg-accent-orange px-5 py-3 text-sm font-semibold text-dark-900 hover:shadow-lg hover:shadow-accent-orange/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checking ? 'Verifying...' : 'Download'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ───────────────────────── Nav ───────────────────────── */

function Nav() {
  const links = [
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#strengths' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-dark-900/70 border-b border-white/5"
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <a
          href="#"
          className="text-lg font-bold text-white tracking-tight hover:text-accent-orange transition-colors"
        >
          IE<span className="text-accent-orange">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="hover:text-white transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 px-5 py-2 text-sm font-medium text-accent-orange hover:bg-accent-orange/20 transition-all"
        >
          Get in Touch
        </a>
      </div>
    </motion.nav>
  )
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero({ onCVClick }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <GlowBlob className="w-[600px] h-[600px] bg-accent-orange top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <GlowBlob className="w-[400px] h-[400px] bg-accent-green top-2/3 left-1/3" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Photo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto mb-8 relative"
        >
          <div className="absolute inset-0 mx-auto w-44 h-44 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-accent-orange via-accent-orange-light to-accent-green blur-2xl opacity-40 animate-pulse" />
          <img
            src="/photo.jpg"
            alt="Ilya Efimov"
            className="relative mx-auto w-44 h-44 md:w-52 md:h-52 rounded-full object-cover border-2 border-white/10 shadow-2xl shadow-accent-orange/20"
            onError={(e) => {
              e.target.onerror = null
              e.target.src =
                'https://ui-avatars.com/api/?name=Ilya+Efimov&size=256&background=1a1a1d&color=f97316&bold=true&font-size=0.35'
            }}
          />
        </motion.div>

        {/* Name & headline */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight"
          style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
        >
          Ilya Efimov
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-5 text-lg md:text-xl font-medium text-accent-orange tracking-wide"
        >
          AI Solutions Architect | AI Agents,
          <br />
          Solution Design & Technical Delivery
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-6 max-w-2xl text-zinc-400 text-base md:text-lg leading-relaxed"
        >
          Hands-on technical leader with proven delivery across AI agents,
          multi-agent systems, simulation, and startup software: built and
          tested MVPs, raised a 6-figure startup runway, helped secure a
          7-digit investment round, and developed simulation systems for
          autonomous driving AI in ambiguous, early-stage environments.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#experience"
            className="inline-flex items-center gap-2 rounded-full bg-accent-orange px-7 py-3 text-sm font-semibold text-dark-900 shadow-lg shadow-accent-orange/25 hover:shadow-accent-orange/40 hover:scale-105 transition-all duration-300"
          >
            View Experience <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/25 transition-all duration-300"
          >
            Get in Touch <Mail className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-10 flex justify-center gap-5"
        >
          {[
            { icon: Linkedin, href: 'https://www.linkedin.com/in/madcoder39/', label: 'LinkedIn' },
            { icon: Github, href: 'https://github.com/MadCoder39', label: 'GitHub' },
            { icon: FileText, href: null, label: 'CV', onClick: onCVClick },
            { icon: Mail, href: 'mailto:madcoder39@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label, onClick }) => (
            <a
              key={label}
              href={href || undefined}
              target={href && !href.startsWith('mailto') ? '_blank' : undefined}
              rel={href && !href.startsWith('mailto') ? 'noopener noreferrer' : undefined}
              onClick={onClick ? (e) => { e.preventDefault(); onClick() } : undefined}
              aria-label={label}
              className="group flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-accent-orange hover:border-accent-orange/40 hover:bg-accent-orange/10 transition-all duration-300 cursor-pointer"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ───────────────────────── Highlights ───────────────────────── */

const highlights = [
  {
    icon: Users,
    stat: '20+',
    label: 'Scaled a studio to 20+ people',
    color: 'orange',
  },
  {
    icon: TrendingUp,
    stat: '7-Figure Revenue',
    label: 'Reached 7-figure annual turnover',
    color: 'green',
  },
  {
    icon: Rocket,
    stat: '6-Figure Runway',
    label: 'Raised 6-figure startup runway',
    color: 'green',
  },
  {
    icon: DollarSign,
    stat: '$2K MRR',
    label: 'Internal tool → $2K MRR in 6 months',
    color: 'green',
  },
  {
    icon: Briefcase,
    stat: '7-Digit Round',
    label: 'Helped secure a 7-digit investment round',
    color: 'green',
  },
  {
    icon: Layers,
    stat: '4 Verticals',
    label: 'AI, GameDev, Web3, and DevOps',
    color: 'orange',
  },
]

function Highlights() {
  return (
    <Section id="highlights" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle sub="Key milestones and measurable impact">
          Highlights
        </SectionTitle>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h, i) => {
            const isOrange = h.color === 'orange'
            return (
              <AnimCard
                key={i}
                index={i}
                className="group relative rounded-2xl border border-white/5 bg-dark-800/60 p-6 hover:border-white/10 hover:bg-dark-700/60 transition-all duration-300"
              >
                <div
                  className={`mb-4 inline-flex items-center justify-center w-11 h-11 rounded-xl ${
                    isOrange
                      ? 'bg-accent-orange/10 text-accent-orange'
                      : 'bg-accent-green/10 text-accent-green'
                  }`}
                >
                  <h.icon className="w-5 h-5" />
                </div>
                <div
                  className={`font-bold ${
                    isOrange ? 'text-accent-orange' : 'text-accent-green'
                  } ${h.stat.length > 10 ? 'text-xl' : 'text-2xl'}`}
                >
                  {h.stat}
                </div>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {h.label}
                </p>
              </AnimCard>
            )
          })}
        </div>
      </div>
    </Section>
  )
}


/* ───────────────────────── Experience ───────────────────────── */

const experiences = [
  {
    title: 'Cycling Bear Studio',
    role: 'Co-Founder & CEO',
    descriptor: 'Mobile games, Web3 games & AR applications',
    bullets: [
      'Led product and business development across client and internal projects.',
      'Built and scaled the studio to 20+ people and 7-figure annual turnover.',
    ],
    accent: 'orange',
  },
  {
    title: 'Leea Labs',
    role: 'Co-Founder & CIO',
    descriptor: 'AI agents and Web3 infrastructure startup',
    bullets: [
      'Raised 6-figure startup runway and led BD across AI and infrastructure concepts.',
      'Built and tested MVPs across AI agents, private AI, multi-agent systems, and Web3 infrastructure.',
    ],
    accent: 'orange',
  },
  {
    title: 'The Games Cloud',
    role: 'Co-Founder & CEO',
    descriptor: 'CI/CD and workflow tooling for game studios',
    bullets: [
      'Turned an internal tooling solution into a market-facing product.',
      'Took the product to $2K MRR in 6 months.',
    ],
    accent: 'orange',
  },
  {
    title: 'Althimis Inc.',
    role: 'Senior Unity Developer',
    descriptor: 'Defense-tech software and B2B virtual environments',
    bullets: [
      'Developed proprietary software for a defense-tech environment and contributed to a B2B web-based MMO project.',
      'Worked on complex real-time systems in a technically demanding product setting.',
    ],
    accent: 'green',
  },
  {
    title: 'Phantasma Labs',
    role: 'Unreal Engine Developer',
    descriptor: 'Simulation platform for autonomous driving training',
    bullets: [
      'Built a multiplayer city simulation in Unreal Engine 4.',
      'Contributed to an MVP that helped secure a 7-digit investment round.',
    ],
    accent: 'green',
  },
]

function Experience() {
  return (
    <Section id="experience" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle sub="Selected roles and ventures">
          Selected Experience
        </SectionTitle>

        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((exp, i) => {
            const isOrange = exp.accent === 'orange'
            return (
              <AnimCard
                key={i}
                index={i}
                className="group relative rounded-2xl border border-white/5 bg-dark-800/60 p-7 md:p-8 hover:border-white/10 hover:bg-dark-700/50 transition-all duration-300"
              >
                <div
                  className={`absolute top-0 left-8 w-12 h-1 rounded-b-full ${
                    isOrange ? 'bg-accent-orange' : 'bg-accent-green'
                  }`}
                />

                <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                <p
                  className={`mt-1 text-sm font-semibold ${
                    isOrange ? 'text-accent-orange' : 'text-accent-green'
                  }`}
                >
                  {exp.role}
                </p>
                <p className="mt-2 text-sm text-zinc-500 italic">
                  {exp.descriptor}
                </p>

                <ul className="mt-5 space-y-3">
                  {exp.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed"
                    >
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                          isOrange ? 'bg-accent-orange/60' : 'bg-accent-green/60'
                        }`}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </AnimCard>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

/* ───────────────────────── Strengths ───────────────────────── */

const skills = [
  {
    title: 'AI & Solution Design',
    icon: Bot,
    items: [
      'AI Agents & Multi-Agent Systems',
      'Private AI',
      'Solution Design',
      'MVP Validation',
    ],
  },
  {
    title: 'Stakeholder & Delivery',
    icon: Target,
    items: [
      'Technical Communication',
      'Requirements Shaping',
      'Cross-Functional Delivery',
      'Roadmapping',
      'Stakeholder Management',
    ],
  },
  {
    title: 'Technical Delivery',
    icon: Code,
    items: [
      'Unity & Unreal Engine',
      'Real-Time Simulation Systems',
      'Git / Jira / Scrum / CI/CD',
    ],
  },
  {
    title: 'AI-Native Workflows',
    icon: Zap,
    items: [
      'Claude Code / Cursor / MCPs',
      'Prompt Engineering',
    ],
  },
]

function Skills() {
  return (
    <Section id="strengths" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle>
          Skills
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((col, i) => (
            <AnimCard
              key={i}
              index={i}
              className="rounded-2xl border border-white/5 bg-dark-800/50 p-6 hover:border-white/10 transition-all duration-300"
            >
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent-orange/10 text-accent-orange">
                <col.icon className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-base font-bold text-white mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2.5 text-sm text-zinc-400"
                  >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-green/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimCard>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────────────────────── Projects / Case Studies ───────────────────────── */

const projects = [
  {
    image: '/projects/foxli.jpeg',
    title: 'Foxli.io',
    link: 'https://foxli.io',
    summary:
      'AR iOS app for construction workflows, designed to make on-site visualization and interaction more practical and accessible.',
    role: 'Producer',
    outcome: 'Built and helped launch a real-world AR product for the construction space.',
  },
  {
    image: '/projects/the oct.png',
    title: 'TheOct.xyz',
    link: 'https://theoct.xyz',
    summary:
      'Built the initial MVP and launched it to market, helping validate the product direction and support early user traction.',
    role: 'Producer',
    outcome: 'MVP launched and early traction supported.',
  },
  {
    image: '/projects/phantasma.svg',
    title: 'Phantasma Labs',
    link: 'https://www.phantasma.global/',
    summary:
      'Led development of an UE4 city simulation used for self-driving cars AI training. Helped secure a 7-digit funding round and lead a team of senior engineers.',
    role: 'Unreal Engine Developer',
    outcome: 'Contributed to a 7-digit funding round and built out a senior engineering team.',
  },
  {
    image: '/projects/VATTS.jpeg',
    title: 'VATTS: AI for Curious Kids',
    link: 'https://apps.apple.com/us/app/vatts-ai-for-curious-kids/id6450422355',
    summary:
      'Built the initial MVP and launched it on mobile app stores. Helped validate the concept and achieve early traction with users.',
    role: 'Producer',
    outcome: 'MVP launched and initial traction achieved.',
  },
  {
    image: '/projects/77bit.jpeg',
    title: '77-Bit',
    link: 'https://77-bit.com/',
    summary:
      'Led game design and narrative development. Helped take the product from concept to MVP in 12 weeks and supported NFT sales totaling $20M.',
    role: 'Producer',
    outcome: 'MVP delivered in 12 weeks, contributed to a $20M NFT sales outcome.',
  },
  {
    image: '/projects/metasaurs.png',
    title: 'Metasaurs',
    link: 'https://drive.google.com/file/u/2/d/1MSH7pQjUe0KhExokDZnic_Z_bSIwhiEi/view?usp=sharing',
    summary:
      'Web-based FPS game built as additional utility for an NFT collection. Helped drive sales of the next collection (~$7M).',
    role: 'Producer',
    outcome: 'Delivered a playable multiplayer web FPS; helped drive ~$7M in follow-up collection sales.',
  },
  {
    image: '/projects/the games cloud.jpeg',
    title: 'The Games Cloud',
    link: 'https://www.linkedin.com/company/the-games-cloud',
    summary:
      'From internal tool to MRR-generating startup. DevOps-as-a-Service for game development studios.',
    role: 'Co-Founder & CEO',
    outcome: 'Reached $2K MRR within 6 months of launch.',
  },
  {
    image: '/projects/autokill ico.jpeg',
    title: 'Autokill',
    link: 'https://drive.google.com/file/d/102f5mE1F7D0Y2ANz1HO0Rh0_uBJFu7zx/view?usp=sharing',
    summary:
      'Mobile multiplayer extraction shooter prototype built with a custom networking solution. In-house project of Cycling Bear.',
    role: 'Producer',
    outcome: 'Delivered a playable demo using an in-house networking architecture.',
  },
]

function Projects() {
  return (
    <Section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle sub="Selected work and case studies">
          Featured Projects
        </SectionTitle>

        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((p, i) => (
            <AnimCard
              key={i}
              index={i}
              className="group rounded-2xl border border-white/5 bg-dark-800/50 overflow-hidden hover:border-white/10 transition-all duration-300 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div className="relative h-44 bg-dark-700 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent-orange transition-colors"
                    >
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 hover:text-accent-orange transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {p.summary}
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-accent-orange/10 text-accent-orange px-3 py-1 font-medium">
                      {p.role}
                    </span>
                  </div>
                  <p className="text-xs text-accent-green flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    {p.outcome}
                  </p>
                </div>
              </div>
            </AnimCard>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────────────────────── AI Workflow ───────────────────────── */

function AIWorkflow() {
  const lines = [
    { prompt: '>', text: 'init ai-workflow' },
    { prompt: '', text: 'tools: Cursor, Claude Code, MCP' },
    { prompt: '>', text: 'receive requirements --format napkin' },
    { prompt: '', text: 'status: unwrinkling napkin' },
    { prompt: '>', text: 'analyze requirements' },
    { prompt: '', text: 'status: extracting actual task' },
    { prompt: '>', text: 'build phase-1' },
    { prompt: '', text: 'status: first 80% complete' },
    { prompt: '>', text: 'build phase-2' },
    { prompt: '', text: 'status: second 80% almost done' },
    { prompt: '>', text: 'review output' },
    { prompt: '', text: 'checks: logic, edge cases, UX' },
    { prompt: '', text: 'status: somehow works on first try' },
    { prompt: '>', text: 'ship prototype' },
    { prompt: '', text: 'result: MVP delivered' },
  ]

  return (
    <Section id="ai-workflow" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle sub="AI-native development and prototyping">
          How I Work with AI
        </SectionTitle>

        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <div>
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
              I use AI-first workflows with tools like{' '}
              <span className="text-accent-orange font-semibold">Cursor</span>{' '}
              and{' '}
              <span className="text-accent-orange font-semibold">
                Claude Code
              </span>{' '}
              for research, prototyping, implementation, and iteration.
            </p>
            <p className="mt-5 text-zinc-400 text-base leading-relaxed">
              I'm interested not just in using AI tools, but in designing better
              workflows around them: prompts, reusable patterns, automations,
              MCP integrations, sub-agents, and developer experience
              improvements.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                'Cursor',
                'Claude Code',
                'MCP',
                'Sub-agents',
                'Prompt Engineering',
                'Automation',
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent-green/10 text-accent-green text-xs font-medium px-4 py-1.5 border border-accent-green/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Terminal block */}
          <AnimCard
            index={0}
            className="rounded-2xl border border-white/10 bg-dark-900 overflow-hidden shadow-2xl shadow-accent-orange/5"
          >
            <div className="flex items-center gap-2 px-5 py-3 bg-dark-800 border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="ml-3 text-xs text-zinc-500 font-mono">
                ~/ai-workflow
              </span>
            </div>

            <div className="p-5 font-mono text-sm space-y-1.5">
              {lines.map((line, i) => (
                <div key={i} className="flex items-center gap-2">
                  {line.prompt ? (
                    <>
                      <span className="text-accent-orange">{line.prompt}</span>
                      <span className="text-zinc-300">{line.text}</span>
                    </>
                  ) : (
                    <span className="text-zinc-500 pl-4">{line.text}</span>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-accent-orange">{'>'}</span>
                <span className="w-2 h-4 bg-accent-orange/80 animate-pulse" />
              </div>
            </div>
          </AnimCard>
        </div>
      </div>
    </Section>
  )
}

/* ───────────────────────── Contact ───────────────────────── */

function Contact({ onCVClick }) {
  return (
    <Section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <GlowBlob className="w-96 h-96 bg-accent-orange top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <AnimCard index={0} className="relative">
          <Bot className="mx-auto w-12 h-12 text-accent-orange mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Let's Build Something Together
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-xl mx-auto">
            Whether you're exploring a partnership, hiring for a technical
            role, or just want to exchange ideas — I'd love to hear from you.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:madcoder39@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-accent-orange px-7 py-3 text-sm font-semibold text-dark-900 shadow-lg shadow-accent-orange/25 hover:shadow-accent-orange/40 hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-4 h-4" /> Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/madcoder39/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/25 transition-all duration-300"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <button
              onClick={onCVClick}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer"
            >
              <FileText className="w-4 h-4" /> Download CV
            </button>
          </div>
        </AnimCard>
      </div>
    </Section>
  )
}

/* ───────────────────────── Footer ───────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6 text-center text-sm text-zinc-600">
      <p>
        © {new Date().getFullYear()} Ilya Efimov · Built with AI
      </p>
    </footer>
  )
}

/* ───────────────────────── App ───────────────────────── */

export default function App() {
  const [cvModalOpen, setCvModalOpen] = useState(false)
  const openCVModal = useCallback(() => setCvModalOpen(true), [])

  return (
    <div className="relative overflow-x-hidden">
      <Nav />
      <Hero onCVClick={openCVModal} />
      <Highlights />
      <Experience />
      <Skills />
      <Projects />
      <AIWorkflow />
      <Contact onCVClick={openCVModal} />
      <Footer />
      <CVModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </div>
  )
}
