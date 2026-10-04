export type PortfolioProject = {
  id: string
  name: string
  category: string
  period: string
  role: string
  description: string
  image: string
  imageAlt: string
  tags: string[]
  outcome?: string
  href?: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'e-barangay',
    name: 'E-Barangay ni Kap',
    category: 'Service platform',
    period: '2024–2025',
    role: 'UI/UX Designer & Co-Developer',
    description: 'Mapped document-request flows, created wireframes, and shaped portal features with resident feedback to make barangay services easier to access.',
    image: '/images/e-barangay-preview.webp',
    imageAlt: 'Preview of the E-Barangay ni Kap interface',
    tags: ['Service flows', 'Resident access', 'Community services'],
  },
  {
    id: 'archivia',
    name: 'ARCHIVIA',
    category: 'Records interface',
    period: '2025–2026',
    role: 'UI/UX Designer & Frontend Developer',
    description: 'Designed Figma workflows and built responsive frontend components for document search, retrieval, and administration, refining the experience through user testing.',
    image: '/images/archivia-preview.webp',
    imageAlt: 'Preview of the ARCHIVIA interface',
    tags: ['Record retrieval', 'Admin workflow', 'Responsive frontend'],
  },
  {
    id: 'romantic-music-player',
    name: 'Romantic Music Player',
    category: 'Portfolio project',
    period: 'Independent concept',
    role: 'UI/UX & Frontend',
    description: 'Created a responsive music-player concept with a softer visual style, clear playback controls, and a focused listening experience.',
    image: '/images/romantic-music-player-preview.webp',
    imageAlt: 'Preview of the Romantic Music Player interface',
    tags: ['Visual mood', 'Playback clarity', 'Responsive frontend'],
    href: 'https://ikaw-pa-rin-romantic-music-player-c.vercel.app',
  },
  {
    id: 'resumay',
    name: 'ResuMay!',
    category: 'Career tool',
    period: '2025–2026',
    role: 'Developer',
    description: 'Built an interactive ATS resume optimizer, refining scoring and PDF export with user feedback to help applicants improve their resumes.',
    image: '/images/resumay-preview.webp',
    imageAlt: 'Preview of the ResuMay ATS Resume Optimizer interface',
    tags: ['ATS scoring', 'Resume optimization', 'PDF export'],
    href: 'https://resumaybuilder.vercel.app/',
  },
]

export const skillGroups = [
  {
    title: 'Design & user experience',
    items: ['Figma', 'Wireframing', 'User-centered interface design', 'Visual graphic design', 'User testing'],
  },
  {
    title: 'Web applications',
    items: ['HTML', 'CSS', 'JavaScript', 'Responsive interfaces', 'Web application development'],
  },
  {
    title: 'IT support',
    items: ['Technical support', 'Hardware troubleshooting', 'Computer systems servicing', 'Microsoft 365', 'Google Workspace'],
  },
  {
    title: 'People & operations',
    items: ['Customer service', 'Team leadership', 'Data encoding', 'Product listing', 'Problem-solving', 'Team communication', 'AI-assisted media editing'],
  },
]

export const workExperience = [
  {
    period: '2021–2022',
    location: 'Leyte',
    organization: 'Chowking',
    role: 'Service Crew Team Leader',
    details: [
      'Led team members to keep daily operations organized and customer service consistent.',
      'Handled customer inquiries, cash operations, troubleshooting, and task delegation in a fast-paced environment.',
      'Trained team members on service protocols and monitored customer feedback.',
    ],
  },
  {
    period: '2018–2020',
    location: 'Leyte',
    organization: 'Eboy’s Catering Services',
    role: 'On-Call Banquet Waiter',
    details: [
      'Supported food and beverage service during events while maintaining quality and guest service.',
      'Assisted with event setup and logistics, coordinated with teammates, and helped resolve service issues.',
      'Maintained clean service areas and supported training for new staff.',
    ],
  },
]

export const education = [
  {
    period: '2023–2026',
    location: 'Leyte',
    school: 'ACLC College of Tacloban',
    program: 'Bachelor of Science in Information Technology, specializing in Web Application Development',
  },
  {
    period: '2017–2019',
    location: 'Leyte',
    school: 'Tanauan School of Craftsmanship and Home Industries',
    program: 'Senior High School',
  },
  {
    period: '2014–2018',
    location: 'Romblon',
    school: 'Alcantara National High School',
    program: 'Junior High School',
  },
  {
    period: '2009–2014',
    location: 'Romblon',
    school: 'Sacred Heart School',
    program: 'Elementary',
  },
]

export const credentials = [
  {
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google · Coursera',
    detail: 'UX design studies through Google and Coursera.',
    image: '/images/coursera-badge.png',
    imageAlt: 'Coursera Google UX Design Professional Certificate badge',
    href: '/documents/Coursera-UX-Design-Professional-Certificate.pdf',
  },
  {
    title: 'TESDA National Certificate II in Computer Systems Servicing',
    issuer: 'TESDA · Technical',
    detail: 'Issued August 12, 2025 · Valid through August 11, 2030.',
    image: '/images/tesda-css-nc-ii.jpg',
    imageAlt: 'TESDA National Certificate II in Computer Systems Servicing awarded to Connie Frances Fumar',
    href: '/images/tesda-css-nc-ii.jpg',
  },
]

export const recognitions = [
  'Service Awardee',
  'Merit Awardee',
  'Editorial Cartoonist for MARQUEE',
  'Outstanding Student',
  '3rd Placer · National PhilHealth Digital Art Competition',
]

export const community = [
  {
    period: '2019–2026',
    organization: 'MARQUEE Student Publication',
    role: 'Editorial cartoonist and publication member',
  },
  {
    period: '2020–2023',
    organization: 'Samar Artist Guild',
    role: 'Member',
  },
]

export const interests = ['Rust painting and medium artistry', 'Editorial cartooning', 'Fine arts and visual design']

export const resumeHref = '/documents/Connie-Frances-Fumar-Resume.pdf'
