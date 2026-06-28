function AuroraTemplate({ data }) {
  const p = data?.personalInfo || {};
  const c = data?.contact || {};
  const name = p.fullName || 'Your Name';
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const btnWhite   = 'inline-flex items-center gap-2 px-[22px] py-[10px] rounded-lg text-sm font-semibold no-underline transition-all duration-200 bg-white text-[#0d9488] hover:bg-[#f0fdf4] hover:-translate-y-px';
  const btnOutline = 'inline-flex items-center gap-2 px-[22px] py-[10px] rounded-lg text-sm font-semibold no-underline transition-all duration-200 border-2 border-white/50 text-white bg-transparent hover:bg-white/10';

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f1f5f9', color: '#0f172a', minHeight: '100vh' }}>

      {/* NAV */}
      <nav className="sticky top-0 z-[100] bg-white border-b border-[#e2e8f0] px-12 h-16 flex items-center justify-between shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        <span className="font-black text-lg text-[#0d9488]">{name.split(' ')[0]}</span>
        <ul className="flex gap-7 list-none m-0 p-0">
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map(l => (
            <li key={l}>
              <a href={`#au-${l.toLowerCase()}`} className="text-slate-500 no-underline text-sm font-medium transition-colors hover:text-[#0d9488]">{l}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section className="px-12 py-[90px] flex items-center gap-[60px] flex-wrap" style={{ background: 'linear-gradient(135deg, #0d9488 0%, #0891b2 60%, #6366f1 100%)', color: '#fff' }}>
        <div className="flex-1 min-w-[280px]">
          <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-[13px] font-semibold mb-5 tracking-[0.5px]">
            Available for opportunities
          </div>
          <h1 className="font-black leading-[1.05] mb-3.5" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>{name}</h1>
          <p className="text-[20px] font-normal mb-3" style={{ opacity: 0.85 }}>{p.professionalTitle || 'Developer'}</p>
          <p className="text-sm mb-8" style={{ opacity: 0.7 }}>{[p.location, p.email].filter(Boolean).join('  ·  ')}</p>
          <div className="flex gap-3.5 flex-wrap">
            {p.github   && <a className={btnWhite}   href={p.github}   target="_blank" rel="noreferrer">GitHub ↗</a>}
            {p.linkedin && <a className={btnOutline} href={p.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
            {p.email    && <a className={btnOutline} href={`mailto:${p.email}`}>Email Me</a>}
          </div>
        </div>
        <div className="w-[160px] h-[160px] rounded-full flex items-center justify-center text-[56px] font-black text-white flex-shrink-0 border-4 border-white/40" style={{ background: 'rgba(255,255,255,0.2)' }}>
          {initials}
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto py-[72px] px-12">

        {/* ABOUT + SKILLS */}
        <div className="grid gap-8 mb-8" id="au-about" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="bg-white rounded-2xl p-8 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-[#0d9488] mb-1.5">About</p>
            <h2 className="text-2xl font-extrabold text-[#0f172a] mb-6">Who I Am</h2>
            <p className="text-base leading-[1.8] text-slate-500">{data?.aboutMe || 'No bio provided.'}</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-[0_1px_4px_rgba(0,0,0,0.06)]" id="au-skills">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-[#0d9488] mb-1.5">Skills</p>
            <h2 className="text-2xl font-extrabold text-[#0f172a] mb-6">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {(data?.skills || []).map(s => (
                <span key={s} className="px-3.5 py-1.5 rounded-full bg-[#f0fdfa] border-[1.5px] border-[#99f6e4] text-[#0d9488] text-[13px] font-semibold transition-all hover:bg-[#0d9488] hover:text-white hover:border-[#0d9488] cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* PROJECTS */}
        {(data?.projects || []).length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-[0_1px_4px_rgba(0,0,0,0.06)] mb-8" id="au-projects">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-[#0d9488] mb-1.5">Work</p>
            <h2 className="text-2xl font-extrabold text-[#0f172a] mb-6">Featured Projects</h2>
            <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {data.projects.map((proj, i) => (
                <div key={i} className="bg-white rounded-[14px] border-t-4 border-[#0d9488] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(13,148,136,0.12)]">
                  <div className="text-[17px] font-bold text-[#0f172a] mb-2">{proj.name}</div>
                  <p className="text-sm text-slate-500 leading-[1.7] mb-3.5">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    {(proj.technologies || []).map(t => (
                      <span key={t} className="text-[11px] px-2.5 py-[3px] rounded bg-[#f0fdf4] text-[#16a34a] font-semibold">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-3.5">
                    {proj.repoUrl && <a className="text-[13px] text-[#0d9488] no-underline font-bold hover:text-[#115e59]" href={proj.repoUrl} target="_blank" rel="noreferrer">Repo ↗</a>}
                    {proj.liveUrl && <a className="text-[13px] text-[#0d9488] no-underline font-bold hover:text-[#115e59]" href={proj.liveUrl} target="_blank" rel="noreferrer">Live ↗</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE + EDUCATION */}
        <div className="grid gap-8 mb-8" id="au-experience" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="bg-white rounded-2xl p-8 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-[#0d9488] mb-1.5">Career</p>
            <h2 className="text-2xl font-extrabold text-[#0f172a] mb-6">Experience</h2>
            <div className="flex flex-col gap-6">
              {(data?.experience || []).filter(e => e.company || e.role).map((exp, i) => (
                <div key={i} className="pl-5 border-l-2 border-[#e2e8f0] relative">
                  <div className="absolute -left-[5px] top-[6px] w-2 h-2 rounded-full bg-[#0d9488]" />
                  <div className="text-base font-bold text-[#0f172a] mb-0.5">{exp.role}</div>
                  <div className="text-sm text-[#0d9488] font-semibold mb-0.5">{exp.company}</div>
                  <div className="text-[13px] text-slate-400 mb-1.5">{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</div>
                  {exp.description && <p className="text-sm text-slate-500 leading-[1.6]">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-[#0d9488] mb-1.5">Education</p>
            <h2 className="text-2xl font-extrabold text-[#0f172a] mb-6">Background</h2>
            <div className="flex flex-col gap-6">
              {(data?.education || []).filter(e => e.institution || e.degree).map((edu, i) => (
                <div key={i} className="pl-5 border-l-2 border-[#e2e8f0] relative">
                  <div className="absolute -left-[5px] top-[6px] w-2 h-2 rounded-full bg-[#0d9488]" />
                  <div className="text-base font-bold text-[#0f172a] mb-0.5">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                  <div className="text-sm text-[#0d9488] font-semibold mb-0.5">{edu.institution}</div>
                  <div className="text-[13px] text-slate-400">{edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SERVICES */}
        {(data?.services || []).length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-[0_1px_4px_rgba(0,0,0,0.06)] mb-8">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-[#0d9488] mb-1.5">Offerings</p>
            <h2 className="text-2xl font-extrabold text-[#0f172a] mb-6">Services</h2>
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
              {data.services.map((s, i) => (
                <div key={i} className="border border-[#99f6e4] rounded-xl p-[22px] transition-all hover:border-[#0d9488] hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #f0fdfa, #f0f9ff)' }}>
                  <div className="text-2xl font-black text-[#99f6e4] mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <div className="text-sm font-semibold text-[#0f172a]">{s}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT */}
        <div className="rounded-2xl p-12 text-center mt-4" id="au-contact" style={{ background: 'linear-gradient(135deg, #0d9488, #0891b2)' }}>
          <div className="text-[28px] font-extrabold text-white mb-2">Let's Work Together</div>
          <p className="mb-8 text-base" style={{ color: 'rgba(255,255,255,0.75)' }}>Open to opportunities and collaborations</p>
          <div className="flex flex-wrap justify-center gap-4">
            {c.email    && <div className="border border-white/25 rounded-[10px] px-6 py-4 text-left min-w-[160px]" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}><div className="text-[11px] font-bold tracking-[3px] uppercase mb-1" style={{ opacity: 0.7 }}>Email</div><div><a className="text-white no-underline font-semibold" href={`mailto:${c.email}`}>{c.email}</a></div></div>}
            {c.github   && <div className="border border-white/25 rounded-[10px] px-6 py-4 text-left min-w-[160px]" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}><div className="text-[11px] font-bold tracking-[3px] uppercase mb-1" style={{ opacity: 0.7 }}>GitHub</div><div><a className="text-white no-underline font-semibold" href={c.github} target="_blank" rel="noreferrer">{c.github.replace('https://github.com/', '@')}</a></div></div>}
            {c.linkedin && <div className="border border-white/25 rounded-[10px] px-6 py-4 text-left min-w-[160px]" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}><div className="text-[11px] font-bold tracking-[3px] uppercase mb-1" style={{ opacity: 0.7 }}>LinkedIn</div><div><a className="text-white no-underline font-semibold" href={c.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div></div>}
            {c.phone    && <div className="border border-white/25 rounded-[10px] px-6 py-4 text-left min-w-[160px]" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}><div className="text-[11px] font-bold tracking-[3px] uppercase mb-1" style={{ opacity: 0.7 }}>Phone</div><div className="text-white font-semibold">{c.phone}</div></div>}
          </div>
        </div>

      </main>

      <footer className="text-center py-10 text-slate-400 text-sm">
        Built with PortfolioGenie · {name}
      </footer>
    </div>
  );
}

export default AuroraTemplate;
