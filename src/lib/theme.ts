












export type Theme = 'light' | 'dark'

import { motionReduced } from './a11y'

const KEY = 'theme'

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme


  const page = getComputedStyle(root).getPropertyValue('--cream').trim()
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', page)
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* private mode: the theme just does not persist */
  }
  window.dispatchEvent(new CustomEvent<Theme>('themechange', { detail: theme }))
}

export type SweepOrigin = { x: number; y: number }

type WithViewTransition = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> }
}











export function setTheme(theme: Theme, origin?: SweepOrigin) {
  const doc = document as WithViewTransition
  const root = document.documentElement
  const reduce =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches || motionReduced()
  if (!doc.startViewTransition || reduce || getTheme() === theme) {
    applyTheme(theme)
    return
  }
  const x = Math.max(0, Math.min(window.innerWidth, origin?.x ?? window.innerWidth / 2))
  const y = Math.max(0, Math.min(window.innerHeight, origin?.y ?? window.innerHeight / 2))
  const width = window.innerWidth
  const height = window.innerHeight
  const waveCount = 8
  const waveSegments = waveCount * 4
  const waveAmplitude = Math.min(Math.max(Math.min(width, height) * 0.09, 28), 96)
  const value = (number: number) => Number(number.toFixed(2))
  type Point = { x: number; y: number }
  type Curve = { start: Point; control1: Point; control2: Point; end: Point }
  const segment = (start: Point, control1: Point, control2: Point, end: Point): Curve =>
    ({ start, control1, control2, end })
  const point = ({ x: px, y: py }: Point) => `${value(px)} ${value(py)}`
  const pathValue = (curves: Curve[]) =>
    `path("M ${point(curves[0].start)} ${curves.map(({ control1, control2, end }) =>
      `C ${point(control1)}, ${point(control2)}, ${point(end)}`).join(' ')} Z")`

  const source = { x, y }
  const corners = [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ]
  const farthestIndex = corners.reduce((best, corner, index) => {
    const bestDistance = Math.hypot(corners[best].x - x, corners[best].y - y)
    const distance = Math.hypot(corner.x - x, corner.y - y)
    return distance > bestDistance ? index : best
  }, 0)
  const farthest = corners[farthestIndex]
  const maxRadius = Math.hypot(farthest.x - x, farthest.y - y)
  const startAngle = Math.atan2(farthest.y - y, farthest.x - x)
  const wavePoint = (angle: number, baseRadius: number): Point => {
    const phase = angle - startAngle
    const radius = baseRadius + waveAmplitude * Math.sin(waveCount * phase)
    return { x: x + radius * Math.cos(angle), y: y + radius * Math.sin(angle) }
  }
  const waveTangent = (angle: number, baseRadius: number): Point => {
    const phase = angle - startAngle
    const radius = baseRadius + waveAmplitude * Math.sin(waveCount * phase)
    const radialSlope = waveAmplitude * waveCount * Math.cos(waveCount * phase)
    return {
      x: radialSlope * Math.cos(angle) - radius * Math.sin(angle),
      y: radialSlope * Math.sin(angle) + radius * Math.cos(angle),
    }
  }
  const radialWave = (baseRadius: number): Curve[] =>
    Array.from({ length: waveSegments }, (_, index) => {
      const step = (Math.PI * 2) / waveSegments
      const angle = startAngle + step * index
      const nextAngle = angle + step
      const start = wavePoint(angle, baseRadius)
      const end = wavePoint(nextAngle, baseRadius)
      const startTangent = waveTangent(angle, baseRadius)
      const endTangent = waveTangent(nextAngle, baseRadius)
      return segment(
        start,
        { x: start.x + startTangent.x * step / 3, y: start.y + startTangent.y * step / 3 },
        { x: end.x - endTangent.x * step / 3, y: end.y - endTangent.y * step / 3 },
        end,
      )
    })
  const collapsed = Array.from({ length: waveSegments }, () => segment(source, source, source, source))
  const middle = radialWave(maxRadius * 0.76)
  const full = radialWave(maxRadius + waveAmplitude + 32)
  root.style.setProperty('--theme-wave-from', pathValue(collapsed))
  root.style.setProperty('--theme-wave-middle', pathValue(middle))
  root.style.setProperty('--theme-wave-full', pathValue(full))
  root.dataset.themeSweep = 'on'
  doc
    .startViewTransition(() => applyTheme(theme))
    .finished.finally(() => {
      delete root.dataset.themeSweep
      root.style.removeProperty('--theme-wave-from')
      root.style.removeProperty('--theme-wave-middle')
      root.style.removeProperty('--theme-wave-full')
    })
}


export function toggleTheme(from?: Element | null): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
  const r = from?.getBoundingClientRect()
  setTheme(next, r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : undefined)
  return next
}
