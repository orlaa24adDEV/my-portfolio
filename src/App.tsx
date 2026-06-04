import { GalaxyBackground } from './components/GalaxyBackground'
import { Layout } from './components/layout'
import { Hero, About, Projects, Skills, Contact } from './components/sections'

function App() {
  return (
    <>
      <GalaxyBackground />
      <Layout>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </Layout>
    </>
  )
}

export default App
