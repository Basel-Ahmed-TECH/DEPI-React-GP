import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEMPLATES } from '../templates';

/* ── Mini layout previews (kept as inline style — purely decorative mockups) ── */
function MidnightPreview() {
  return (
    <div style={{ background: '#070c1b', height: '100%', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: 60, height: 8, borderRadius: 4, background: 'linear-gradient(90deg,#6366f1,#8b5cf6)' }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {[40, 32, 36, 28].map((w, i) => <div key={i} style={{ width: w, height: 6, borderRadius: 3, background: '#1e2a4a' }} />)}
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <div style={{ width: 80, height: 14, borderRadius: 4, background: 'linear-gradient(90deg,#fff,#818cf8)', margin: '0 auto 8px' }} />
        <div style={{ width: 120, height: 8, borderRadius: 3, background: '#1e2a4a', margin: '0 auto 6px' }} />
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          <div style={{ width: 48, height: 18, borderRadius: 4, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }} />
          <div style={{ width: 48, height: 18, borderRadius: 4, border: '1px solid #1e2a4a' }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ flex: 1, background: '#0f1629', border: '1px solid #1e2a4a', borderRadius: 6, padding: 8 }}>
            <div style={{ width: '70%', height: 6, borderRadius: 3, background: '#1e2a4a', marginBottom: 4 }} />
            <div style={{ width: '90%', height: 4, borderRadius: 2, background: '#0c1120' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AuroraPreview() {
  return (
    <div style={{ background: '#f1f5f9', height: '100%', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderRadius: 6, padding: '6px 10px' }}>
        <div style={{ width: 50, height: 7, borderRadius: 3, background: '#0d9488' }} />
        <div style={{ display: 'flex', gap: 4 }}>
          {[32, 24, 28].map((w, i) => <div key={i} style={{ width: w, height: 5, borderRadius: 2, background: '#e2e8f0' }} />)}
        </div>
      </div>
      <div style={{ background: 'linear-gradient(135deg,#0d9488,#0891b2,#6366f1)', borderRadius: 8, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ width: 90, height: 12, borderRadius: 4, background: 'rgba(255,255,255,.8)', marginBottom: 6 }} />
          <div style={{ width: 60, height: 7, borderRadius: 3, background: 'rgba(255,255,255,.5)' }} />
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.3)', border: '2px solid rgba(255,255,255,.5)' }} />
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {[1, 2].map(i => (
          <div key={i} style={{ flex: 1, background: '#fff', borderRadius: 6, padding: 8 }}>
            <div style={{ width: '60%', height: 6, borderRadius: 3, background: '#0d9488', marginBottom: 4 }} />
            <div style={{ width: '80%', height: 4, borderRadius: 2, background: '#e2e8f0', marginBottom: 3 }} />
            <div style={{ width: '65%', height: 4, borderRadius: 2, background: '#e2e8f0' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmberPreview() {
  return (
    <div style={{ background: '#111', height: '100%', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: 8 }}>
        <div style={{ width: 55, height: 7, borderRadius: 3, background: '#fafafa' }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {[30, 36, 28].map((w, i) => <div key={i} style={{ width: w, height: 5, borderRadius: 2, background: '#333' }} />)}
        </div>
      </div>
      <div>
        <div style={{ width: 30, height: 6, borderRadius: 2, background: '#f59e0b', marginBottom: 8 }} />
        <div style={{ width: 100, height: 18, borderRadius: 4, background: '#fafafa', marginBottom: 4 }} />
        <div style={{ width: 70, height: 18, borderRadius: 4, background: '#f59e0b' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[70, 85, 60, 75].map((w, i) => (
          <div key={i} style={{ width: `${w}%`, height: 5, borderRadius: 2, background: i % 2 === 0 ? '#222' : '#1c1c1c' }} />
        ))}
      </div>
    </div>
  );
}

const PREVIEWS = { midnight: MidnightPreview, aurora: AuroraPreview, ember: EmberPreview };

export default function TemplatePicker() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => setSelected(id);

  const handlePreview = () => {
    if (!selected) return;
    navigate(`/preview?template=${selected}`);
  };

  return (
    <div className="min-h-screen bg-[#030716] text-white px-10 py-16" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs font-bold tracking-[4px] uppercase text-indigo-500 mb-3">Step 2 of 3</p>
        <h1
          className="font-black mb-4 bg-gradient-to-br from-white to-[#818cf8] bg-clip-text text-transparent"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
        >
          Choose Your Template
        </h1>
        <p className="text-slate-500 text-lg">Pick a style that represents you best</p>
      </div>

      {/* Template Grid */}
      <div
        className="grid gap-7 max-w-[1100px] mx-auto mb-14"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
      >
        {TEMPLATES.map(tmpl => {
          const Preview = PREVIEWS[tmpl.id];
          const isSelected = selected === tmpl.id;
          return (
            <div
              key={tmpl.id}
              className={`rounded-[20px] border-2 bg-[#0a0e1a] p-7 cursor-pointer transition-all duration-300 relative overflow-hidden
                ${isSelected
                  ? 'border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.2)]'
                  : 'border-[#1e2a4a] hover:border-indigo-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(99,102,241,0.2)]'
                }`}
              onClick={() => handleSelect(tmpl.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleSelect(tmpl.id)}
              aria-label={`Select ${tmpl.name} template`}
            >
              {/* Selection checkmark */}
              <div className={`absolute top-4 right-4 w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-sm transition-opacity duration-200 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                ✓
              </div>

              {/* Mini preview */}
              <div className="rounded-xl overflow-hidden mb-6 h-[180px]">
                <Preview />
              </div>

              <div className="text-[22px] font-extrabold mb-1.5">{tmpl.name}</div>
              <div className="text-sm text-slate-500 mb-5 leading-relaxed">{tmpl.description}</div>

              {/* Palette swatches */}
              <div className="flex gap-2">
                {tmpl.palette.map(c => (
                  <div key={c} className="w-7 h-7 rounded-full border-2 border-white/10" style={{ background: c }} title={c} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] text-[15px] font-bold cursor-pointer transition-all duration-200 bg-transparent border border-[#1e2a4a] text-slate-400 hover:border-indigo-500 hover:text-[#818cf8]"
          onClick={() => navigate(-1)}
        >
          ← Back to Editor
        </button>
        <button
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] text-[15px] font-bold cursor-pointer transition-all duration-200 bg-gradient-to-br from-indigo-500 to-violet-500 text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(99,102,241,0.4)] disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
          onClick={handlePreview}
          disabled={!selected}
        >
          Preview Portfolio →
        </button>
      </div>
    </div>
  );
}
