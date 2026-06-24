import { LuGithub } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegFileCode } from "react-icons/fa6";

function AIPowered() {
  // An array of AI-powered features
  const aiFeatures = [
    {
      title: "Automatic GitHub project analysis",
    },
    {
      title: "AI-generated project descriptions",
    },
    {
      title: "Skills summary generation",
    },
    {
      title: "Professional About Me sections",
    },
    {
      title: "SEO optimization included",
    },
  ];

  // An array of objects representing sample projects to showcase GitHub integration
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "React, Node.js, MongoDB"
    },
    {
      title: "Task Management App",
      description: "TypeScript, Express, PostgreSQL"
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#1E2A3F]">
      <div className="container mx-auto px-4">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* Left Column - AI Features */}
          <div className="bg-gray-50 dark:bg-[#1E2A3F] ">
            {/* Header inside left column */}
            <div className="mb-8">
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">
                Powered by Advanced AI
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                PortfolioGenie analyzes your GitHub activity and uses cutting-edge
                AI to generate compelling content that showcases your skills and
                projects professionally.
              </p>
            </div>
            
            <div className="space-y-4">
              {aiFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group hover:translate-x-2 transition-transform duration-200"
                >
                  <div className="flex-shrink-0 mt-1 text-green-500">
                    <FaRegCheckCircle size={25} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Project Showcase */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-black dark:to-black rounded-2xl p-8 shadow-lg border border-purple-100 dark:border-purple-900/30">
            <div className="flex items-center gap-3 mb-6">
              <LuGithub
                size={32}
                className="text-black dark:text-white"
              />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                GitHub Integration
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              Simply connect your GitHub account and let AI do the heavy lifting
            </p>

            <div className="space-y-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 text-purple-600">
                      <FaRegFileCode size={25} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-black">
                      {project.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 text-md dark:text-gray-600">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIPowered;