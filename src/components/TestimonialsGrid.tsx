import { Quotes } from '@/components/slab'

export default function TestimonialsGrid() {
  return (
    <section className="pgrid portfolio-page" aria-labelledby="testimonials-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Client feedback</span>
        <h1 className="pgrid__title" id="testimonials-title">Testimonials</h1>
        <p className="pgrid__lede">Feedback from people I’ve worked with will be shared here.</p>
      </header>

      <div className="testimonials-coming">
        <div className="testimonials-coming__screen" aria-hidden="true">
          <Quotes size={48} weight="duotone" />
          <span>Client feedback</span>
        </div>
        <article className="portfolio-panel testimonials-coming__message">
          <span className="portfolio-panel__eyebrow">Coming soon</span>
          <h2>What clients say</h2>
          <p>This space is ready for a client testimonial. I’ll add their feedback once it’s available.</p>
        </article>
      </div>
    </section>
  )
}
