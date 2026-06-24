import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUser, FiShield, FiBriefcase, FiLogOut,
  FiMail, FiGithub, FiFileText, FiEdit2, FiTrash2,
  FiExternalLink, FiPlusCircle, FiLock, FiEye, FiEyeOff,
} from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import { usePortfolio } from '../../context/PortfolioContext';
import PdfViewer from '../PdfViewer';

// ─── helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

function authHeader() {
  const token = localStorage.getItem('token');
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

// ─── shared field components ──────────────────────────────────────────────────

function FieldRow({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 text-gray-900 dark:text-white">
        {Icon && <Icon size={16} className="text-gray-500 flex-shrink-0" />}
        {children}
      </div>
    </div>
  );
}

// ── IMPORTANT: defined at module level so its identity never changes between
//    renders — this is what fixes the "defocus on every keystroke" bug.
//    When a component is defined inside another component's render body,
//    React sees a brand-new component type on every render and unmounts/
//    remounts the old one, which kills focus.
function PasswordField({ label, fieldKey, placeholder, form, setForm, show, onToggleShow }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 focus-within:border-purple-600 transition-colors">
        <FiLock size={16} className="text-gray-500 flex-shrink-0" />
        <input
          type={show ? 'text' : 'password'}
          value={form[fieldKey]}
          onChange={e => setForm(prev => ({ ...prev, [fieldKey]: e.target.value }))}
          placeholder={placeholder}
          className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm"
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0"
        >
          {show ? <FiEyeOff size={15} /> : <FiEye size={15} />}
        </button>
      </div>
    </div>
  );
}

// ─── ProfileTab ───────────────────────────────────────────────────────────────

