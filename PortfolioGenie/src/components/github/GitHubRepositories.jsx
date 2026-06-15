function GitHubRepositories({ repos }) {
  if (!repos?.length) return null;

  return (
    <div className="bg-white dark:bg-[#030712] rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Top Repositories
      </h3>

      <div className="space-y-3">
        {repos.slice(0, 5).map((repo) => (
          <div
            key={repo.id}
            className="border-b dark:border-gray-700 pb-3 last:border-0"
          >
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-purple-600 dark:text-purple-400"
            >
              {repo.name}
            </a>

            {repo.description && (
              <p className="text-sm text-gray-500 mt-1">
                {repo.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GitHubRepositories;