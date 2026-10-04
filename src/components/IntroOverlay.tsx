import { useEffect, useRef, useState } from 'react'
import { profile } from '@/data/profile'




























const WORDS = `${profile.displayName.line1} ${profile.displayName.line2}`.split(' ')

const IGNITE_MS = 300
const RUN_MS = 1600
const LOCK_MS = 350
const FLY_MS = 900


const NODE = 40
const CANVAS_H = 96
const NODE_Y = 34

const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EASE_SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'
const EASE_CAMERA = 'cubic-bezier(0.76, 0, 0.24, 1)'

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2


const STEPS = [
  { label: 'Lead comes in', trigger: true, d: 'M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11' },
  { label: 'Tag & route', trigger: false, d: 'M4 4m0 2a2 2 0 0 1 2 -2h4.5a2 2 0 0 1 1.4 .6l7 7a2 2 0 0 1 0 2.8l-4.5 4.5a2 2 0 0 1 -2.8 0l-7 -7a2 2 0 0 1 -.6 -1.4v-4.5M8 8h.01' },
  { label: 'Follow up', trigger: false, d: 'M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10M3 7l9 6l9 -6' },
  { label: 'Call booked', trigger: false, d: 'M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12M16 3v4M8 3v4M4 11h16M9 16l2 2l4 -4' },
] as const

const shouldRun =
  typeof window !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
  window.location.pathname === '/'




if (shouldRun) document.documentElement.classList.add('is-intro', 'is-intro-head')

const release = () => document.documentElement.classList.remove('is-intro')
const releaseHead = () => document.documentElement.classList.remove('is-intro-head')

