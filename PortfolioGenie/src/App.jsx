import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import HomePage from './components/pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;