import { Briefcase, SealCheck, UsersThree, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  firstName: string
  handle: string
  role: string
  avatarSrc: string
  avatarLightSrc: string
  avatarDarkSrc: string
  verifiedLabel: string
  email: string
  phone: string
  location: string
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Connie Frances Fumar',
  firstName: 'Connie',
  handle: '@itsyourcasheny',
  role: 'Junior IT Support & UI/UX Designer',
  avatarSrc: '/images/profile-dark.jpg',
  avatarLightSrc: '/images/profile-light.jpg',
  avatarDarkSrc: '/images/profile-dark.jpg',
  verifiedLabel: 'TESDA National Certificate II in Computer Systems Servicing',
  email: 'conniefrancesfumarjobapplicant@gmail.com',
  phone: '+63 966 217 6103',
  location: 'Alcantara, Romblon, Philippines',
  stats: [
    { value: '4', label: 'Featured projects', Icon: Briefcase },
    { value: '2', label: 'Certifications', Icon: SealCheck },
    { value: '2', label: 'Community groups', Icon: UsersThree },
  ],
  displayName: { line1: 'Technology should feel', line2: 'human.' },
  hero: {
    body: 'I’m Connie, an early-career IT Assistant and Junior IT Support professional focused on technical support, web application development, and user-centered design. I bring clear customer communication and practical problem-solving to better user experiences.',
    portraitSrc: '/images/profile-dark.jpg',
    portraitAlt: 'Portrait of Connie Frances Fumar',
  },
  socials: [
    { label: 'Facebook profile', href: 'https://web.facebook.com/itsyourdawgcashyy/', iconPath: '/icons/facebook.svg' },
    { label: 'Instagram profile', href: 'https://www.instagram.com/itsyourcasheny/', iconPath: '/icons/instagram.svg' },
  ],
}
