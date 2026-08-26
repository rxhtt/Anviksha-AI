import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Hero from './sections/Hero.jsx'
import Hook from './sections/Hook.jsx'
import Problem from './sections/Problem.jsx'
import Journey from './sections/Journey.jsx'
import Trajectory from './sections/Trajectory.jsx'
import Pillars from './sections/Pillars.jsx'
import Comparison from './sections/Comparison.jsx'
import BuiltFor from './sections/BuiltFor.jsx'
import WhyNow from './sections/WhyNow.jsx'
import FAQ from './sections/FAQ.jsx'
import CTA from './sections/CTA.jsx'

export default function App() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink-900 focus:px-4 focus:py-2 focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />
        <Hook />
        <Problem />
        <Journey />
        <Trajectory />
        <Pillars />
        <Comparison />
        <BuiltFor />
        <WhyNow />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </>
  )
}
