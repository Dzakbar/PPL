/**
 * API Service Layer
 * Currently uses dummy data. Replace with real API calls when backend is ready.
 *
 * Usage:
 *   import api from '@/services/api'
 *   const films = await api.getFilms()
 */

import {
  films as dummyFilms,
  events as dummyEvents,
  companyInfo as dummyCompanyInfo,
} from '../data/dummyData'

// Set this to your API base URL when backend is ready
const API_BASE_URL = import.meta.env.VITE_API_URL || ''

// When true, uses local dummy data instead of API calls
const USE_DUMMY = !API_BASE_URL

async function fetchFromAPI(endpoint) {
  if (USE_DUMMY) return null

  const res = await fetch(`${API_BASE_URL}${endpoint}`)
  if (!res.ok) throw new Error(`API Error: ${res.status}`)
  return res.json()
}

const api = {
  // Films
  async getFilms() {
    const data = await fetchFromAPI('/api/films')
    return data || dummyFilms
  },

  async getFilmById(id) {
    const data = await fetchFromAPI(`/api/films/${id}`)
    if (data) return data
    return dummyFilms.find((f) => f.id === Number(id)) || null
  },

  // Events
  async getEvents() {
    const data = await fetchFromAPI('/api/events')
    return data || dummyEvents
  },

  async getEventById(id) {
    const data = await fetchFromAPI(`/api/events/${id}`)
    if (data) return data
    return dummyEvents.find((e) => e.id === Number(id)) || null
  },

  // Company Info
  async getCompanyInfo() {
    const data = await fetchFromAPI('/api/company-info')
    return data || dummyCompanyInfo
  },
}

export default api
