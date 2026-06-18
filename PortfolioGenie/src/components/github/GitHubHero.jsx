import { LuGithub } from "react-icons/lu";
import { PiMagicWandBold } from "react-icons/pi";

function GitHubHero({
  inputValue,
  setInputValue,
  handleSubmit,
  loading,
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 mt-6">
          Let's Build Your Portfolio
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Enter your GitHub username to get started. Our AI will analyze your
          repositories and generate professional content.
        </p>
      </div>

      <div className="bg-white dark:bg-[#030712] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl">
        <div className="flex items-start gap-3 mb-8">
          <LuGithub size={32} className="text-black dark:text-white" />

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Connect GitHub Account
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-xl mt-1">
              We'll analyze your repositories to generate your portfolio content
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-xl font-medium text-gray-900 dark:text-white mb-3">
            GitHub Username
          </label>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              disabled={loading}
              className="flex-1 h-14 px-4 text-xl rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white"
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="inline-flex items-center gap-2 px-8 py-3 text-lg bg-black dark:bg-white dark:text-black text-white rounded-lg"
            >
              <PiMagicWandBold size={22} />
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6">
          <h3 className="text-gray-700 text-xl dark:text-gray-300 mb-4">
            What we'll generate:
          </h3>

          <ul className="space-y-3">
            {[
              "SEO-optimized project descriptions",
              "Professional About Me section",
              "Skills summary from your tech stack",
              "Clean, exportable code",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-lg text-gray-600 dark:text-gray-400"
              >
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GitHubHero;