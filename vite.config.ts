import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { PAGE_METADATA } from './src/data/pageMetadata'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const deploymentUrl =
    env.VITE_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL
  let siteOrigin = ''

  if (deploymentUrl) {
    try {
      siteOrigin = new URL(
        deploymentUrl.startsWith('http') ? deploymentUrl : `https://${deploymentUrl}`,
      ).origin
    } catch {
      siteOrigin = ''
    }
  }

  return {
    plugins: [
      react(),
      {
        name: 'absolute-social-preview-urls',
        transformIndexHtml(html) {
          if (!siteOrigin) return html

          return html
            .replace('href="/" />', `href="${siteOrigin}/" />`)
            .replace('content="/" />', `content="${siteOrigin}/" />`)
            .replaceAll(
              'content="/images/og-portfolio.jpg"',
              `content="${siteOrigin}/images/og-portfolio.jpg"`,
            )
        },
        async closeBundle() {
          if (!siteOrigin) return

          const outputDirectory = path.resolve(process.cwd(), 'dist')
          const baseHtml = await readFile(path.join(outputDirectory, 'index.html'), 'utf8')
          const escapeHtml = (value: string) => value
            .replaceAll('&', '&amp;')
            .replaceAll('"', '&quot;')
            .replaceAll('<', '&lt;')
          const withContent = (html: string, pattern: RegExp, value: string) =>
            html.replace(pattern, (_match, before: string, after: string) => `${before}${escapeHtml(value)}${after}`)

          await Promise.all(Object.entries(PAGE_METADATA)
            .filter(([route]) => route !== '/')
            .map(async ([route, metadata]) => {
              const canonicalUrl = `${siteOrigin}${route}/`
              let routeHtml = withContent(baseHtml, /(<title>)[\s\S]*?(<\/title>)/, metadata.title)
              routeHtml = withContent(routeHtml, /(<meta name="description" content=")[^"]*(" \/>)/, metadata.description)
              routeHtml = withContent(routeHtml, /(<meta property="og:title" content=")[^"]*(" \/>)/, metadata.title)
              routeHtml = withContent(routeHtml, /(<meta property="og:description" content=")[^"]*(" \/>)/, metadata.description)
              routeHtml = withContent(routeHtml, /(<meta property="og:url" content=")[^"]*(" \/>)/, canonicalUrl)
              routeHtml = withContent(routeHtml, /(<meta name="twitter:title" content=")[^"]*(" \/>)/, metadata.title)
              routeHtml = withContent(routeHtml, /(<meta name="twitter:description" content=")[^"]*(" \/>)/, metadata.description)
              routeHtml = withContent(routeHtml, /(<link rel="canonical" href=")[^"]*(" \/>)/, canonicalUrl)

              const routeDirectory = path.join(outputDirectory, route.slice(1))
              await mkdir(routeDirectory, { recursive: true })
              await writeFile(path.join(routeDirectory, 'index.html'), routeHtml)
            }))
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,




      headers: {



        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
    },
    build: {
      target: 'es2022',
      sourcemap: false,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            three: ['three'],
          },
        },
      },
    },
  }
})
