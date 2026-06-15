function GitHubProfile({ user }) {
  return (
    <div className="bg-white dark:bg-[#030712] rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-6 mb-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full border-4 border-purple-500"
        />

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </h2>

          <p className="text-gray-600 dark:text-gray-400">
            @{user.username}
          </p>

          {user.location && (
            <p className="text-sm dark:text-white text-gray-500 mt-1">
              {user.location}
            </p>
          )}
        </div>
      </div>

      {user.bio && (
        <div className="mb-4 p-3 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          {user.bio}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Stat value={user.publicRepos} label="Repositories" />
        <Stat value={user.followers} label="Followers" />
        <Stat value={user.following} label="Following" />
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div className="font-bold text-xl text-purple-600">
        {value}
      </div>
      <div className="text-sm text-gray-500">
        {label}
      </div>
    </div>
  );
}

export default GitHubProfile;