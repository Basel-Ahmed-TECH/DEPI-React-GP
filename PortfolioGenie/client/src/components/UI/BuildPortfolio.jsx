import { PiMagicWandBold } from "react-icons/pi";
import { Link } from "react-router-dom";

function BuildPortfolio() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <section className="flex items-center pt-20 justify-center bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Build Your Portfolio?
          </h1>

          {/* Description */}
          <p className="text-2xl text-white max-w-3xl mx-auto mb-10">
            Join thousands of developers who've already created stunning portfolios
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to={isLoggedIn ? "/github" : "/login"}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-gray-300 text-black text-lg font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <PiMagicWandBold size={24} />
              Get Started For Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuildPortfolio;
