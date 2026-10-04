import { clientVideoTestimonials, type PortfolioVideo } from '@/data/videoContent'
import { VideoCamera } from '@/components/slab'
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
        <h1 className="pgrid__title" id="testimonials-title">Testimonials</h1>
        <p className="pgrid__lede">Video testimonials from clients will be shared here.</p>
      </header>

      {clientVideoTestimonials.length > 0 ? (
        <div className="video-story__grid">
          {clientVideoTestimonials.map((video) => <VideoCard key={video.src} video={video} />)}
        </div>
      ) : (
        <div className="testimonials-coming">
          <div className="testimonials-coming__screen" aria-hidden="true">
            <VideoCamera size={48} weight="duotone" />
            <span>Client videos</span>
          </div>
          <article className="portfolio-panel testimonials-coming__message">
            <span className="portfolio-panel__eyebrow">More to come</span>
            <h2>What clients say</h2>
            <p>Client video testimonials will be added here as they become available.</p>
          </article>
        </div>
      )}
    </section>
  )
}
