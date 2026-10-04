import { VideoCamera } from '@/components/slab'
import type { PortfolioVideo } from '@/data/videoContent'

export default function PortfolioVideoPlayer({ video, label }: { video: PortfolioVideo | null; label: string }) {
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
