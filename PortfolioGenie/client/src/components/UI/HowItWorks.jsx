import { LuGithub, LuCodeXml } from "react-icons/lu";
import { PiMagicWandBold } from "react-icons/pi";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

function HowItWorks() {

  // An array of objects representing steps to illustrate the process of using the application
  const steps = [
    {
      number: "01",
      icon: <LuGithub size={50} />,
      title: "Connect GitHub",
      description:
        "Link your GitHub account to analyze your repositories and contributions",
    },
    {
      number: "02",
      icon: <PiMagicWandBold size={50} />,
      title: "AI Generation",
      description: "Our AI processes your data and generates optimized content",
    },
    {
      number: "03",
      icon: <LuCodeXml size={50} />,
      title: "Download & Customize",
      description: "Preview, customize, and download your portfolio with ease",
    },
  ];

  return (
    <section id="how-it-works" className="bg-white dark:bg-[#0F172B] py-28">
      <div className="max-w-8xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl font-bold text-dark dark:text-white mb-4">
            How It Works
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-xl">
            Three simple steps to your perfect portfolio
          </p>
        </div>

        {/* Timeline */}
        <div className="relative grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connector line */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-purple-400/40" />
              )}

              {/* Number Box */}
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                {step.number}
              </div>

              {/* Icon */}
              <div className="flex justify-center mt-8 text-purple-500">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-3xl font-bold text-black dark:text-white">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
