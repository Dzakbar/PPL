import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ASSETS } from '../../constants/assets'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/films', label: 'Films' },
  { path: '/events', label: 'Events' },
]

export default function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHome = location.pathname === '/'
  const hasDarkBanner =
    isHome || ['/about', '/our-story', '/registration'].includes(location.pathname)
  // Use dark text only on pages with white banners before scroll
  const useDarkText = !hasDarkBanner && !scrolled && !isOpen
  const isActiveLink = (path) =>
    location.pathname === path ||
    (path === '/about' && ['/our-story', '/our-team'].includes(location.pathname)) ||
    (path === '/films' && location.pathname === '/registration')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${
          scrolled && !isOpen
            ? 'bg-wigra-black/90 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-4">
          {/* Logo */}
          <Link to="/" className="relative z-[60]">
            <img
              src={ASSETS.logo}
              alt="Wigra Logo"
              className={`h-8 md:h-10 transition-all duration-300 ${
                useDarkText ? 'brightness-0' : 'brightness-0 invert'
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative font-sans text-sm tracking-[0.1em] uppercase transition-colors duration-300 ${
                  useDarkText
                    ? isActiveLink(path)
                      ? 'text-wigra-black'
                      : 'text-wigra-black/50 hover:text-wigra-black'
                    : isActiveLink(path)
                      ? 'text-white'
                      : 'text-white/50 hover:text-white'
                }`}
              >
                {label}
                {isActiveLink(path) && (
                  <motion.div
                    layoutId="nav-underline"
                    className={`absolute -bottom-1 left-0 w-full h-[1px] transition-colors duration-300 ${
                      useDarkText ? 'bg-wigra-black' : 'bg-white'
                    }`}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:block">
            <a
              href="https://wa.me/62812811109850"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block px-8 py-3 border font-sans text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                useDarkText
                  ? 'border-wigra-black/30 text-wigra-black hover:bg-wigra-black hover:text-white'
                  : 'border-white/30 text-white hover:bg-white hover:text-wigra-black'
              }`}
            >
              Get in Touch
            </a>
          </div>

          {/* Hamburger Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-[60] w-8 h-6 flex flex-col justify-between"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-full h-[1px] transition-all duration-300 origin-center ${
                useDarkText ? 'bg-wigra-black' : 'bg-white'
              } ${isOpen ? 'rotate-45 translate-y-[10px]' : ''}`}
            />
            <span
              className={`block w-full h-[1px] transition-all duration-300 ${
                useDarkText ? 'bg-wigra-black' : 'bg-white'
              } ${isOpen ? 'opacity-0 scale-0' : ''}`}
            />
            <span
              className={`block w-full h-[1px] transition-all duration-300 origin-center ${
                useDarkText ? 'bg-wigra-black' : 'bg-white'
              } ${isOpen ? '-rotate-45 -translate-y-[12px]' : ''}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu - Outside header to avoid stacking context issues */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-wigra-black/98 backdrop-blur-xl z-50 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map(({ path, label }, i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link
                    to={path}
                    className={`font-serif text-3xl tracking-wide transition-colors duration-300 ${
                      isActiveLink(path)
                        ? 'text-white'
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-6"
              >
                <a
                  href="https://wa.me/62812811109850"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Get in Touch
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
