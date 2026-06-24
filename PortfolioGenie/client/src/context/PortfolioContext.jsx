import { createContext, useContext, useState, useCallback } from 'react';
import {
  getUserPortfolios,
  deletePortfolio,
  updatePortfolio,
  savePortfolio,
} from '../services/portfolioAPI';

// ─── Context ──────────────────────────────────────────────────────────────────

const PortfolioContext = createContext(null);

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used inside <PortfolioProvider>');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function PortfolioProvider({ children }) {
  // Full list of the user's saved portfolios (loaded from DB)
  const [portfolios, setPortfolios]       = useState([]);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState(null);

  // Tracks which portfolio the builder is working on.
  // Shape: { id?: number, title: string, data: object } | null
  // If id is present  → builder will PUT  (edit existing)
  // If id is absent   → builder will POST (new save)
  const [activePortfolio, setActivePortfolio] = useState(null);

  // ── fetch ────────────────────────────────────────────────────────────────────

  const loadPortfolios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserPortfolios();
      setPortfolios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── delete ───────────────────────────────────────────────────────────────────

  const removePortfolio = useCallback(async (id) => {
    await deletePortfolio(id);                          // throws on failure
    setPortfolios(prev => prev.filter(p => p.id !== id));
  }, []);

  // ── save / update (used by the builder) ──────────────────────────────────────

  const persistPortfolio = useCallback(async ({ title, githubUsername, data }) => {
    if (activePortfolio?.id) {
      // Edit flow: update existing row
      const updated = await updatePortfolio(activePortfolio.id, { title, data });
      setPortfolios(prev =>
        prev.map(p => p.id === activePortfolio.id ? { ...p, ...updated.portfolio } : p)
      );
      return updated;
    } else {
      // New save flow: create new row
      const created = await savePortfolio({ title, githubUsername, data });
      setPortfolios(prev => [created.portfolio, ...prev]);
      return created;
    }
  }, [activePortfolio]);

  // ── helpers for profile page ──────────────────────────────────────────────────

  /** Load a portfolio into the builder for editing (keeps its id). */
  const editPortfolio = useCallback((portfolio) => {
    setActivePortfolio({ id: portfolio.id, title: portfolio.title, data: portfolio.data });
  }, []);

  /** Duplicate a portfolio as a starting point (no id = new save). */
  const duplicatePortfolio = useCallback((portfolio) => {
    setActivePortfolio({ title: `${portfolio.title} (copy)`, data: portfolio.data });
  }, []);

  /** Clear the active portfolio (call when leaving the builder). */
  const clearActivePortfolio = useCallback(() => setActivePortfolio(null), []);

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <PortfolioContext.Provider value={{
      // list state
      portfolios,
      loading,
      error,
      loadPortfolios,
      removePortfolio,

      // builder state
      activePortfolio,
      setActivePortfolio,
      editPortfolio,
      duplicatePortfolio,
      clearActivePortfolio,
      persistPortfolio,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}