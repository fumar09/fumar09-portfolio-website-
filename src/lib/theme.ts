












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
  const waveAmplitude = Math.min(Math.max(height * 0.12, 56), 150)
  const bandHalfWidth = Math.min(Math.max(height * 0.045, 22), 48)
  const waveCycles = 2
  const waveSegments = waveCycles * 4
  const value = (number: number) => Number(number.toFixed(2))
  type Point = { x: number; y: number }
  type Curve = { start: Point; control1: Point; control2: Point; end: Point }
  const segment = (start: Point, control1: Point, control2: Point, end: Point): Curve =>
    ({ start, control1, control2, end })
  const line = (start: Point, end: Point, count: number): Curve[] =>
    Array.from({ length: count }, (_, i) => {
      const a = i / count
      const b = (i + 1) / count
      const at = (t: number): Point => ({
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t,
      })
      const from = at(a)
      const to = at(b)
      const dx = (to.x - from.x) / 3
      const dy = (to.y - from.y) / 3
      return segment(from, { x: from.x + dx, y: from.y + dy }, { x: from.x + 2 * dx, y: from.y + 2 * dy }, to)
    })
  const wave = (edgeX: number, side: -1 | 1): Curve[] =>
    Array.from({ length: waveSegments }, (_, i) => {
      const t0 = i / waveSegments
      const t1 = (i + 1) / waveSegments
      const dt = t1 - t0
      const at = (t: number): Point => ({
        x: x + (edgeX - x) * t,
        y: y + waveAmplitude * Math.sin(Math.PI * 2 * waveCycles * t) + side * bandHalfWidth * t,
      })
      const slope = (t: number) =>
        waveAmplitude * Math.PI * 2 * waveCycles * Math.cos(Math.PI * 2 * waveCycles * t) + side * bandHalfWidth
      const start = at(t0)
      const end = at(t1)
      const dx = (end.x - start.x) / 3
      return segment(
        start,
        { x: start.x + dx, y: start.y + slope(t0) * dt / 3 },
        { x: end.x - dx, y: end.y - slope(t1) * dt / 3 },
        end,
      )
    })
  const reverse = (curves: Curve[]): Curve[] =>
    [...curves].reverse().map(({ start, control1, control2, end }) =>
      segment(end, control2, control1, start))
  const point = ({ x: px, y: py }: Point) => `${value(px)} ${value(py)}`
  const pathValue = (curves: Curve[]) =>
    `path("M ${point({ x, y })} ${curves.map(({ control1, control2, end }) =>
      `C ${point(control1)}, ${point(control2)}, ${point(end)}`).join(' ')} Z")`

  const source = { x, y }
  const collapsed = Array.from({ length: waveSegments * 4 + 2 }, () => segment(source, source, source, source))
  const rightUpper = wave(width, -1)
  const rightLower = wave(width, 1)
  const leftLower = wave(0, 1)
  const leftUpper = wave(0, -1)
  const middle = [
    ...rightUpper,
    ...line(rightUpper[rightUpper.length - 1].end, rightLower[rightLower.length - 1].end, 1),
    ...reverse(rightLower),
    ...leftLower,
    ...line(leftLower[leftLower.length - 1].end, leftUpper[leftUpper.length - 1].end, 1),
    ...reverse(leftUpper),
  ]
  const topLeft = { x: 0, y: 0 }
  const topRight = { x: width, y: 0 }
  const bottomRight = { x: width, y: height }
  const bottomLeft = { x: 0, y: height }
  const full = [
    ...line(source, topLeft, waveSegments),
    ...line(topLeft, topRight, 1),
    ...line(topRight, bottomRight, waveSegments),
    ...line(bottomRight, bottomLeft, waveSegments),
    ...line(bottomLeft, topLeft, 1),
    ...line(topLeft, source, waveSegments),
  ]
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