export default function IntroOverlay() {
  const [gone, setGone] = useState(!shouldRun)
  const titleRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const dotRef = useRef<HTMLElement>(null)
  const dotCoreRef = useRef<HTMLElement>(null)
  const statusRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!shouldRun) {
      release()
      releaseHead()
      return
    }



    document.documentElement.classList.add('is-intro', 'is-intro-head')

    const title = titleRef.current
    const canvas = canvasRef.current
    const svg = svgRef.current
    const dot = dotRef.current
    const dotCore = dotCoreRef.current
    const status = statusRef.current
    if (!title || !canvas || !svg || !dot || !dotCore || !status) {
      release()
      releaseHead()
      setGone(true)
      return
    }

    let cancelled = false
    let raf = 0
    const timers: number[] = []
    const anims: Animation[] = []
    const wait = (ms: number) =>
      new Promise<void>((res) => timers.push(window.setTimeout(res, ms)))
    const play = (el: Element, frames: Keyframe[], opts: KeyframeAnimationOptions) => {
      const a = el.animate(frames, { fill: 'both', ...opts })
      anims.push(a)
      return a
    }

    const run = async () => {
      if (document.fonts?.ready) await document.fonts.ready
      if (cancelled) return


      const k = window.innerWidth < 1100 ? 0.62 : 1
      const IGNITE = IGNITE_MS * k, RUN = RUN_MS * k, LOCK = LOCK_MS * k, FLY = FLY_MS * k

      const target = document.querySelector<HTMLElement>('.home__title')
      const targetRect = target?.getBoundingClientRect()
      const wordEls = Array.from(title.querySelectorAll<HTMLElement>('.boot__word'))
      title.style.flexWrap = 'nowrap'
      title.style.width = 'max-content'
      const probe = document.createElement('span')
      probe.className = 'boot__word'
      probe.textContent = ' '
      title.append(probe)
      const space = probe.offsetWidth
      probe.remove()

      const inked = wordEls.reduce((sum, el) => sum + el.offsetWidth, 0)
      const phraseWidth = inked + (wordEls.length - 1) * space
      const targetLineWidth = target?.querySelector<HTMLElement>('.home__line')?.getBoundingClientRect().width
      const width = Math.max(phraseWidth, targetLineWidth ?? 0)
      title.style.width = `${width}px`
      title.style.columnGap = `${Math.max(space, (width - inked) / (wordEls.length - 1))}px`
      canvas.style.width = `${width}px`
      canvas.style.height = `${CANVAS_H}px`

      const height = title.offsetHeight
      const scale = Math.min((window.innerWidth * 0.86) / width, 2.6)
      const w = width * scale
      const h = height * scale
      const sx = (window.innerWidth - w) / 2
      const compositionHeight = h + (44 + CANVAS_H) * scale
      const sy = (window.innerHeight - compositionHeight) / 2

      const restTransform = `translate(${sx}px, ${sy}px) scale(${scale})`
      const canvasTransform = `translate(${sx}px, ${sy + h + 44 * scale}px) scale(${scale})`
      title.style.transform = restTransform
      canvas.style.transform = canvasTransform
      title.style.opacity = '1'
      canvas.style.opacity = '1'



      const nodeEls = Array.from(canvas.querySelectorAll<HTMLElement>('.boot__n'))
      const n = nodeEls.length
      const xs = nodeEls.map((_, k) => NODE / 2 + (k * (width - NODE)) / (n - 1))
      nodeEls.forEach((el, k) => {
        el.style.left = `${xs[k] - NODE / 2}px`
        el.style.top = `${NODE_Y - NODE / 2}px`
      })



      svg.setAttribute('viewBox', `0 0 ${width} ${CANVAS_H}`)
      svg.setAttribute('width', String(width))
      svg.setAttribute('height', String(CANVAS_H))
      const NS = 'http://www.w3.org/2000/svg'
      svg.replaceChildren()
      const cables: { live: SVGPathElement; len: number; from: number; to: number }[] = []
      for (let k = 0; k < n - 1; k++) {
        const x1 = xs[k] + NODE / 2
        const x2 = xs[k + 1] - NODE / 2
        const cx = (x2 - x1) * 0.5
        const d = `M ${x1} ${NODE_Y} C ${x1 + cx} ${NODE_Y}, ${x2 - cx} ${NODE_Y}, ${x2} ${NODE_Y}`
        const base = document.createElementNS(NS, 'path')
        base.setAttribute('d', d)
        base.setAttribute('class', 'boot__cable')
        const live = document.createElementNS(NS, 'path')
        live.setAttribute('d', d)
        live.setAttribute('class', 'boot__cable boot__cable--live')
        svg.append(base, live)
        const len = live.getTotalLength()
        live.style.strokeDasharray = `${len}`
        live.style.strokeDashoffset = `${len}`
        cables.push({ live, len, from: x1, to: x2 })

        play(base, [{ opacity: 0 }, { opacity: 1 }], {
          duration: 420,
          delay: 90 + k * 70,
          easing: EASE_OUT,
        })
      }






      const gates = wordEls.map((el, k) => ({
        inner: el.querySelector<HTMLElement>('.boot__word-in'),
        at: k / wordEls.length,
        done: false,
      }))


      nodeEls.forEach((el, k) => {
        play(
          el,
          [
            { opacity: 0, transform: 'translateY(8px) scale(0.86)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' },
          ],
          { duration: 520, delay: k * 70, easing: EASE_SPRING },
        )
      })
      play(
        dotCore,
        [
          { opacity: 0, transform: 'scale(0.2)' },
          { opacity: 1, transform: 'scale(1)' },
        ],
        { duration: 320, delay: 200, easing: EASE_SPRING },
      )
      play(status, [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], {
        duration: 420,
        delay: 160,
        easing: EASE_OUT,
      })
      await wait(IGNITE)
      if (cancelled) return


      const x0 = xs[0]
      const x1 = xs[n - 1]
      const nodeAt = xs.map((x) => (x - x0) / (x1 - x0))
      const nodeDone = nodeEls.map(() => false)
      const succeed = (k: number) => {
        nodeDone[k] = true
        const el = nodeEls[k]
        el.classList.add('is-done')
        const badge = el.querySelector<HTMLElement>('.boot__n-check')
        if (badge) {
          play(
            badge,
            [
              { opacity: 0, transform: 'scale(0.3)' },
              { opacity: 1, transform: 'scale(1)' },
            ],
            { duration: 460, easing: EASE_SPRING },
          )
        }
        const card = el.querySelector<HTMLElement>('.boot__n-card')
        if (card) {
          play(card, [{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }], {
            duration: 420,
            easing: EASE_OUT,
          })
        }
      }
      succeed(0)

      await new Promise<void>((res) => {
        const start = performance.now()
        const step = (now: number) => {
          if (cancelled) return res()
          const raw = Math.min(1, (now - start) / RUN)
          const p = easeInOut(raw)
          const x = x0 + p * (x1 - x0)

          dot.style.transform = `translate3d(${x}px, ${NODE_Y}px, 0)`

          for (const c of cables) {
            const f = Math.min(1, Math.max(0, (x - c.from) / (c.to - c.from)))
            c.live.style.strokeDashoffset = `${c.len * (1 - f)}`
          }
          for (let k = 1; k < n - 1; k++) {
            if (!nodeDone[k] && p >= nodeAt[k]) succeed(k)
          }
          for (const g of gates) {
            if (!g.done && p >= g.at && g.inner) {
              g.done = true
              play(
                g.inner,
                [{ transform: 'translateY(132%)' }, { transform: 'translateY(0)' }],
                { duration: 760, easing: EASE_OUT },
              )
            }
          }

          if (raw < 1) raf = requestAnimationFrame(step)
          else res()
        }
        raf = requestAnimationFrame(step)
      })
      if (cancelled) return


      play(dotCore, [{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: 'linear' })
      succeed(n - 1)
      status.classList.add('is-done')
      const label = status.querySelector<HTMLElement>('.boot__status-text')
      if (label) label.textContent = 'Workflow executed successfully'
      await wait(LOCK)
      if (cancelled) return


      play(
        canvas,
        [
          { transform: canvasTransform, opacity: 1 },
          { transform: `translate(${sx}px, ${sy + h + 72 * scale}px) scale(${scale})`, opacity: 0 },
        ],
        { duration: 420, easing: EASE_OUT },
      )
      if (targetRect) {
        play(
          title,
          [
            { transform: restTransform },
            { transform: `translate(${targetRect.left}px, ${targetRect.top}px) scale(1)` },
          ],
          { duration: FLY, easing: EASE_CAMERA },
        )

        const accentInner = title.querySelector<HTMLElement>('.boot__word-in--accent')
        const homeAccent = target?.querySelector<HTMLElement>('.home__line--accent')
        const homeLine = target?.querySelector<HTMLElement>('.home__line')
        const lineText = Array.from(homeLine?.childNodes ?? []).find(
          (node): node is Text =>
            node.nodeType === Node.TEXT_NODE &&
            Boolean(node.textContent?.includes(profile.displayName.line1)),
        )

        if (homeLine && lineText && homeAccent) {
          const titleRect = title.getBoundingClientRect()
          const accentRect = homeAccent.getBoundingClientRect()
          let textOffset = Math.max(0, lineText.textContent?.indexOf(WORDS[0]) ?? 0)

          wordEls.forEach((wordEl, index) => {
            const wordInner = wordEl.querySelector<HTMLElement>('.boot__word-in')
            const isAccent = index === wordEls.length - 1
            if (!wordInner) return

            let destinationRect: DOMRect
            if (isAccent) {
              destinationRect = accentRect
            } else {
              const range = document.createRange()
              range.setStart(lineText, textOffset)
              range.setEnd(lineText, textOffset + WORDS[index].length)
              destinationRect = range.getBoundingClientRect()
              textOffset += WORDS[index].length + 1
            }

            const sourceRect = wordInner.getBoundingClientRect()
            const deltaX =
              destinationRect.left -
              targetRect.left -
              (sourceRect.left - titleRect.left) / scale
            const deltaY =
              destinationRect.top -
              targetRect.top -
              (sourceRect.top - titleRect.top) / scale
            const frames: Keyframe[] = isAccent
              ? [
                  { transform: 'translate(0px, 0px)', offset: 0 },
                  { transform: `translate(${deltaX}px, 0px)`, offset: 0.66 },
                  { transform: `translate(${deltaX}px, ${deltaY}px)`, offset: 1 },
                ]
              : [
                  { transform: 'translate(0px, 0px)', offset: 0 },
                  { transform: `translate(${deltaX}px, ${deltaY}px)`, offset: 1 },
                ]

            play(wordEl, frames, { duration: FLY, easing: EASE_CAMERA })
          })

          if (accentInner) {
            play(
              accentInner,
              [
                { color: getComputedStyle(accentInner).color },
                { color: getComputedStyle(homeAccent).color },
              ],
              { duration: FLY, easing: EASE_OUT },
            )
          }
        }
      } else {
        play(title, [{ opacity: 1 }, { opacity: 0 }], { duration: 420, easing: EASE_OUT })
      }

      await wait(FLY)
      if (cancelled) return
      release()
      releaseHead()
      setGone(true)
    }

    void run()

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      anims.forEach((a) => a.cancel())
      release()
      releaseHead()
    }
  }, [])

  if (gone) return null

  return (
    <div className="boot" aria-hidden="true" role="presentation">
      <div className="boot__title" ref={titleRef}>
        {WORDS.map((word, i) => (
          <span className="boot__word" key={`${word}-${i}`}>
            <span
              className={`boot__word-in${i === WORDS.length - 1 ? ' boot__word-in--accent' : ''}`}
            >
              {word}
            </span>
          </span>
        ))}
      </div>

      <div className="boot__canvas" ref={canvasRef}>
        <svg className="boot__cables" ref={svgRef} />

        {STEPS.map((s) => (
          <span key={s.label} className={`boot__n${s.trigger ? ' boot__n--trigger' : ''}`}>
            <span className="boot__n-card">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={s.d} />
              </svg>
              <span className="boot__n-check">
                <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5l9 -10" />
                </svg>
              </span>
              <i className="boot__n-port boot__n-port--in" />
              <i className="boot__n-port boot__n-port--out" />
            </span>
            <span className="boot__n-label">{s.label}</span>
          </span>
        ))}

        <i className="boot__dot" ref={dotRef}>
          <i className="boot__dot-core" ref={dotCoreRef} />
        </i>

        <span className="boot__status" ref={statusRef}>
          <i className="boot__status-dot" />
          <span className="boot__status-text">Executing workflow</span>
        </span>
      </div>
    </div>
  )
}
