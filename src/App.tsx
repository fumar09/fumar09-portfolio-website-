import { lazy, Suspense, useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Outlet, useLocation } from 'react-router-dom'
import TabBar from '@/components/TabBar'
import QuickMenu from '@/components/QuickMenu'
import Rail from '@/components/Rail'
import IntroOverlay from '@/components/IntroOverlay'
import CursorRing from '@/components/CursorRing'
import AccessMenu from '@/components/AccessMenu'
import { motionReduced } from '@/lib/a11y'
import { useLenis, SCROLLER_ID } from '@/hooks/useLenis'
import { useIsPhone } from '@/hooks/useMediaQuery'
import { getPerfTier, watchFrameHealth, PERF_TIER_EVENT } from '@/lib/perf'
import { PAGE_METADATA } from '@/data/pageMetadata'






const HeroCanvas = lazy(() => import('@/components/HeroCanvasV2'))

export default function App() {
  useLenis()

  const { pathname } = useLocation()




  const phone = useIsPhone()
  const panelRef = useRef<HTMLElement>(null)



  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  useEffect(() => {
    const pagePath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
    const page = PAGE_METADATA[pagePath] ?? PAGE_METADATA['/']
    const origin = window.location.origin
    const canonicalPath = pagePath === '/' ? '/' : `${pagePath}/`
    const canonicalUrl = new URL(canonicalPath, origin).href
    const socialImageUrl = new URL('/images/og-portfolio.jpg', origin).href

    document.title = page.title
    const setMeta = (selector: string, content: string) => {
      const element = document.querySelector<HTMLMetaElement>(selector)
      if (element) element.content = content
    }

    setMeta('meta[name="description"]', page.description)
    setMeta('meta[property="og:title"]', page.title)
    setMeta('meta[property="og:description"]', page.description)
    setMeta('meta[property="og:url"]', canonicalUrl)
    setMeta('meta[property="og:image"]', socialImageUrl)
    setMeta('meta[name="twitter:title"]', page.title)
    setMeta('meta[name="twitter:description"]', page.description)
    setMeta('meta[name="twitter:image"]', socialImageUrl)

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) canonical.href = canonicalUrl
  }, [pathname])





  const firstPath = useRef(pathname)
  useLayoutEffect(() => {
    if (pathname !== firstPath.current) document.documentElement.classList.add('has-navigated')
  }, [pathname])




  const [perfTier, setPerfTier] = useState(getPerfTier)
  useEffect(() => {
    const onTier = (e: Event) => setPerfTier((e as CustomEvent).detail)
    window.addEventListener(PERF_TIER_EVENT, onTier)
    void watchFrameHealth()
    return () => window.removeEventListener(PERF_TIER_EVENT, onTier)
  }, [])

  const [shouldLoadCanvas, setShouldLoadCanvas] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches || motionReduced()
    const isMobile = window.matchMedia('(pointer: coarse) and (hover: none)').matches
    if (reduced || isMobile) return



    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
    }


    const start = () => {
      if (w.requestIdleCallback) {
        w.requestIdleCallback(() => setShouldLoadCanvas(true), { timeout: 3000 })
      } else {
        window.setTimeout(() => setShouldLoadCanvas(true), 1500)
      }
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
  }, [])

  return (
    <>
      <IntroOverlay />
      <CursorRing />
      <a href={`#${SCROLLER_ID}`} className="skip-link">Skip to main content</a>
      {shouldLoadCanvas && perfTier !== 'low' && (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      )}
      {phone && pathname !== '/' && <QuickMenu className="qmenu--float" />}
      <div className="shell">
        <Rail />
        <main
          ref={panelRef}
          id={SCROLLER_ID}
          className="shell__panel"
        >
          <div className="shell__content">
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
      {phone && <TabBar />}
      <AccessMenu />
      <Analytics />
    </>
  )
}
