import { ArrowUpRight, EnvelopeSimple, MapPin, Phone } from '@/components/slab'
import { profile } from '@/data/profile'
import { resumeHref } from '@/data/portfolio'

const phoneHref = `tel:${profile.phone.replace(/\s/g, '')}`

export default function ContactGrid() {
  return (
    <section className="pgrid portfolio-page" aria-labelledby="contact-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Get in touch</span>
        <h1 className="pgrid__title" id="contact-title">Have something in mind?</h1>
        <p className="pgrid__lede">Based in {profile.location}. Contact me about IT support, web applications, or UI/UX design.</p>
      </header>

      <div className="portfolio-contact-layout">
        <section className="portfolio-panel portfolio-contact-card">
          <div className="portfolio-panel__eyebrow">Let’s make it make sense.</div>
          <h2>I’m open to IT support and web opportunities.</h2>
          <p>Reach out by email, phone, or social media. I’d be glad to hear what you’re working on.</p>
          <div className="portfolio-contact-details">
            <a href={`mailto:${profile.email}`}><EnvelopeSimple size={19} weight="duotone" aria-hidden="true" /><span>{profile.email}</span><ArrowUpRight size={15} weight="bold" aria-hidden="true" /></a>
            <a href={phoneHref}><Phone size={19} weight="duotone" aria-hidden="true" /><span>{profile.phone}</span><ArrowUpRight size={15} weight="bold" aria-hidden="true" /></a>
            <span><MapPin size={19} weight="duotone" aria-hidden="true" /><span>{profile.location}</span></span>
          </div>
        </section>

        <section className="portfolio-panel portfolio-contact-links" aria-labelledby="connect-title">
          <div className="portfolio-panel__eyebrow">Connect</div>
          <h2 id="connect-title">Find me online.</h2>
          <ul className="portfolio-social-list" role="list">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <img src={social.iconPath} alt="" width={22} height={22} />
                  <span>{social.label.replace(' profile', '')}</span>
                  <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <a className="portfolio-resume-link" href={resumeHref} target="_blank" rel="noopener noreferrer">
            <span><strong>Resume</strong><small>View or download my PDF resume</small></span>
            <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </section>
      </div>
    </section>
  )
}
