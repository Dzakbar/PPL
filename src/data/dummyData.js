import { ASSETS } from '../constants/assets'

export const films = [
  {
    id: 1,
    title: 'Through Our Lens',
    director: 'M. Kifahi Avicenna Harris',
    duration: '04:37',
    genre: 'Romance - Coming of Age',
    category: 'films',
    image: ASSETS.throughOurLens,
    synopsis:
      'Kisah asmara antara Viggo dan Sky, sepasang siswa SMA di akhir tahun 2000an yang mengenal cinta lebih indah dari seisi dunia. Perjalanan mereka penuh dengan momen berharga dan pembelajaran tentang cinta sejati.',
  },
  {
    id: 2,
    title: 'Monokrom',
    director: 'Unknown',
    duration: '02:15',
    genre: 'Commercial',
    category: 'other',
    image: ASSETS.monokrom,
    synopsis:
      'Brand storytelling at its finest. A sleek and minimalist approach to commercial production that showcases modern aesthetics and creative vision.',
  },
  {
    id: 3,
    title: 'Lovebirds',
    director: 'Muhammad Abyndra',
    duration: '03:27',
    genre: 'Romance - Drama',
    category: 'films',
    image: ASSETS.lovebirds,
    synopsis:
      'Viggo dan Sky adalah sepasang burung yang tak lama ini bertemu. Kedua burung itu bertemu di dahan pohon yang sangat tinggi. Mereka sangat senang di atas sana, sampai akhirnya mereka mulai bernyanyi dan bersiul di dalam nyanyiannya ada nada cinta, harapan dan dunia.',
  },
  {
    id: 4,
    title: 'Mirooooooooo',
    director: 'Unknown',
    duration: '01:50',
    genre: 'Commercial',
    category: 'other',
    image: ASSETS.miro,
    synopsis:
      'Creative vision for brands that want to stand out and make an impact. Modern, bold, and memorable commercial production.',
  },
  {
    id: 5,
    title: 'Ai愛 (AI Love)',
    director: 'Muhammad Abyndra',
    duration: '09:11',
    genre: 'Romance - Sci Fi',
    category: 'films',
    image: ASSETS.aiLove,
    synopsis:
      'Sky dan VI-990 adalah dua produk humanoid AI buatan Ai yang saling terhubung secara digital. Mereka menemukan cinta dalam dunia virtual dan belajar tentang emosi manusia melalui koneksi mereka.',
  },
  {
    id: 6,
    title: 'Untitled Project',
    director: 'Unknown',
    duration: '02:45',
    genre: 'Commercial',
    category: 'other',
    image: ASSETS.monokrom,
    synopsis:
      'Visual storytelling mastery for a global brand campaign. Cinematic excellence combined with commercial appeal for maximum impact.',
  },
]

export const upcomingFilms = [
  {
    id: 1,
    slug: 'echoes-of-jakarta',
    title: 'Echoes of Jakarta',
    director: 'W/ Their Gratitude',
    genre: 'Drama - Coming of Age',
    status: 'Open Registration',
    image: ASSETS.filmmaker,
    productionWindow: 'July 2026',
    registrationDeadline: 'June 15, 2026',
    openRoles: ['Actor', 'Production Crew', 'Art Department', 'Behind The Scene'],
    synopsis:
      'A short film about young creatives finding their voice in the middle of a city that keeps moving faster than their dreams.',
  },
  {
    id: 2,
    slug: 'after-the-screening',
    title: 'After The Screening',
    director: 'Wigra Creative Team',
    genre: 'Community Documentary',
    status: 'Coming Soon',
    image: ASSETS.event,
    productionWindow: 'August 2026',
    registrationDeadline: 'July 10, 2026',
    openRoles: ['Documentary Crew', 'Editor', 'Researcher', 'Event Volunteer'],
    synopsis:
      'A documentary project following conversations, friendships, and ideas that appear after local film screenings.',
  },
]

