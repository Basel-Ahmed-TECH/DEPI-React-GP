import Navbar from './components/UI/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Portfolio Builder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Build Your Dream Portfolio in Minutes
          </p>
        </div>
      </div>
    </div>
  )
}

export default App