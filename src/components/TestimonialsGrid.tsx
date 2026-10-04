import { VideoCamera } from '@/components/slab'
import { clientVideoTestimonials, introductionVideo, type PortfolioVideo } from '@/data/videoContent'

function VideoFrame({ video, label }: { video: PortfolioVideo | null; label: string }) {
  if (!video) {
    return (
      <div className="video-story__frame video-story__frame--empty" role="img" aria-label={`${label} video coming soon`}>
        <span className="video-story__placeholder-icon"><VideoCamera size={30} weight="duotone" aria-hidden="true" /></span>
        <span className="video-story__placeholder-title">{label}</span>
        <span className="video-story__placeholder-note">Video coming soon</span>
      </div>
    )
  }

  return (
    <div className="video-story__frame">
      <video controls playsInline preload="metadata" poster={video.poster} aria-label={video.title}>
        <source src={video.src} />
        Your browser does not support video playback.
      </video>
    </div>
  )
}

function VideoCard({ video }: { video: PortfolioVideo }) {
  return (
    <article className="portfolio-panel video-story__card">
      <VideoFrame video={video} label="Client testimonial" />
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
        <span className="pgrid__eyebrow">Video introduction & client feedback</span>
        <h1 className="pgrid__title" id="testimonials-title">Stories, in their own words.</h1>
        <p className="pgrid__lede">Meet me through a short introduction, then hear directly from the people I’ve worked with.</p>
      </header>

      <article className="portfolio-panel video-story__intro">
        <VideoFrame video={introductionVideo} label="Video introduction" />
        <div className="video-story__caption video-story__caption--intro">
          <span className="portfolio-panel__eyebrow">A little about me</span>
          <h2>Video introduction</h2>
          <p>A short introduction to who I am, what I do, and how I approach helpful technology.</p>
        </div>
      </article>

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
              <VideoFrame video={null} label="Client testimonial" />
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
