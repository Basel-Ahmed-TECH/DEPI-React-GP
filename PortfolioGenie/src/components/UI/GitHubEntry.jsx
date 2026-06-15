import { useState } from "react";
import { useGitHub } from "../../context/GitHubContext";

import GitHubHero from "../github/GitHubHero";
import GitHubProfile from "../github/GitHubProfile";
import GitHubSkills from "../github/GitHubSkills";
import GitHubRepositories from "../github/GitHubRepositories";
import LoadingSpinner from "../github/LoadingSpinner";
import ErrorMessage from "../github/ErrorMessage";

function GitHubEntry() {
  const {
    setUsername,
    userData,
    repos,
    loading,
    error,
    isUsernameSubmitted,
  } = useGitHub();

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim()) {
      setUsername(inputValue.trim());
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-50 dark:bg-[#020618]">
      <div className="max-w-5xl mx-auto">
        {!isUsernameSubmitted && (
          <GitHubHero
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}

        {loading && <LoadingSpinner />}

        <ErrorMessage error={error} />

        {userData && (
          <div className="space-y-6 mt-6">
            <GitHubProfile user={userData} />
            <GitHubSkills skills={userData.skills} />
            <GitHubRepositories repos={repos} />
          </div>
        )}
      </div>
    </div>
  );
}

export default GitHubEntry;