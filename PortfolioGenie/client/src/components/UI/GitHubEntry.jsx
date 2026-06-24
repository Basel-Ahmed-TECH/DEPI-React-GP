import { useState } from "react";
import { useGitHub } from "../../context/GitHubContext";
import { usePortfolio } from "../../context/PortfolioContext";

import GitHubHero from "../github/GitHubHero";
import LoadingSpinner from "../github/LoadingSpinner";
import ErrorMessage from "../github/ErrorMessage";
import PortfolioBuilderForm from "../portfolio/PortfolioBuilderForm";

function GitHubEntry() {
  const {
    setUsername,
    userData,
    profile,
    repos,
    loading,
    error,
    isUsernameSubmitted,
  } = useGitHub();

  const { activePortfolio } = usePortfolio();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim()) {
      setUsername(inputValue.trim());
    }
  };

  // ── Edit mode: skip GitHub entirely, render builder from saved data ──
  if (activePortfolio?.data) {
    return (
      <div className="min-h-screen pt-24 px-4 bg-gray-50 dark:bg-[#020618]">
        <div className="mx-auto max-w-none">
          <PortfolioBuilderForm
            profile={activePortfolio.data.metadata?.githubUsername
              ? { login: activePortfolio.data.metadata.githubUsername }
              : {}}
            repos={[]}
            userData={null}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-50 dark:bg-[#020618]">
      <div className={userData ? "mx-auto max-w-none" : "max-w-5xl mx-auto"}>
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

        {!loading && userData && profile && Array.isArray(repos) && (
          <div className="mt-6">
            <PortfolioBuilderForm profile={profile} repos={repos} userData={userData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default GitHubEntry;