function ProfileTab({ user, onNameUpdated }) {
  const [editing, setEditing]   = useState(false);
  const [nameVal, setNameVal]   = useState('');
  const [saving, setSaving]     = useState(false);
  const [nameStatus, setNameStatus] = useState(null);

  function startEdit() {
    setNameVal(user?.name ?? '');
    setNameStatus(null);
    setEditing(true);
  }

  async function saveName() {
    if (!nameVal.trim()) return;
    setSaving(true);
    setNameStatus(null);
    try {
      const res = await fetch('http://localhost:5000/auth/me', {
        method: 'PATCH',
        headers: authHeader(),
        body: JSON.stringify({ name: nameVal.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save name.');
      setNameStatus({ type: 'success', msg: 'Name updated!' });
      setEditing(false);
      onNameUpdated(data.user.name);
    } catch (err) {
      setNameStatus({ type: 'error', msg: err.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Your account details from the database</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Editable display name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
          {editing ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#161b22] border border-purple-700 rounded-lg px-4 py-3">
                <FiUser size={16} className="text-gray-500 flex-shrink-0" />
                <input
                  autoFocus
                  value={nameVal}
                  onChange={e => setNameVal(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveName()}
                  maxLength={100}
                  placeholder="Your display name"
                  className="bg-transparent w-full outline-none text-gray-900 dark:text-white placeholder-gray-500 text-sm"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={saveName}
                  disabled={saving || !nameVal.trim()}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity"
                >
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button
                  onClick={() => { setEditing(false); setNameStatus(null); }}
                  className="px-4 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-xs hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
              {nameStatus && (
                <p className={`text-xs ${nameStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {nameStatus.msg}
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 text-gray-900 dark:text-white">
              <FiUser size={16} className="text-gray-500 flex-shrink-0" />
              <span className="flex-1 text-sm">{user?.name || <span className="text-gray-500 italic">No name set</span>}</span>
              <button
                onClick={startEdit}
                className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors flex-shrink-0"
              >
                <FiEdit2 size={12} /> Edit
              </button>
            </div>
          )}
        </div>

        <FieldRow label="Account ID" icon={FiUser}>
          <span className="text-gray-500 font-mono text-sm">{user?.id ?? '—'}</span>
        </FieldRow>

        <FieldRow label="Email" icon={FiMail}>
          <span className="text-gray-900 dark:text-white">{user?.email ?? '—'}</span>
        </FieldRow>

        <FieldRow label="Portfolios created" icon={FiBriefcase}>
          <span className="text-gray-900 dark:text-white">{user?.portfolioCount ?? '—'}</span>
        </FieldRow>

        <FieldRow label="Member since" icon={FiShield}>
          <span className="text-gray-900 dark:text-white">{formatDate(user?.created_at)}</span>
        </FieldRow>
      </div>
    </div>
  );
}

// ─── SecurityTab ──────────────────────────────────────────────────────────────

function SecurityTab() {
  const [form, setForm]     = useState({ current: '', next: '', confirm: '' });
  const [show, setShow]     = useState({ current: false, next: false, confirm: false });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleShow = useCallback((field) => {
    setShow(prev => ({ ...prev, [field]: !prev[field] }));
  }, []);

  async function handleUpdate(e) {
    e.preventDefault();
    if (form.next !== form.confirm) {
      setStatus({ type: 'error', msg: 'New passwords do not match.' });
      return;
    }
    if (form.next.length < 8) {
      setStatus({ type: 'error', msg: 'New password must be at least 8 characters.' });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('http://localhost:5000/auth/change-password', {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ currentPassword: form.current, newPassword: form.next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update password.');
      setStatus({ type: 'success', msg: 'Password updated successfully.' });
      setForm({ current: '', next: '', confirm: '' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Security Settings</h2>
        <p className="text-gray-400 text-sm mt-1">Manage your password and account security</p>
      </div>

      <form onSubmit={handleUpdate} className="max-w-md space-y-5">
        <PasswordField
          label="Current Password"
          fieldKey="current"
          placeholder="Enter current password"
          form={form}
          setForm={setForm}
          show={show.current}
          onToggleShow={() => toggleShow('current')}
        />
        <PasswordField
          label="New Password"
          fieldKey="next"
          placeholder="At least 8 characters"
          form={form}
          setForm={setForm}
          show={show.next}
          onToggleShow={() => toggleShow('next')}
        />
        <PasswordField
          label="Confirm New Password"
          fieldKey="confirm"
          placeholder="Repeat new password"
          form={form}
          setForm={setForm}
          show={show.confirm}
          onToggleShow={() => toggleShow('confirm')}
        />

        {status && (
          <div className={`px-4 py-3 rounded-lg text-sm border ${
            status.type === 'success'
              ? 'bg-green-900/30 border-green-800 text-green-400'
              : 'bg-red-900/30 border-red-800 text-red-400'
          }`}>
            {status.msg}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !form.current || !form.next || !form.confirm}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Updating…' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}

// ─── PortfoliosTab ────────────────────────────────────────────────────────────

function PortfoliosTab() {
  const navigate = useNavigate();
  const {
    portfolios,
    loading,
    error,
    loadPortfolios,
    removePortfolio,
    editPortfolio,
  } = usePortfolio();

  const [deleting, setDeleting]         = useState(null);
  const [previewPortfolio, setPreview]  = useState(null); // portfolio object for PDF modal

  // Load once when the tab mounts
  useEffect(() => { loadPortfolios(); }, [loadPortfolios]);

  async function handleDelete(id) {
    if (!window.confirm('Delete this portfolio? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await removePortfolio(id);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  }

  async function handleView(portfolio) {
    // If we already have the data field, open right away
    if (portfolio.data) { setPreview(portfolio); return; }
    // Otherwise fetch the full record (list endpoint omits data for performance)
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/portfolio/${portfolio.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok) setPreview(json.portfolio);
    } catch { /* ignore */ }
  }

  async function handleEdit(portfolio) {
    // The list only returns metadata — fetch full record (including data) first
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/portfolio/${portfolio.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok) {
        editPortfolio(json.portfolio);   // now has .data field → PUT on save
        navigate('/github');
      } else {
        alert(json.message || 'Failed to load portfolio.');
      }
    } catch {
      alert('Failed to load portfolio.');
    }
  }

  function handleDuplicate(portfolio) {
    duplicatePortfolio(portfolio);     // sets activePortfolio without id → POST on save
    navigate('/github');
  }

  return (
    <div>
      {/* PDF preview modal */}
      {previewPortfolio && (
        <PdfViewer portfolio={previewPortfolio} onClose={() => setPreview(null)} />
      )}

      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Portfolios</h2>
          <p className="text-gray-400 text-sm mt-1">
            Portfolios saved to your Neon database
          </p>
        </div>
        <button
          onClick={() => navigate('/github')}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <FiPlusCircle size={15} />
          Create New
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-3 text-gray-400 text-sm py-12 justify-center">
          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          Fetching from database…
        </div>
      )}

      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-900/30 border border-red-800 text-red-400 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && portfolios.length === 0 && (
        <div className="text-center py-16 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 flex items-center justify-center">
            <FiBriefcase size={28} className="text-gray-600" />
          </div>
          <div>
            <p className="text-gray-900 dark:text-white font-semibold mb-1">No portfolios yet</p>
            <p className="text-gray-400 text-sm">Head to the GitHub page to generate your first one.</p>
          </div>
          <button
            onClick={() => navigate('/github')}
            className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <BsStars size={15} />
            Generate Portfolio
          </button>
        </div>
      )}

      {!loading && portfolios.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolios.map(portfolio => (
            <div
              key={portfolio.id}
              className="group bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 hover:border-purple-700 rounded-xl p-5 flex flex-col justify-between transition-all duration-200"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <FiFileText size={14} className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-400 transition-colors truncate">
                      {portfolio.title}
                    </h3>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-900/40 text-green-400 border border-green-800 flex-shrink-0 ml-2">
                    Saved
                  </span>
                </div>

                {portfolio.github_username && (
                  <p className="text-gray-500 text-xs mb-1 flex items-center gap-1">
                    <FiGithub size={11} />
                    {portfolio.github_username}
                  </p>
                )}
                <p className="text-gray-500 text-xs">
                  Created {formatDate(portfolio.created_at)}
                </p>
              </div>

              <div className="flex justify-end items-center pt-4 mt-2 border-t border-gray-800/60 gap-2 flex-wrap">
                <button
                  onClick={() => handleDelete(portfolio.id)}
                  disabled={deleting === portfolio.id}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-red-900/30 border border-red-900/50 text-red-400 hover:bg-red-900/50 transition-colors disabled:opacity-40"
                >
                  <FiTrash2 size={12} />
                  {deleting === portfolio.id ? 'Deleting…' : 'Delete'}
                </button>
                <button
                  onClick={() => handleView(portfolio)}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <FiEye size={12} />
                  View PDF
                </button>
                <button
                  onClick={() => handleEdit(portfolio)}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition-opacity"
                >
                  <FiEdit2 size={12} />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ProfilePage (root) ───────────────────────────────────────────────────────

export default function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // All user data comes straight from GET /auth/me → Neon DB
  const [user, setUser]               = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError]     = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    (async () => {
      try {
        // 1. Fetch user row from DB
        const res = await fetch('http://localhost:5000/auth/me', {
          headers: authHeader(),
        });
        if (res.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load profile.');

        // 2. Also fetch portfolio count from DB
        let portfolioCount = 0;
        try {
          const pRes = await fetch('http://localhost:5000/portfolio', { headers: authHeader() });
          if (pRes.ok) {
            const pData = await pRes.json();
            portfolioCount = Array.isArray(pData) ? pData.length : 0;
          }
        } catch { /* non-critical */ }

        setUser({ ...data.user, portfolioCount });
      } catch (err) {
        setUserError(err.message);
      } finally {
        setUserLoading(false);
      }
    })();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const tabs = [
    { key: 'profile',    label: 'Profile',    Icon: FiUser },
    { key: 'security',   label: 'Security',   Icon: FiShield },
    { key: 'portfolios', label: 'Portfolios', Icon: FiBriefcase },
  ];

  function handleNameUpdated(newName) {
    setUser(prev => prev ? { ...prev, name: newName } : prev);
  }

  // Use real name from DB (auto-seeded from email on first load)
  const displayName = user?.name || user?.email?.split('@')[0] || '';
  const initials    = displayName ? displayName.slice(0, 2).toUpperCase() : '??';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020618] pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ── Header card ── */}
        <div className="bg-white dark:bg-[#0d1117] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-5">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left w-full">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold border-2 border-gray-300 dark:border-gray-700 select-none">
                {userLoading ? '…' : initials}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {userLoading ? (
                <div className="space-y-2">
                  <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-56 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
              ) : userError ? (
                <p className="text-red-400 text-sm">{userError}</p>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {displayName}
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{user?.email}</p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                    ID #{user?.id} · {user?.portfolioCount ?? 0} portfolio{user?.portfolioCount !== 1 ? 's' : ''}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-red-950/60 border border-red-900/60 text-red-400 hover:bg-red-900/60 transition-colors text-sm font-medium"
          >
            <FiLogOut size={15} />
            Logout
          </button>
        </div>

        {/* ── Tab switcher ── */}
        <div className="bg-gray-100 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 inline-flex p-1.5 rounded-xl gap-1">
          {tabs.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === key
                  ? 'bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Tab content ── */}
        <div className="bg-white dark:bg-[#0d1117] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
          {activeTab === 'profile'    && <ProfileTab user={user} onNameUpdated={handleNameUpdated} />}
          {activeTab === 'security'   && <SecurityTab />}
          {activeTab === 'portfolios' && <PortfoliosTab />}
        </div>

      </div>
    </div>
  );
}