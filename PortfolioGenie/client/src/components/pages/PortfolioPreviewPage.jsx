import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getTemplate } from '../templates';
import { exportPortfolio } from '../../utils/exportPortfolio';

export default function PortfolioPreviewPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template') || 'midnight';
  const [exporting, setExporting] = useState(false);
  const [exportMsg, setExportMsg] = useState('');

  const portfolioData = (() => {
    try { return JSON.parse(localStorage.getItem('portfolioGenie:lastPortfolioDraft') || 'null'); } catch { return null; }
  })();

  const tmpl = getTemplate(templateId);
  const TemplateComponent = tmpl.component;

  const handleExport = async () => {
    if (!portfolioData) return;
    setExporting(true);
    setExportMsg('');
    try {
      await exportPortfolio(portfolioData, templateId);
      setExportMsg('✓ Downloaded!');
      setTimeout(() => setExportMsg(''), 3000);
    } catch (err) {
      console.error('Export error:', err);
      setExportMsg('Export failed');
    } finally {
      setExporting(false);
    }
  };

  if (!portfolioData) {
    return (
      <div
        className="min-h-screen bg-[#030716] flex items-center justify-center flex-col gap-4 text-white"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <p className="text-lg text-slate-500">No portfolio data found.</p>
        <button
          onClick={() => navigate('/github')}
          className="px-6 py-2.5 bg-gradient-to-br from-indigo-500 to-violet-500 text-white border-none rounded-lg cursor-pointer font-bold"
        >
          Start from GitHub
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Floating Action Bar */}
      <div
        className="fixed top-5 right-6 z-[9999] flex items-center gap-2.5 bg-[rgba(7,12,27,0.85)] backdrop-blur-md border border-white/10 rounded-xl px-3.5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <span className="text-[13px] font-semibold text-white/60 mr-1">Previewing</span>

        {/* Template badge */}
        <span className="inline-flex items-center gap-1.5 bg-indigo-500/15 border border-indigo-500/25 rounded-md px-2.5 py-1 text-xs font-semibold text-indigo-400 capitalize">
          {tmpl.name}
        </span>

        {/* Back button */}
        <button
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-bold cursor-pointer bg-transparent border border-white/15 text-white/65 hover:border-white/40 hover:text-white transition-all duration-200"
          onClick={() => navigate('/templates')}
        >
          ← Templates
        </button>

        {/* Export button */}
        <button
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-bold cursor-pointer bg-gradient-to-br from-indigo-500 to-violet-500 text-white hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none transition-all duration-200"
          onClick={handleExport}
          disabled={exporting}
        >
          {exporting ? 'Exporting...' : exportMsg || '⬇ Export ZIP'}
        </button>
      </div>

      {/* Live Template Render */}
      <div id="template-preview-root" className="min-h-screen">
        <TemplateComponent data={portfolioData} />
      </div>
    </>
  );
}
