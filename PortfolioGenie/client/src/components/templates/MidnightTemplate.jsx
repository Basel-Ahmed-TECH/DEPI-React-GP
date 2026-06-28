function MidnightTemplate({ data }) {
  const p = data?.personalInfo || {};
  const c = data?.contact || {};
  const name = p.fullName || 'Your Name';
  const title = p.professionalTitle || 'Developer';

  const btnPrimary = 'inline-flex items-center gap-2 px-[26px] py-[11px] rounded-lg text-sm font-semibold no-underline transition-all duration-200 bg-gradient-to-br from-indigo-500 to-violet-500 text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(99,102,241,0.35)]';
  const btnGhost   = 'inline-flex items-center gap-2 px-[26px] py-[11px] rounded-lg text-sm font-semibold no-underline transition-all duration-200 border border-[#1e2a4a] text-slate-400 bg-transparent hover:border-indigo-500 hover:text-[#818cf8]';
  const hr         = { border: 'none', borderTop: '1px solid #1e2a4a', margin: 0 };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#070c1b', color: '#e2e8f0', minHeight: '100vh' }}>

      {/* NAV */}
      <nav className="sticky top-0 z-[100] backdrop-blur-xl border-b border-[#1e2a4a] px-12 h-16 flex items-center justify-between" style={{ background: 'rgba(7,12,27,0.88)' }}>
        <span className="font-black text-lg bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent">
          {name.split(' ')[0]}
        </span>
        <ul className="flex gap-7 list-none m-0 p-0">
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map(l => (
            <li key={l}>
              <a href={`#mn-${l.toLowerCase()}`} className="text-slate-400 no-underline text-sm font-medium transition-colors hover:text-[#818cf8]">{l}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section className="pt-24 pb-20 px-12 text-center relative overflow-hidden">
        <div className="absolute -top-[150px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
        <p className="text-[13px] font-bold tracking-[4px] uppercase text-indigo-500 mb-[18px] relative">Welcome to my portfolio</p>
        <h1 className="font-black leading-[1.05] bg-gradient-to-br from-white via-[#818cf8] to-[#a78bfa] bg-clip-text text-transparent mb-[18px] relative" style={{ fontSize: 'clamp(42px, 7vw, 88px)' }}>
          {name}
        </h1>
        <p className="text-[22px] text-slate-400 font-normal mb-3.5">{title}</p>
        <div className="flex items-center justify-center gap-6 text-slate-500 text-sm mb-10 flex-wrap">
          {p.location && <span>📍 {p.location}</span>}
          {p.email && <span>✉ {p.email}</span>}
        </div>
        <div className="flex justify-center gap-3.5 flex-wrap">
          {p.github   && <a className={btnPrimary} href={p.github}   target="_blank" rel="noreferrer">GitHub ↗</a>}
          {p.linkedin && <a className={btnGhost}   href={p.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
          {p.email    && <a className={btnGhost}   href={`mailto:${p.email}`}>Email Me</a>}
        </div>
      </section>

      <hr style={hr} />

      {/* ABOUT + SKILLS */}
      <div className="max-w-[1200px] mx-auto py-[72px] px-12" id="mn-about">
        <div className="grid gap-16 items-start" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
          <div>
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-indigo-500 mb-2">About</p>
            <h2 className="text-[32px] font-extrabold text-white mb-10">Who I Am</h2>
            <p className="text-[17px] leading-[1.8] text-slate-400">{data?.aboutMe || 'No bio provided.'}</p>
          </div>
          <div id="mn-skills">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-indigo-500 mb-2">Skills</p>
            <h2 className="text-[32px] font-extrabold text-white mb-10">Tech Stack</h2>
            <div className="flex flex-wrap gap-2.5">
              {(data?.skills || []).map(s => (
                <span key={s} className="px-4 py-[7px] rounded-full bg-[rgba(99,102,241,0.12)] border border-[rgba(99,102,241,0.3)] text-[#a5b4fc] text-[13px] font-medium transition-all hover:bg-[rgba(99,102,241,0.25)] hover:border-indigo-500 hover:-translate-y-px cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr style={hr} />

      {/* PROJECTS */}
      {(data?.projects || []).length > 0 && (
        <div className="max-w-[1200px] mx-auto py-[72px] px-12" id="mn-projects">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-indigo-500 mb-2">Work</p>
          <h2 className="text-[32px] font-extrabold text-white mb-10">Featured Projects</h2>
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {data.projects.map((proj, i) => (
              <div key={i} className="group bg-[#0f1629] border border-[#1e2a4a] rounded-2xl p-7 transition-all duration-300 relative overflow-hidden hover:border-indigo-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(99,102,241,0.15)]">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-lg font-bold text-white mb-2.5">{proj.name}</div>
                <p className="text-sm text-slate-500 leading-[1.7] mb-[18px]">{proj.description}</p>
                <div className="flex flex-wrap gap-2 mb-[18px]">
                  {(proj.technologies || []).map(t => (
                    <span key={t} className="text-[11px] px-2.5 py-1 rounded bg-[rgba(99,102,241,0.1)] text-[#818cf8] font-medium">{t}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {proj.repoUrl && <a className="text-[13px] text-indigo-500 no-underline font-semibold transition-colors hover:text-[#a78bfa]" href={proj.repoUrl} target="_blank" rel="noreferrer">Repo ↗</a>}
                  {proj.liveUrl && <a className="text-[13px] text-indigo-500 no-underline font-semibold transition-colors hover:text-[#a78bfa]" href={proj.liveUrl} target="_blank" rel="noreferrer">Live ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <hr style={hr} />

      {/* EXPERIENCE + EDUCATION */}
      <div className="max-w-[1200px] mx-auto py-[72px] px-12" id="mn-experience">
        <div className="grid gap-16 items-start" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-indigo-500 mb-2">Career</p>
            <h2 className="text-[32px] font-extrabold text-white mb-10">Experience</h2>
            <div className="flex flex-col gap-8">
              {(data?.experience || []).filter(e => e.company || e.role).map((exp, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-indigo-500 mt-[5px] shadow-[0_0_0_4px_rgba(99,102,241,0.2)]" />
                  <div>
                    <div className="text-[17px] font-bold text-white mb-1">{exp.role}</div>
                    <div className="text-sm text-indigo-500 font-semibold mb-1">{exp.company}</div>
                    <div className="text-[13px] text-[#475569] mb-2">{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</div>
                    {exp.description && <p className="text-sm text-slate-500 leading-[1.7]">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-indigo-500 mb-2">Education</p>
            <h2 className="text-[32px] font-extrabold text-white mb-10">Background</h2>
            <div className="flex flex-col gap-8">
              {(data?.education || []).filter(e => e.institution || e.degree).map((edu, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-indigo-500 mt-[5px] shadow-[0_0_0_4px_rgba(99,102,241,0.2)]" />
                  <div>
                    <div className="text-[17px] font-bold text-white mb-1">{edu.degree} {edu.field && `in ${edu.field}`}</div>
                    <div className="text-sm text-indigo-500 font-semibold mb-1">{edu.institution}</div>
                    <div className="text-[13px] text-[#475569]">{edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      {(data?.services || []).length > 0 && (
        <>
          <hr style={hr} />
          <div className="max-w-[1200px] mx-auto py-[72px] px-12">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-indigo-500 mb-2">Offerings</p>
            <h2 className="text-[32px] font-extrabold text-white mb-10">Services</h2>
            <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
              {data.services.map((s, i) => (
                <div key={i} className="bg-[#0f1629] border border-[#1e2a4a] rounded-xl p-6 transition-all hover:border-indigo-500 hover:bg-[rgba(99,102,241,0.06)]">
                  <div className="text-[32px] font-black text-[#1e2a4a] mb-2.5">{String(i + 1).padStart(2, '0')}</div>
                  <div className="text-[15px] font-semibold text-[#e2e8f0]">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* CONTACT */}
      <hr style={hr} />
      <div className="max-w-[1200px] mx-auto py-[72px] px-12" id="mn-contact">
        <p className="text-[11px] font-bold tracking-[4px] uppercase text-indigo-500 mb-2">Contact</p>
        <h2 className="text-[32px] font-extrabold text-white mb-10">Get In Touch</h2>
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {c.email    && <div className="bg-[#0f1629] border border-[#1e2a4a] rounded-xl p-6 text-center transition-all hover:border-indigo-500 hover:-translate-y-0.5"><div className="text-[11px] font-bold tracking-[3px] uppercase text-[#475569] mb-2">Email</div><div className="text-[15px] text-[#e2e8f0] break-all"><a className="text-[#818cf8] no-underline" href={`mailto:${c.email}`}>{c.email}</a></div></div>}
          {c.github   && <div className="bg-[#0f1629] border border-[#1e2a4a] rounded-xl p-6 text-center transition-all hover:border-indigo-500 hover:-translate-y-0.5"><div className="text-[11px] font-bold tracking-[3px] uppercase text-[#475569] mb-2">GitHub</div><div className="text-[15px] text-[#e2e8f0] break-all"><a className="text-[#818cf8] no-underline" href={c.github} target="_blank" rel="noreferrer">{c.github.replace('https://github.com/', '@')}</a></div></div>}
          {c.linkedin && <div className="bg-[#0f1629] border border-[#1e2a4a] rounded-xl p-6 text-center transition-all hover:border-indigo-500 hover:-translate-y-0.5"><div className="text-[11px] font-bold tracking-[3px] uppercase text-[#475569] mb-2">LinkedIn</div><div className="text-[15px] text-[#e2e8f0] break-all"><a className="text-[#818cf8] no-underline" href={c.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div></div>}
          {c.phone    && <div className="bg-[#0f1629] border border-[#1e2a4a] rounded-xl p-6 text-center transition-all hover:border-indigo-500 hover:-translate-y-0.5"><div className="text-[11px] font-bold tracking-[3px] uppercase text-[#475569] mb-2">Phone</div><div className="text-[15px] text-[#e2e8f0]">{c.phone}</div></div>}
          {c.location && <div className="bg-[#0f1629] border border-[#1e2a4a] rounded-xl p-6 text-center transition-all hover:border-indigo-500 hover:-translate-y-0.5"><div className="text-[11px] font-bold tracking-[3px] uppercase text-[#475569] mb-2">Location</div><div className="text-[15px] text-[#e2e8f0]">{c.location}</div></div>}
        </div>
      </div>

      <footer className="text-center p-12 text-[#334155] text-sm border-t border-[#1e2a4a]">
        Built with PortfolioGenie · {name}
      </footer>
    </div>
  );
}

export default MidnightTemplate;
