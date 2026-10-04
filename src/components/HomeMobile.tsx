import { Link } from 'react-router-dom'
import { Certificate, EnvelopeSimple, GraduationCap, SealCheck, Stack, VideoCamera } from '@/components/slab'
import type { Icon } from '@/components/slab'
import { profile } from '@/data/profile'
import { credentials, portfolioProjects } from '@/data/portfolio'
import QuickMenu from './QuickMenu'
import ProfileImages from './ProfileImages'

export function HomeProfile() {
  return (
    <header className="hprofile">
      <ProfileImages className="hprofile__avatar" alt={profile.name} width={56} height={56} loading="eager" />
      <div className="hprofile__who">
        <span className="hprofile__name">
          {profile.name}
          <SealCheck size={16} weight="fill" className="hprofile__verified" aria-label={profile.verifiedLabel} />
        </span>
        <span className="hprofile__handle">{profile.handle} · {profile.role}</span>
      </div>
      <QuickMenu className="hprofile__menu" />
    </header>
  )
}

export function HomeStats() {
  return (
    <ul className="hstats" role="list">
      {profile.stats.map(({ value, label, Icon }) => (
        <li key={label}>
          <Icon className="hstats__icon" size={18} weight="duotone" aria-hidden="true" />
          <b className="hstats__value">{value}</b>
          <span className="hstats__label">{label}</span>
        </li>
      ))}
    </ul>
  )
}

type ExploreTile = {
  n: string
  label: string
  to: string
  title: string
  desc: string
  img?: string
  profile?: boolean
  Icon?: Icon
  accent?: boolean
}

const TILES: ExploreTile[] = [
  { n: '01', label: 'Projects', to: '/projects', title: 'Selected work', desc: 'Service design, records, music, and career tools.', img: portfolioProjects[0].image },
  { n: '02', label: 'Services', to: '/services', title: 'Support and user-focused design', desc: 'IT support, responsive web interfaces, and UX design for everyday users and community organizations.', Icon: Stack },
  { n: '03', label: 'Showcase', to: '/showcase', title: 'Web application development', desc: 'ACLC College of Tacloban.', Icon: GraduationCap, accent: true },
  { n: '04', label: 'Credentials', to: '/credentials', title: 'Learning, made tangible', desc: `${credentials.length} professional and technical credentials.`, Icon: Certificate },
  { n: '05', label: 'Videos', to: '/testimonials', title: 'Introduction & testimonials', desc: 'Meet me and hear from clients through video.', Icon: VideoCamera },
  { n: '06', label: 'About', to: '/about', title: `Hi, I’m ${profile.firstName}.`, desc: 'Based in Alcantara, Romblon, Philippines.', img: profile.avatarSrc, profile: true },
  { n: '07', label: 'Contact', to: '/contact', title: 'Get in touch', desc: 'Talk about IT support, web applications, or UI/UX design.', Icon: EnvelopeSimple },
]

export function HomeExplore() {
  return (
    <>
      <div className="hsec"><h2 className="hsec__title">Explore</h2></div>
      <ul className="htiles" role="list">
        {TILES.map((tile) => {
          const TileIcon = tile.Icon ?? Stack
          return (
            <li key={tile.to}>
              <Link to={tile.to} className={`htile${tile.accent ? ' htile--accent' : ''}`}>
                {tile.profile ? (
                  <span className="htile__media"><ProfileImages className="htile__img" alt="" loading="lazy" /></span>
                ) : tile.img ? (
                  <span className="htile__media"><img className="htile__img" src={tile.img} alt="" loading="lazy" /></span>
                ) : (
                  <span className="htile__media htile__glyph"><TileIcon size={52} weight="duotone" aria-hidden="true" /></span>
                )}
                <span className="htile__body">
                  <span className="htile__n">{tile.n} {tile.label}</span>
                  <span className="htile__title">{tile.title}</span>
                  <span className="htile__desc">{tile.desc}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>

    </>
  )
}
