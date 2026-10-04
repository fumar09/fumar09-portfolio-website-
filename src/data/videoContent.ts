export type PortfolioVideo = {
  src: string
  title: string
  detail?: string
  poster?: string
}

// Add video files under public/videos, then set src to a path such as
// "/videos/introduction.mp4". The empty state remains until a video is configured.
export const introductionVideo: PortfolioVideo | null = null

// Add one entry for each client video when you receive it. Example:
// { src: '/videos/client-testimonial-01.mp4', title: 'Client testimonial', detail: 'Client name or role' }
export const clientVideoTestimonials: PortfolioVideo[] = []
