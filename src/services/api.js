  import { ASSETS } from '../constants/assets'
import { COMPANY_INFO } from '../constants/companyInfo'

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000')
  .replace(/\/$/, '')

const API_ORIGIN = (() => {
  try {
    return new URL(API_BASE_URL).origin
  } catch {
    return API_BASE_URL
  }
})()

const toneCycle = ['accent', 'gold', 'dark', 'light', 'muted']

function unwrapCollection(payload, key) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  if (Array.isArray(payload[key])) return payload[key]
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.data?.data)) return payload.data.data
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.results)) return payload.results
  return []
}

function pick(source, keys, fallback = '') {
  for (const key of keys) {
    const value = source?.[key]
    if (value !== undefined && value !== null && value !== '') return value
  }
  return fallback
}

function toList(value) {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (typeof value === 'string') {
    if (value.trim().startsWith('[')) {
      try {
        return toList(JSON.parse(value))
      } catch {
        return []
      }
    }

    return value
      .split(/[,|\n]/)
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

function createSlug(value) {
  return String(value || 'project')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function createInitials(name) {
  return String(name || 'WTG')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function normalizeMediaUrl(value, fallback = '') {
  const url = Array.isArray(value) ? value[0] : value
  if (!url) return fallback
  if (typeof url === 'object') {
    return normalizeMediaUrl(
      pick(url, ['url', 'path', 'image', 'photo', 'image_url', 'image_path']),
      fallback,
    )
  }

  const normalized = String(url).trim()
  if (/^(https?:|data:|blob:)/i.test(normalized)) return normalized
  if (normalized.startsWith('/asset/')) return encodeURI(normalized)
  if (normalized.startsWith('asset/')) return encodeURI(`/${normalized}`)
  if (normalized.startsWith('/')) return `${API_ORIGIN}${encodeURI(normalized)}`
  return `${API_ORIGIN}/storage/${encodeURI(normalized)}`
}

function normalizeCategory(value, film) {
  const category = String(value || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')

  if (['film', 'films', 'movie', 'movies', 'short-film', 'short-films'].includes(category)) {
    return 'films'
  }

  if (['other', 'others', 'other-projects', 'commercial', 'commercials'].includes(category)) {
    return 'other'
  }

  if (category.includes('upcoming')) return 'upcoming'

  const genre = String(pick(film, ['genre', 'genres'], '')).toLowerCase()
  if (genre.includes('commercial')) return 'other'
  return category || 'films'
}

async function fetchFromAPI(endpoint) {
  try {
    const url = `${API_BASE_URL}${endpoint}`
    console.log(`[API Request] Fetching: ${url}`)
    
    const response = await fetch(url)
    if (!response.ok) throw new Error(`API Error ${response.status}: ${endpoint}`)
    
    const data = await response.json()
    console.log(`[API Response] Data from ${endpoint}:`, data)
    return data
  } catch (error) {
    console.error(`[API Error] Failed to fetch ${endpoint}:`, error.message)
    throw error
  }
}

function normalizeFilm(film, index = 0) {
  const title = pick(film, ['title', 'name', 'judul'], `Untitled Project ${index + 1}`)
  const status = pick(film, ['status', 'film_status'], '')
  const category = normalizeCategory(pick(film, ['category', 'type', 'project_type']), film)
  const openRoles = toList(pick(film, ['openRoles', 'open_roles', 'roles', 'role']))

  return {
    ...film,
    id: pick(film, ['id', 'film_id', '_id'], createSlug(title)),
    slug: pick(film, ['slug'], createSlug(title)),
    title,
    director: pick(film, ['director', 'sutradara', 'director_name'], 'Unknown'),
    duration: pick(film, ['duration', 'durasi'], '-'),
    genre: pick(film, ['genre', 'genres'], 'Film'),
    category,
    image: normalizeMediaUrl(
      pick(film, [
        'image',
        'poster',
        'thumbnail',
        'cover',
        'photo',
        'image_url',
        'image_path',
        'poster_url',
        'poster_path',
        'thumbnail_url',
      ]),
      ASSETS.filmmaker,
    ),
    synopsis: pick(film, ['synopsis', 'sinopsis', 'description', 'deskripsi'], ''),
    status: status || 'Released',
    productionWindow: pick(
      film,
      ['productionWindow', 'production_window', 'production_date', 'jadwal_produksi'],
      '-',
    ),
    registrationDeadline: pick(
      film,
      ['registrationDeadline', 'registration_deadline', 'deadline', 'batas_daftar'],
      '-',
    ),
    openRoles: openRoles.length ? openRoles : ['Production Crew'],
  }
}

function isUpcomingFilm(film) {
  // Only treat as upcoming if explicitly marked
  if (film.upcoming === true || film.is_upcoming === true) return true
  
  const category = String(film.category || '').toLowerCase()
  if (category.includes('upcoming')) return true
  
  const status = String(film.status || '').toLowerCase()
  if (status === 'open registration') return true
  
  // Only check registrationDeadline if it was explicitly set (not default '-')
  if (film.registrationDeadline && film.registrationDeadline !== '-') {
    const deadline = String(film.registrationDeadline).toLowerCase()
    if (deadline.includes('upcoming')) return true
  }
  
  return false
}

function normalizeEvent(event, index = 0) {
  const title = pick(event, ['title', 'name', 'judul'], `Event ${index + 1}`)
  const rawImages = toList(pick(event, ['images', 'gallery', 'photos', 'event_images']))
  const singleImage = pick(event, [
    'image',
    'poster',
    'thumbnail',
    'cover',
    'photo',
    'image_url',
    'image_path',
    'poster_url',
    'thumbnail_url',
  ])
  const images = (rawImages.length ? rawImages : [singleImage])
    .map((image) => normalizeMediaUrl(image, ASSETS.event))
    .filter(Boolean)

  return {
    ...event,
    id: pick(event, ['id', 'event_id', '_id'], createSlug(title)),
    title,
    date: pick(event, ['date', 'event_date', 'tanggal', 'created_at'], ''),
    description: pick(event, ['description', 'deskripsi', 'body', 'content'], ''),
    images: images.length ? images : [ASSETS.event],
  }
}

function normalizeTeamMember(member, index = 0) {
  const name = pick(member, ['name', 'nama', 'full_name'], `Team Member ${index + 1}`)

  return {
    ...member,
    id: pick(member, ['id', 'team_id', '_id'], createSlug(name)),
    name,
    role: pick(member, ['role', 'position', 'jabatan'], 'Creative Team'),
    initials: pick(member, ['initials', 'inisial'], createInitials(name)),
    tone: pick(member, ['tone', 'color'], toneCycle[index % toneCycle.length]),
    image: normalizeMediaUrl(
      pick(member, [
        'image',
        'photo',
        'avatar',
        'portrait',
        'image_url',
        'image_path',
        'photo_url',
        'profile_image',
      ]),
      '',
    ),
  }
}

async function getCollection(endpoint, key, normalizer) {
  try {
    const payload = await fetchFromAPI(endpoint)
    return unwrapCollection(payload, key).map(normalizer)
  } catch (error) {
    console.error(error)
    return []
  }
}

// ─── Toggle: true = dummy data, false = API backend ───
const USE_DUMMY = false

import { films as dummyFilms, upcomingFilms as dummyUpcoming, events as dummyEvents, companyInfo as dummyCompanyInfo } from '../data/dummyData'

const api = USE_DUMMY
  ? {
      async getFilms() { return dummyFilms },
      async getFilmById(id) { return dummyFilms.find((f) => String(f.id) === String(id)) || null },
      async getUpcomingFilms() { return dummyUpcoming },
      async getEvents() { return dummyEvents },
      async getEventById(id) { return dummyEvents.find((e) => String(e.id) === String(id)) || null },
      async getTeams() { return dummyCompanyInfo.team },
      async getCompanyInfo() { return dummyCompanyInfo },
    }
  : {
      async getFilms() {
        const films = await getCollection('/api/films', 'films', normalizeFilm)
        return films.filter((film) => !isUpcomingFilm(film))
      },
      async getFilmById(id) {
        const films = await getCollection('/api/films', 'films', normalizeFilm)
        return films.find((film) => String(film.id) === String(id)) || null
      },
      async getUpcomingFilms() {
        const films = await getCollection('/api/films', 'films', normalizeFilm)
        return films.filter(isUpcomingFilm)
      },
      async getEvents() {
        return getCollection('/api/events', 'events', normalizeEvent)
      },
      async getEventById(id) {
        const events = await getCollection('/api/events', 'events', normalizeEvent)
        return events.find((event) => String(event.id) === String(id)) || null
      },
      async getTeams() {
        return getCollection('/api/teams', 'teams', normalizeTeamMember)
      },
      async getCompanyInfo() {
        const team = await this.getTeams()
        return {
          ...COMPANY_INFO,
          team,
        }
      },
    }

export default api
