import Navbar from './components/UI/Navbar'
import Hero from './components/UI/Hero'
import Features from './components/UI/Features'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Hero />
      <Features />
    </div>
  )
}

export default App