export const events = [
  {
    id: 1,
    title: 'UI Art Festival',
    date: 'January 25, 2026',
    description:
      'Vestifal UI art adalah acara tahunan yang merayakan seni visual dan desain dalam industri perfilman. Acara ini menampilkan pameran karya seni, diskusi panel dengan seniman dan desainer terkemuka, serta lokakarya kreatif untuk para peserta.',
    images: [ASSETS.event, ASSETS.eventAlt],
  },
  {
    id: 2,
    title: 'Filmmaker Gathering',
    date: 'February 10, 2026',
    description:
      'Pertemuan komunitas filmmaker untuk berbagi pengalaman, berdialog tentang proses kreatif, dan membangun koneksi antar sesama kreator.',
    images: [ASSETS.event, ASSETS.eventAlt],
  },
  {
    id: 3,
    title: 'Short Film Screening',
    date: 'February 28, 2026',
    description:
      'Pemutaran film pendek karya komunitas Wigra, diikuti dengan diskusi dan sesi tanya jawab dengan para pembuat film.',
    images: [ASSETS.event, ASSETS.eventAlt],
  },
  {
    id: 4,
    title: 'Production Workshop',
    date: 'March 15, 2026',
    description:
      'Workshop intensif tentang teknik produksi film, dari pre-production hingga post-production, dipandu oleh profesional industri.',
    images: [ASSETS.event, ASSETS.eventAlt],
  },
]

export const companyInfo = {
  name: 'W/ Their Gratitude',
  tagline: 'Production House',
  location: 'Bogor, Indonesia',
  email: 'hello@wigra.id',
  whatsapp: '62812811109850',
  about:
    'W/ Their Gratitude is a production house dedicated to nurturing filmmaking talent in Indonesia. We believe in creating an ecosystem where creative minds can thrive and collaborate.',
  story: {
    background:
      'W/ Their Gratitude lahir dari semangat untuk membuka ruang produksi yang hangat bagi talenta film muda di Indonesia. Kami percaya proses kreatif terbaik tumbuh dari kolaborasi, rasa ingin tahu, dan keberanian untuk merawat ide sejak masih mentah hingga siap bertemu penonton.',
    vision:
      'Menjadi rumah produksi yang membantu melahirkan karya audio visual yang jujur, relevan, dan punya daya hidup panjang bagi komunitas kreatif Indonesia.',
    mission: [
      'Membangun proses produksi yang kolaboratif dari development, produksi, hingga distribusi.',
      'Memberi ruang bagi filmmaker, penulis, dan kreator visual untuk bertumbuh lewat proyek nyata.',
      'Menghadirkan karya film, komersial, dan program komunitas dengan standar visual yang kuat.',
    ],
  },
  team: [
    {
      name: 'Muhammad Abyndra',
      role: 'Director',
      initials: 'MA',
      tone: 'accent',
    },
    {
      name: 'M. Kifahi Avicenna Harris',
      role: 'Director',
      initials: 'KH',
      tone: 'gold',
    },
    {
      name: 'Wigra Creative Team',
      role: 'Creative Development',
      initials: 'WC',
      tone: 'dark',
    },
    {
      name: 'Production Crew',
      role: 'Production Support',
      initials: 'PC',
      tone: 'light',
    },
    {
      name: 'Editorial Team',
      role: 'Post-Production',
      initials: 'ET',
      tone: 'muted',
    },
    {
      name: 'Community Team',
      role: 'Events & Filmmakers',
      initials: 'CT',
      tone: 'accent',
    },
    {
      name: 'Partnership Team',
      role: 'Collaboration',
      initials: 'PT',
      tone: 'gold',
    },
  ],
  sections: [
    {
      title: 'Our Story',
      description:
        'W/ Their Gratitude is a production house dedicated to nurturing filmmaking talent in Indonesia. We believe in creating an ecosystem where creative minds can thrive and collaborate.',
    },
    {
      title: 'Our Team',
      description:
        'Meet the talented individuals and collaborators who bring our vision to life. Learn about the people behind our projects, their expertise, and the values that guide the way we work together.',
    },
    {
      title: 'For Filmmakers',
      description:
        'Resources, opportunities, and partnerships for filmmakers. Find information about our services, collaboration opportunities, and how we support the creative community.',
    },
  ],
}
