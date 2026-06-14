import Navbar from './components/UI/Navbar'
import Hero from './components/UI/Hero'
import Features from './components/UI/Features'
import AIPowered from './components/UI/AIPowered'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Hero />
      <Features />
      <AIPowered />
    </div>
  )
}

export default App