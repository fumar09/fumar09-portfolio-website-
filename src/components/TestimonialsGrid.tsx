import { clientVideoTestimonials, type PortfolioVideo } from '@/data/videoContent'
import PortfolioVideoPlayer from './PortfolioVideoPlayer'

function VideoCard({ video }: { video: PortfolioVideo }) {
  return (
    <article className="portfolio-panel video-story__card">
      <PortfolioVideoPlayer video={video} label="Client testimonial" />
      <div className="video-story__caption">
        <span className="portfolio-panel__eyebrow">Client video</span>
        <h3>{video.title}</h3>
        {video.detail && <p>{video.detail}</p>}
      </div>
    </article>
  )
}

export default function TestimonialsGrid() {
  return (
    <section className="pgrid portfolio-page" aria-labelledby="testimonials-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Client feedback</span>
        <h1 className="pgrid__title" id="testimonials-title">Video testimonials</h1>
        <p className="pgrid__lede">Hear directly from the people I’ve worked with.</p>
      </header>

      <section className="video-story__section" aria-labelledby="client-videos-title">
        <header className="video-story__section-head">
          <div>
            <span className="portfolio-panel__eyebrow">Client feedback</span>
            <h2 id="client-videos-title">Video testimonials</h2>
          </div>
          <p>Client videos will appear here as they become available.</p>
        </header>

        <div className="video-story__grid">
          {clientVideoTestimonials.length > 0 ? clientVideoTestimonials.map((video) => (
            <VideoCard key={video.src} video={video} />
          )) : (
            <article className="portfolio-panel video-story__card">
              <PortfolioVideoPlayer video={null} label="Client testimonial" />
              <div className="video-story__caption">
                <span className="portfolio-panel__eyebrow">Client video</span>
                <h3>Testimonial coming soon</h3>
                <p>This space is ready for a client’s video feedback.</p>
              </div>
            </article>
          )}
        </div>
      </section>
    </section>
  )
}
