import { Link } from 'react-router-dom'
import { ASSETS } from '../../constants/assets'

const footerNav = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/our-story', label: 'Our Story' },
  { path: '/our-team', label: 'Our Team' },
  { path: '/films', label: 'Films' },
  { path: '/events', label: 'Events' },
]

const socialLinks = [
  { label: 'Instagram', icon: '📷', url: '#' },
  { label: 'Twitter', icon: '𝕏', url: '#' },
  { label: 'YouTube', icon: '▶️', url: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-white/50">
              <p>W/ Their Gratitude</p>
              <p>Bogor, Indonesia</p>
              <p>Email: hello@wigra.id</p>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="font-serif text-lg mb-4">Navigate</h4>
            <ul className="space-y-2">
              {footerNav.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-serif text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map(({ label, icon, url }) => (
                <a
                  key={label}
                  href={url}
                  title={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 
                             text-white/50 hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <img
              src={ASSETS.logo}
              alt="Wigra Logo"
              className="h-10 w-fit brightness-0 invert opacity-50"
            />
            <p className="text-xs text-white/30 leading-relaxed">
              A production house dedicated to nurturing filmmaking talent in Indonesia.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/30 order-2 md:order-1">
          &copy; {new Date().getFullYear()} W/ Their Gratitude. All rights reserved.
        </p>
        <div className="order-1 md:order-2 flex items-center gap-6">
          <a 
            href="http://localhost:8000/login/admin" 
            className="text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-wigra-gold transition-colors"
          >
            System Login
          </a>
        </div>
      </div>
    </footer>
  )
}
