import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import HomePage from './components/pages/Home';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import GitHubPage from './components/pages/GitHubPage';
function App() {
  return (
    <Router>
      <Routes>
        {/* To isolate auth pages (No Navbar, No Footer) */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Main Website Layout (Navbar + page View + Footer) */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col justify-between pt-24">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/github" element={<GitHubPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;