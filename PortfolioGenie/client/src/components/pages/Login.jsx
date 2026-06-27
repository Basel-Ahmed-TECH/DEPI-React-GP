import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext"; 
import { BsStars } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";

export default function Login() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // 1. connect to Express server and send login payload
      const res = await axios.post("http://localhost:5000/auth/login", {
        email: form.email,
        password: form.password,
      });

      const data = res.data;

      localStorage.setItem("token", data.token);
      setSuccess("Logged in successfully! Welcome back... ");

      setTimeout(() => {
        navigate("/github");
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0C1327] flex items-center justify-center px-4 transition-colors duration-300">
      
      {/* Theme Button */}
      <button
        type="button"
        onClick={toggleTheme}
        className="fixed top-5 right-5 text-gray-600 dark:text-gray-300 hover:text-purple-500 transition-colors focus:outline-none"
        aria-label="Toggle theme"
      >
        {theme === "light" ? <FiMoon size={22} /> : <IoSunnyOutline size={22} />}
      </button>

      {/* Main Authentication Card */}
      <div className="bg-white dark:bg-[#1a2540] rounded-2xl shadow-lg p-10 w-full max-w-md transition-colors duration-300">
        
        
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="inline-flex p-2 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600">
            <BsStars size={22} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            PortfolioGenie
          </span>
        </div>

        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
          Sign in to your account to continue building
        </p>

       
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Input Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Email
            </label>
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#0C1327] rounded-lg px-4 py-3 border border-transparent focus-within:border-purple-500 transition-colors">
              <MdOutlineEmail size={18} className="text-gray-400 flex-shrink-0" />
              <input
                type="email"
                placeholder="developer@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="bg-transparent w-full text-gray-900 dark:text-white placeholder-gray-400 outline-none text-sm"
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Password
            </label>
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#0C1327] rounded-lg px-4 py-3 border border-transparent focus-within:border-purple-500 transition-colors">
              <CiLock size={18} className="text-gray-400 flex-shrink-0" />
              <input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="bg-transparent w-full text-gray-900 dark:text-white placeholder-gray-400 outline-none text-sm"
              />
            </div>
          </div>
          
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-900 dark:text-white">
                        Remember me
                    </label>
                </div>
                <div>
                    <Link
                        to="/forgot-password"
                        className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                    >
                        Forgot password?
                    </Link>
                </div>
            </div>    

          

          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          
          {success && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-500 text-sm p-3 rounded-xl text-center font-medium">
              {success}
            </div>
          )}

         
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 text-base disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
            >
              Create one now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}