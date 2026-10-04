import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Briefcase,
  Certificate,
  FolderOpen,
  Quotes,
  SealCheck,
  Stack,
  User,
  Wrench,
  type Icon,
} from '@/components/slab'
import { credentials, portfolioProjects } from '@/data/portfolio'
import ProfileImages from './ProfileImages'

const PHOTOS = [0, 1, 2]

const STRENGTHS = [
  { Icon: Stack, title: 'UI/UX and visual design', note: 'Figma and user-centered layouts' },
  { Icon: Briefcase, title: 'Web application development', note: 'HTML, CSS, and JavaScript' },
  { Icon: Wrench, title: 'Technical support', note: 'Practical troubleshooting' },
  { Icon: SealCheck, title: 'Customer service', note: 'Clear, helpful communication' },
  { Icon: User, title: 'Team leadership', note: 'Coordination and training' },
]

const SKILL_ROWS = [STRENGTHS.slice(0, 3), STRENGTHS.slice(3)]

function CardHead({ Icon, title, desc }: { Icon: Icon; title: string; desc: string }) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon"><Icon size={20} weight="fill" aria-hidden="true" /></span>
        <h3 className="bento__title">{title}</h3>
      </span>
      <p className="bento__desc">{desc}</p>
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  const projectShots = portfolioProjects.map((project) => project.image)

  return (
    <nav className="bento" aria-label="Explore Connie’s portfolio">
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead Icon={FolderOpen} title="Projects" desc="Selected work in community services, records, music, and career tools." />
        <div className="bento__media bento__reel" aria-hidden="true">
          <div className="bento__reel-track">
            {[...projectShots, ...projectShots].map((src, index) => (
              <span key={`${src}-${index}`} className="bento__shot">
                <img src={src} alt="" loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        </div>
        <span className="bento__reel-pagination" aria-hidden="true">
          {projectShots.map((_, index) => <span key={index} className="bento__reel-page" />)}
          <span className="bento__reel-current" />
        </span>
      </Link>

      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" desc="IT support, user-centered design, and people-first service." />
        <div className="bento__media bento__fan" aria-hidden="true">
          {PHOTOS.map((index) => (
            <span key={index} className="bento__photo" style={{ ['--i' as string]: index } as CSSProperties}>
              <ProfileImages alt="" loading="lazy" />
            </span>
          ))}
        </div>
      </Link>

      <Link to="/services" className="bento__card bento__card--ai">
        <CardHead Icon={Wrench} title="Skills I have" desc="User-centered design, web development, IT support, and people-first service." />
        <div className="bento__media bento__chips" aria-hidden="true">
          {SKILL_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="bento__chip-row" data-dir={rowIndex ? 'right' : 'left'}>
              <div className="bento__chip-track">
                {[...row, ...row].map(({ title, Icon }, index) => (
                  <span key={`${title}-${index}`} className="bento__chip">
                    <Icon size={15} weight="duotone" aria-hidden="true" />
                    {title}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Link>

      <Link to="/credentials" className="bento__card bento__card--creds">
        <CardHead Icon={Certificate} title="Credentials" desc="Professional learning and technical certifications." />
        <div className="bento__media bento__badge" aria-hidden="true">
          <span className="bento__badge-ring">
            <img src={credentials[0].image} alt="" width={72} height={72} />
          </span>
          <span className="bento__badge-tag">
            <SealCheck size={14} weight="fill" aria-hidden="true" />
            {credentials.length} credentials
          </span>
        </div>
      </Link>

      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="Services" desc="IT support, web UI, and UX design for people and community-focused organizations." />
        <ul className="bento__media bento__offers" role="list">
          {STRENGTHS.map(({ Icon, title, note }, index) => (
            <li key={title} className="bento__offer" style={{ ['--i' as string]: index } as CSSProperties}>
              <span className="bento__offer-tile"><Icon size={15} weight="duotone" aria-hidden="true" /></span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{title}</span>
                <span className="bento__offer-note">{note}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">0{index + 1}</span>
            </li>
          ))}
        </ul>
      </Link>

      <Link to="/testimonials" className="bento__card bento__card--quotes">
        <CardHead Icon={Quotes} title="Testimonials" desc="A space for feedback from people I’ve worked with." />
        <div className="bento__media bento__reviews" data-soon="true" aria-hidden="true">
          <div className="bento__reviews-track">
            <span className="bento__review bento__review--soon">
              <span className="bento__review-top"><Quotes size={18} weight="duotone" /><b>Client feedback</b></span>
              <span className="bento__review-role">A testimonial will appear here when it’s ready.</span>
              <span className="bento__review-work">In preparation</span>
            </span>
          </div>
        </div>
      </Link>
    </nav>
  )
}
