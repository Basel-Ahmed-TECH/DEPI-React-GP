function EmberTemplate({ data }) {
  const p = data?.personalInfo || {};
  const c = data?.contact || {};
  const name = p.fullName || 'Your Name';
  const [first, ...rest] = name.split(' ');

  const divider = <div className="h-px bg-[#222] mx-16" />;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#111', color: '#fafafa', minHeight: '100vh' }}>

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-16 py-5 border-b border-[#222]">
        <span className="text-base font-extrabold tracking-tight text-[#fafafa]">{name}</span>
        <div className="flex gap-5">
          {p.github   && <a href={p.github}   target="_blank" rel="noreferrer" className="text-[#737373] no-underline text-[13px] font-medium transition-colors hover:text-[#f59e0b]">GitHub</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noreferrer" className="text-[#737373] no-underline text-[13px] font-medium transition-colors hover:text-[#f59e0b]">LinkedIn</a>}
          {p.email    && <a href={`mailto:${p.email}`}         className="text-[#737373] no-underline text-[13px] font-medium transition-colors hover:text-[#f59e0b]">{p.email}</a>}
        </div>
      </div>

      {/* HERO */}
      <section className="pt-[120px] pb-20 px-16 max-w-[1000px]">
        <p className="text-[13px] font-bold tracking-[5px] uppercase text-amber-400 mb-6">Portfolio · {new Date().getFullYear()}</p>
        <h1 className="font-black leading-[0.95] tracking-[-3px] mb-6 text-[#fafafa]" style={{ fontSize: 'clamp(52px, 8vw, 100px)' }}>
          {first}<br />
          <span className="text-amber-400">{rest.join(' ') || 'Developer'}</span>
        </h1>
        <p className="text-lg text-[#737373] font-normal max-w-[480px] leading-[1.6] mb-9">
          {p.professionalTitle || 'Developer'}{p.location ? ` · Based in ${p.location}` : ''}
        </p>
        <div className="flex gap-8 flex-wrap">
          {p.github   && <a href={p.github}   target="_blank" rel="noreferrer" className="text-[#525252] text-sm no-underline transition-colors hover:text-amber-400">↗ GitHub</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noreferrer" className="text-[#525252] text-sm no-underline transition-colors hover:text-amber-400">↗ LinkedIn</a>}
          {p.email    && <a href={`mailto:${p.email}`}         className="text-[#525252] text-sm no-underline transition-colors hover:text-amber-400">✉ {p.email}</a>}
        </div>
      </section>

      {divider}

      {/* ABOUT */}
      <section className="py-[72px] px-16 max-w-[1100px]" id="em-about">
        <div className="flex items-center gap-5 mb-12">
          <span className="text-[11px] font-bold tracking-[4px] text-[#404040]">01</span>
          <div className="flex-1 h-px bg-[#222]" />
          <span className="text-[11px] font-bold tracking-[4px] uppercase text-amber-400">About</span>
        </div>
        <h2 className="text-[40px] font-black tracking-[-1.5px] text-[#fafafa] mb-8">About Me</h2>
        <p className="text-[18px] leading-[1.85] text-[#a3a3a3] max-w-[700px]">{data?.aboutMe || 'No bio provided.'}</p>
      </section>

      {/* SKILLS */}
      {(data?.skills || []).length > 0 && (
        <>
          {divider}
          <section className="py-[72px] px-16 max-w-[1100px]" id="em-skills">
            <div className="flex items-center gap-5 mb-12">
              <span className="text-[11px] font-bold tracking-[4px] text-[#404040]">02</span>
              <div className="flex-1 h-px bg-[#222]" />
              <span className="text-[11px] font-bold tracking-[4px] uppercase text-amber-400">Skills</span>
            </div>
            <h2 className="text-[40px] font-black tracking-[-1.5px] text-[#fafafa] mb-8">Tech Stack</h2>
            <div className="flex flex-wrap gap-2.5">
              {data.skills.map(s => (
                <span key={s} className="px-[18px] py-2 rounded border border-[#2a2a2a] text-[#a3a3a3] text-[13px] font-medium transition-all bg-transparent cursor-default hover:border-amber-400 hover:text-amber-400" style={{ background: 'transparent' }}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        </>
      )}

      {/* PROJECTS */}
      {(data?.projects || []).length > 0 && (
        <>
          {divider}
          <section className="py-[72px] px-16 max-w-[1100px]" id="em-projects">
            <div className="flex items-center gap-5 mb-12">
              <span className="text-[11px] font-bold tracking-[4px] text-[#404040]">03</span>
              <div className="flex-1 h-px bg-[#222]" />
              <span className="text-[11px] font-bold tracking-[4px] uppercase text-amber-400">Work</span>
            </div>
            <h2 className="text-[40px] font-black tracking-[-1.5px] text-[#fafafa] mb-8">Projects</h2>
            <div className="flex flex-col">
              {data.projects.map((proj, i) => (
                <div key={i} className="group py-8 border-b border-[#1c1c1c] flex items-start gap-12 transition-all">
                  <span className="text-[11px] font-bold text-[#404040] min-w-[32px] pt-[5px]">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1">
                    <div className="text-[22px] font-bold text-[#fafafa] mb-2 transition-colors group-hover:text-amber-400">{proj.name}</div>
                    <p className="text-sm text-[#737373] leading-[1.7] mb-3.5">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3.5">
                      {(proj.technologies || []).map(t => (
                        <span key={t} className="text-[11px] px-2.5 py-[3px] rounded-[3px] bg-[#1c1c1c] text-[#737373] font-medium">{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {proj.repoUrl && <a className="text-[13px] text-amber-400 no-underline font-bold tracking-[0.5px]" href={proj.repoUrl} target="_blank" rel="noreferrer">REPO ↗</a>}
                      {proj.liveUrl && <a className="text-[13px] text-amber-400 no-underline font-bold tracking-[0.5px]" href={proj.liveUrl} target="_blank" rel="noreferrer">LIVE ↗</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* EXPERIENCE + EDUCATION */}
      {divider}
      <section className="py-[72px] px-16 max-w-[1100px]" id="em-experience">
        <div className="flex items-center gap-5 mb-12">
          <span className="text-[11px] font-bold tracking-[4px] text-[#404040]">04</span>
          <div className="flex-1 h-px bg-[#222]" />
          <span className="text-[11px] font-bold tracking-[4px] uppercase text-amber-400">Career</span>
        </div>
        <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <h2 className="text-[40px] font-black tracking-[-1.5px] text-[#fafafa] mb-8">Experience</h2>
            <div className="flex flex-col gap-9">
              {(data?.experience || []).filter(e => e.company || e.role).map((exp, i) => (
                <div key={i} className="pl-6 border-l-2 border-[#222] relative">
                  <div className="absolute -left-[5px] top-2 w-2 h-2 bg-amber-400 rounded-full" />
                  <div className="text-[17px] font-bold text-[#fafafa] mb-1">{exp.role}</div>
                  <div className="text-sm text-amber-400 font-semibold mb-1">{exp.company}</div>
                  <div className="text-[13px] text-[#525252] mb-2">{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</div>
                  {exp.description && <p className="text-sm text-[#737373] leading-[1.65]">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-[40px] font-black tracking-[-1.5px] text-[#fafafa] mb-8">Education</h2>
            <div className="flex flex-col gap-9">
              {(data?.education || []).filter(e => e.institution || e.degree).map((edu, i) => (
                <div key={i} className="pl-6 border-l-2 border-[#222] relative">
                  <div className="absolute -left-[5px] top-2 w-2 h-2 bg-amber-400 rounded-full" />
                  <div className="text-[17px] font-bold text-[#fafafa] mb-1">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                  <div className="text-sm text-amber-400 font-semibold mb-1">{edu.institution}</div>
                  <div className="text-[13px] text-[#525252]">{edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      {(data?.services || []).length > 0 && (
        <>
          {divider}
          <section className="py-[72px] px-16 max-w-[1100px]">
            <div className="flex items-center gap-5 mb-12">
              <span className="text-[11px] font-bold tracking-[4px] text-[#404040]">05</span>
              <div className="flex-1 h-px bg-[#222]" />
              <span className="text-[11px] font-bold tracking-[4px] uppercase text-amber-400">Services</span>
            </div>
            <h2 className="text-[40px] font-black tracking-[-1.5px] text-[#fafafa] mb-8">What I Do</h2>
            {/* Grid with 1px gap acting as border lines */}
            <div className="grid gap-px bg-[#1c1c1c] border border-[#1c1c1c] rounded-lg overflow-hidden" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
              {data.services.map((s, i) => (
                <div key={i} className="bg-[#111] p-8 transition-colors hover:bg-[#161616]">
                  <div className="text-[11px] font-bold tracking-[3px] text-amber-400 mb-3.5">{String(i + 1).padStart(2, '0')}</div>
                  <div className="text-base font-semibold text-[#e5e5e5] leading-[1.4]">{s}</div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* CONTACT */}
      <div className="py-[72px] px-16 border-t border-[#1c1c1c] bg-[#0a0a0a]" id="em-contact">
        <p className="font-black tracking-tight text-[#fafafa] mb-12 leading-[1.1]" style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-2px' }}>
          Let's build<br /><span className="text-amber-400">something great.</span>
        </p>
        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {c.email    && <div><div className="text-[11px] font-bold tracking-[4px] uppercase text-[#404040] mb-2">Email</div><div className="text-base font-semibold"><a className="text-amber-400 no-underline" href={`mailto:${c.email}`}>{c.email}</a></div></div>}
          {c.github   && <div><div className="text-[11px] font-bold tracking-[4px] uppercase text-[#404040] mb-2">GitHub</div><div className="text-base font-semibold"><a className="text-amber-400 no-underline" href={c.github} target="_blank" rel="noreferrer">{c.github.replace('https://github.com/', '@')}</a></div></div>}
          {c.linkedin && <div><div className="text-[11px] font-bold tracking-[4px] uppercase text-[#404040] mb-2">LinkedIn</div><div className="text-base font-semibold"><a className="text-amber-400 no-underline" href={c.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div></div>}
          {c.phone    && <div><div className="text-[11px] font-bold tracking-[4px] uppercase text-[#404040] mb-2">Phone</div><div className="text-base font-semibold text-[#fafafa]">{c.phone}</div></div>}
        </div>
      </div>

      <footer className="py-8 px-16 border-t border-[#1c1c1c] text-[#404040] text-[13px]">
        Built with PortfolioGenie · {name}
      </footer>
    </div>
  );
}

export default EmberTemplate;
