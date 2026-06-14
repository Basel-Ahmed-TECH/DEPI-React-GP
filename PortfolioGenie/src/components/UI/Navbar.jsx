import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-[#0C1327] border-gray-200 dark:border-gray-700 z-50">
      <div className="px-4">
        <div className="flex justify-between items-center h-24">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">
            PortfolioGenie
          </h1>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 mr-4"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8 mr-4">
            <a
              href="#"
              className="text-gray-900 dark:text-white text-lg hover:text-purple-500 transition-colors duration-100 leading-none"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-900 dark:text-white text-lg hover:text-purple-500 transition-colors duration-100 leading-none"
            >
              How It Works
            </a>
            <button
              onClick={toggleTheme}
              className="text-gray-900 dark:text-white hover:text-purple-500 transition-colors duration-100 flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <FiMoon size={24} />
              ) : (
                <IoSunnyOutline size={24} />
              )}
            </button>
            <a
              href="#"
              className="px-6 py-4 dark:bg-white bg-black rounded-lg dark:text-gray-900 text-white hover:bg-slate-800 font-medium text-lg dark:hover:bg-gray-300 transition-colors duration-200 leading-none inline-flex items-center"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200 dark:border-gray-700 px-4">
            <a
              href="#"
              className="block text-gray-900 dark:text-white hover:text-purple-500 py-2"
            >
              Features
            </a>
            <a
              href="#"
              className="block text-gray-900 dark:text-white hover:text-purple-500 py-2"
            >
              How It Works
            </a>
            <button
              onClick={toggleTheme}
              className="block w-full text-left text-gray-900 dark:text-white hover:text-purple-500 py-2"
            >
              {theme === "light" ? (
                <FiMoon className="inline mr-2" />
              ) : (
                <IoSunnyOutline className="inline mr-2" />
              )}
              {theme === "light" ? " Dark Mode" : " Light Mode"}
            </button>
            <a
              href="#"
              className="block text-center text-gray-900 dark:text-white hover:text-purple-500 py-2 px-6 dark:bg-white bg-black rounded-lg hover:bg-slate-800 dark:hover:bg-gray-300 transition-colors duration-200"
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
