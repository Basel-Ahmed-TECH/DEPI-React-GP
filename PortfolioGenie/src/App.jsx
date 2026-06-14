import Navbar from './components/UI/Navbar'
import Hero from './components/UI/Hero'
import Features from './components/UI/Features'
import AIPowered from './components/UI/AIPowered'
import HowItWorks from './components/UI/HowItWorks'
import BuildPortfolio from './components/UI/BuildPortfolio'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Hero />
      <Features />
      <AIPowered />
      <HowItWorks />
      <BuildPortfolio/>
    </div>
  )
}

export default App