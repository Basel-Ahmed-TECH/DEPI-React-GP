function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4">
      {error}
    </div>
  );
}

export default ErrorMessage;