import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from '@/components/Home'
import NotFound from '@/components/NotFound'
import { restorePerfTier } from '@/lib/perf'
import { restorePrefs } from '@/lib/a11y'

const ProjectsView = lazy(() => import('@/views/ProjectsView'))
const ServicesView = lazy(() => import('@/views/ServicesView'))
const ShowcaseView = lazy(() => import('@/views/ShowcaseView'))
const CredentialsGrid = lazy(() => import('@/components/CredentialsGrid'))
const TestimonialsGrid = lazy(() => import('@/components/TestimonialsGrid'))
const AboutGrid = lazy(() => import('@/components/AboutGrid'))
const ContactGrid = lazy(() => import('@/components/ContactGrid'))
import './styles/tokens.css'
import './styles/global.css'
import './styles/theme-glyph.css'
import './styles/sections.css'
import './styles/extensions.css'
import './styles/ai-stack.css'
import './styles/shell.css'
import './styles/rail.css'
import './styles/home.css'
import './styles/bento.css'
import './styles/projects-grid.css'
import './styles/services-grid.css'
import './styles/showcase.css'
import './styles/about-grid.css'
import './styles/contact-grid.css'
import './styles/boot.css'
import './styles/credentials.css'
import './styles/mobile-app.css'
import './styles/profile-images.css'
import './styles/a11y.css'
import './styles/apple.css'
import './styles/mobile-pass.css'
import './styles/perf.css'
import './styles/portfolio.css'
import './styles/typography.css'



restorePerfTier()
restorePrefs()

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root not found')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsView />} />
          <Route path="/services" element={<ServicesView />} />
          <Route path="/showcase" element={<ShowcaseView />} />
          <Route path="/credentials" element={<CredentialsGrid />} />
          <Route path="/testimonials" element={<TestimonialsGrid />} />
          <Route path="/about" element={<AboutGrid />} />
          <Route path="/contact" element={<ContactGrid />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
