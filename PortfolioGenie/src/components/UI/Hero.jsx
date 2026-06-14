import { useTheme } from "../../context/ThemeContext";
import { BsStars } from "react-icons/bs";
import { PiMagicWandBold } from "react-icons/pi";
import heroPicture from "../../assets/heroPicture.jpg";

function Hero() {
  const { theme } = useTheme();

  return (
    <section className="min-h-screen flex items-center pt-20    justify-center bg-white dark:bg-[#020618]">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-lg font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <BsStars size={24} />
            <span>AI-Powered Portfolio Builder</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-gray-900 mb-6 leading-tight">
            Build Your Dream Portfolio in Minutes
          </h1>

          {/* Description */}
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            Let AI analyze your GitHub projects and create a professional,
            SEO-optimized developer portfolio that stands out from the crowd.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-3 bg-black hover:bg-slate-800 text-white text-lg font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <PiMagicWandBold size={24} />
              Start Building Now
            </a>
          </div>

          {/* Image Section with Gradient Overlay */}
          <div className="relative w-full mt-12">
            {/* Gradient Overlay on top of image */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 z-10 rounded-xl"></div>

            <img
              src={heroPicture}
              alt="Portfolio Builder Preview"
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
