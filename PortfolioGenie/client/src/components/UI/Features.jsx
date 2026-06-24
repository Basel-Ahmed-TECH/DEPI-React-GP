import { MdElectricBolt } from "react-icons/md";
import { FiTarget } from "react-icons/fi";
import { HiOutlineEye } from "react-icons/hi";
import { LuCodeXml } from "react-icons/lu";


function Features() {
  const features = [
    {
      icon: <MdElectricBolt size={32} />,
      title: "Build in Minutes",
      description:
        "Create professional portfolios quickly and efficiently with our streamlined process",
    },
    {
      icon: <FiTarget size={32} />,
      title: "SEO Optimized",
      description:
        "AI-generated descriptions optimized for search engines to boost your visibility",
    },
    {
      icon: <HiOutlineEye size={32} />,
      title: "Real-Time Preview",
      description:
        "See changes instantly with live preview as you build your portfolio",
    },
    {
      icon: <LuCodeXml size={32} />,
      title: "Clean Code",
      description:
        "Export maintainable, industry-standard code that follows best practices",
    },
  ];

  return (
    <section id="features" className="py-28 bg-white dark:bg-[#0C1327]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Project Objectives
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to create a standout portfolio
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-[#020618] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-800"
            >
              {/* Icon with gradient background */}
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 bg-opacity-10 mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-lg dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative line on hover */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-1/2 transition-all duration-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
