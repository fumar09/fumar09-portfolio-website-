import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Gear, SealCheck } from '@/components/slab'
import ThemeGlyph from './ThemeGlyph'
import ProfileImages from './ProfileImages'
import {
  HomeIcon,
  FolderIcon,
  StackIcon,
  CupIcon,
  UserIcon,
  MessageIcon,
} from './RailIcons'
import { getTheme, toggleTheme, type Theme } from '@/lib/theme'
import { profile } from '@/data/profile'
import { A11Y_OPEN_EVENT } from './AccessMenu'












export const RAIL_LINKS = [
  { label: 'Home', to: '/', Icon: HomeIcon },
  { label: 'Projects', to: '/projects', Icon: FolderIcon },
  { label: 'Services', to: '/services', Icon: StackIcon },
  { label: 'Showcase', to: '/showcase', Icon: CupIcon },
  { label: 'About', to: '/about', Icon: UserIcon },
  { label: 'Contact', to: '/contact', Icon: MessageIcon },
] as const

export default function Rail() {
  const [theme, setThemeState] = useState<Theme>('light')



  useEffect(() => setThemeState(getTheme()), [])

  return (
    <aside className="rail" aria-label="Profile and site navigation">
      <div className="rail__inner">
        <span className="rail__avatar">
          <ProfileImages alt={profile.name} width={120} height={120} />
        </span>

        <h2 className="rail__name">
          {profile.name}
          <SealCheck size={19} weight="fill" aria-label={profile.verifiedLabel} />
        </h2>
        <p className="rail__handle">
          {profile.handle}
        </p>

        <div className="rail__actions">
          <ul className="rail__socials" role="list" aria-label="Social profiles">
          {profile.socials.map(({ label, href, iconPath }) => (
            <li key={label}>
              <a
                className="rail__social"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <span
                  className="rail__social-icon"
                  style={{ ['--icon-url' as string]: `url('${iconPath}')` }}
                  aria-hidden="true"
                />
              </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="rail__theme"
            onClick={(e) => setThemeState(toggleTheme(e.currentTarget))}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <ThemeGlyph theme={theme} size={21} />
          </button>
        </div>

        <nav className="rail__nav" aria-label="Sections">
          <ul>
            {RAIL_LINKS.map(({ label, to, Icon }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} className="rail__link">
                  <Icon size={21} />
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="rail__link rail__link--button"
                onClick={(event) => window.dispatchEvent(new CustomEvent(A11Y_OPEN_EVENT, { detail: event.currentTarget }))}
                aria-haspopup="dialog"
              >
                <Gear size={21} aria-hidden="true" />
                Settings
              </button>
            </li>
          </ul>
        </nav>

        <p className="rail__copy">
          &copy; {new Date().getFullYear()}
          <br />
          {profile.name}. All rights reserved.
        </p>
      </div>
    </aside>
  )
}
