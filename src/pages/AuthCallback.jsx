import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const userData = params.get('user')

    if (token && userData) {
      try {
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user', decodeURIComponent(userData))
        
        // Success! Redirect to home or where they were
        navigate('/', { replace: true })
      } catch (error) {
        console.error('Failed to parse user data:', error)
        navigate('/films', { replace: true })
      }
    } else {
      // Something went wrong
      navigate('/', { replace: true })
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-wigra-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-wigra-accent border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <p className="text-white/60 font-sans tracking-widest uppercase text-xs">Authenticating...</p>
      </div>
    </div>
  )
}
