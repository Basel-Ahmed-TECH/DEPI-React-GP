import { Routes, Route } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import HomePage from './components/pages/Home';
import GitHubPage from './components/pages/GitHubPage';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/github" element={<GitHubPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;