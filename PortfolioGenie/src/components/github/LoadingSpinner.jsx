function LoadingSpinner() {
  return (
    <div className="text-center py-8">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Fetching GitHub data...
      </p>
    </div>
  );
}

export default LoadingSpinner;