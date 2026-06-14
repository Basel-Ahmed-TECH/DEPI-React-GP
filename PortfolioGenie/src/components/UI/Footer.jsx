import { BsStars } from "react-icons/bs";

function Footer() {
  return (
    <footer className="bg-[#0F172B]">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <BsStars size={24} className="text-white text-lg" />
            </div>

            <span className="text-white text-2xl font-bold">
              PortfolioGenie
            </span>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-lg text-center md:text-right">
            © 2026 PortfolioGenie. AI-Powered Developer Portfolio Builder.
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;