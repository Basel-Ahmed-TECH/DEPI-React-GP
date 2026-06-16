function GitHubSkills({ skills }) {
  if (!skills?.length) return null;

  return (
    <div className="bg-white dark:bg-[#030712] rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Technologies & Skills
      </h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default GitHubSkills;