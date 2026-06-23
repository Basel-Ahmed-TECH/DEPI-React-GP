import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FiArrowLeft, FiEdit2, FiGithub, FiMail, FiMapPin,
  FiExternalLink, FiCode, FiUser, FiBriefcase, FiBook, FiLinkedin,
} from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import { usePortfolio } from '../../context/PortfolioContext';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
      bg-purple-100 text-purple-700 border border-purple-200
      dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800/50">
      {children}
    </span>
  );
}

function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm
      dark:bg-[#0d1117] dark:border-gray-800">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
          <Icon size={15} className="text-white" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function PortfolioViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/portfolio/${id}`, {
          headers: getAuthHeaders(),
        });
        if (res.status === 401) { navigate('/login'); return; }
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || 'Failed to load portfolio.');
        setPortfolio(json.portfolio);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020618] pt-28 flex items-center justify-center">
      <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
        <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        Loading portfolio…
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020618] pt-28 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
        <button onClick={() => navigate('/profile')} className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm">
          ← Back to Profile
        </button>
      </div>
    </div>
  );

  const d = portfolio?.data ?? {};
  const p = d.personalInfo ?? {};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020618] pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors text-sm">
            <FiArrowLeft size={16} /> Back to Profile
          </button>
        const { editPortfolio } = usePortfolio();

        <button
          onClick={() => { editPortfolio(portfolio); navigate('/github'); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <FiEdit2 size={14} /> Edit Portfolio
        </button>
        </div>

        {/* Hero card */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-8
          dark:from-purple-900/40 dark:to-blue-900/40 dark:border-purple-800/40">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <BsStars size={18} className="text-white" />
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">PortfolioGenie</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {p.fullName || portfolio?.title || 'Portfolio'}
          </h1>
          {p.professionalTitle && (
            <p className="text-purple-600 dark:text-purple-400 font-medium mt-1">{p.professionalTitle}</p>
          )}
          <div className="flex flex-wrap gap-4 mt-4">
            {p.location && <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm"><FiMapPin size={13} />{p.location}</span>}
            {p.email && <a href={`mailto:${p.email}`} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors"><FiMail size={13} />{p.email}</a>}
            {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors"><FiGithub size={13} />GitHub</a>}
            {p.linkedin && <a href={p.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors"><FiLinkedin size={13} />LinkedIn</a>}
          </div>
        </div>

        {/* About */}
        {d.aboutMe && (
          <SectionCard icon={FiUser} title="About Me">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{d.aboutMe}</p>
          </SectionCard>
        )}

        {/* Skills */}
        {d.skills?.length > 0 && (
          <SectionCard icon={FiCode} title="Skills">
            <div className="flex flex-wrap gap-2">{d.skills.map((s, i) => <Badge key={i}>{s}</Badge>)}</div>
          </SectionCard>
        )}

        {/* Services */}
        {d.services?.length > 0 && (
          <SectionCard icon={FiBriefcase} title="Services">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {d.services.filter(Boolean).map((s, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />{s}
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Projects */}
        {d.projects?.length > 0 && (
          <SectionCard icon={FiBriefcase} title="Projects">
            <div className="space-y-4">
              {d.projects.map((proj, i) => (
                <div key={i} className="bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{proj.name}</h3>
                    <div className="flex gap-2">
                      {proj.repoUrl && (
                        <a href={proj.repoUrl} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1.5 transition-colors">
                          <FiGithub size={12} /> Repo
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg px-2.5 py-1.5 hover:opacity-90 transition-opacity">
                          <FiExternalLink size={12} /> Live
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.description && <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 leading-relaxed">{proj.description}</p>}
                  {proj.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">{proj.technologies.map((t, j) => <Badge key={j}>{t}</Badge>)}</div>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Experience */}
        {d.experience?.some(e => e.company || e.role) && (
          <SectionCard icon={FiBriefcase} title="Experience">
            <div className="space-y-4">
              {d.experience.filter(e => e.company || e.role).map((exp, i) => (
                <div key={i} className="border-l-2 border-purple-300 dark:border-purple-700/50 pl-4">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
                      <p className="text-purple-600 dark:text-purple-400 text-sm">{exp.company}</p>
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-gray-400 text-xs">{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</span>
                    )}
                  </div>
                  {exp.description && <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Education */}
        {d.education?.some(e => e.institution || e.degree) && (
          <SectionCard icon={FiBook} title="Education">
            <div className="space-y-4">
              {d.education.filter(e => e.institution || e.degree).map((edu, i) => (
                <div key={i} className="border-l-2 border-blue-300 dark:border-blue-700/50 pl-4">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">{edu.institution}</p>
                    </div>
                    {(edu.startDate || edu.endDate) && (
                      <span className="text-gray-400 text-xs">{edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}</span>
                    )}
                  </div>
                  {edu.description && <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{edu.description}</p>}
                </div>
              ))}
            </div>
          </SectionCard>
        )}

      </div>
    </div>
  );
}