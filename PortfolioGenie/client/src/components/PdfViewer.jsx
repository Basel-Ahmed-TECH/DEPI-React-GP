import { useEffect, useRef } from 'react';
import { FiX, FiDownload, FiExternalLink } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';

/**
 * PdfViewer
 * A modal that renders a print-ready HTML preview of the portfolio data,
 * and lets the user download it as a PDF via the browser's print dialog.
 *
 * Props:
 *   portfolio  – { title, github_username, data: { personalInfo, aboutMe, skills, services, projects, experience, education, contact } }
 *   onClose    – () => void
 */
export default function PdfViewer({ portfolio, onClose }) {
  const iframeRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const d = portfolio?.data ?? {};
  const p = d.personalInfo ?? {};

  // Build the HTML document rendered inside the iframe
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${portfolio?.title ?? 'Portfolio'}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 13px;
    color: #1a1a2e;
    background: #fff;
    padding: 36px 44px;
    line-height: 1.6;
  }
  /* ── header ── */
  .header { border-bottom: 3px solid #7c3aed; padding-bottom: 18px; margin-bottom: 22px; }
  .header h1 { font-size: 26px; font-weight: 800; color: #1a1a2e; }
  .header .title { font-size: 14px; color: #7c3aed; font-weight: 600; margin-top: 2px; }
  .header .meta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 10px; font-size: 12px; color: #555; }
  .header .meta a { color: #7c3aed; text-decoration: none; }
  /* ── sections ── */
  .section { margin-bottom: 22px; }
  .section-title {
    font-size: 13px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.08em; color: #7c3aed;
    border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 12px;
  }
  /* about */
  .about p { color: #374151; }
  /* skills */
  .tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag {
    background: #f3f0ff; color: #6d28d9; border: 1px solid #ddd6fe;
    border-radius: 20px; padding: 2px 10px; font-size: 11px; font-weight: 600;
  }
  /* services */
  .services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .service-item { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 6px 12px; font-size: 12px; }
  /* projects */
  .project { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 10px; }
  .project-name { font-weight: 700; font-size: 14px; color: #111; }
  .project-links { display: inline-flex; gap: 10px; margin-left: 10px; }
  .project-links a { font-size: 11px; color: #7c3aed; }
  .project-desc { color: #555; font-size: 12px; margin-top: 4px; }
  /* experience / education */
  .entry { border-left: 3px solid #7c3aed; padding-left: 12px; margin-bottom: 12px; }
  .entry-header { display: flex; justify-content: space-between; align-items: baseline; }
  .entry-role { font-weight: 700; }
  .entry-org { color: #7c3aed; font-size: 12px; }
  .entry-dates { font-size: 11px; color: #888; }
  .entry-desc { font-size: 12px; color: #555; margin-top: 4px; }
  /* contact */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; }
  .contact-item span { color: #7c3aed; font-weight: 600; margin-right: 6px; }
  /* print */
  @media print {
    body { padding: 20px; }
    .project, .entry { page-break-inside: avoid; }
  }
</style>
</head>
<body>

<div class="header">
  <h1>${p.fullName || portfolio?.title || 'Portfolio'}</h1>
  ${p.professionalTitle ? `<div class="title">${p.professionalTitle}</div>` : ''}
  <div class="meta">
    ${p.email    ? `<span>✉ <a href="mailto:${p.email}">${p.email}</a></span>` : ''}
    ${p.location ? `<span>📍 ${p.location}</span>` : ''}
    ${p.github   ? `<span>⌥ <a href="${p.github}" target="_blank">GitHub</a></span>` : ''}
    ${p.linkedin ? `<span>in <a href="${p.linkedin}" target="_blank">LinkedIn</a></span>` : ''}
  </div>
</div>

${d.aboutMe ? `
<div class="section about">
  <div class="section-title">About Me</div>
  <p>${d.aboutMe.replace(/\n/g, '<br/>')}</p>
</div>` : ''}

${d.skills?.length ? `
<div class="section">
  <div class="section-title">Skills</div>
  <div class="tags">${d.skills.map(s => `<span class="tag">${s}</span>`).join('')}</div>
</div>` : ''}

${d.services?.filter(Boolean).length ? `
<div class="section">
  <div class="section-title">Services</div>
  <div class="services-grid">${d.services.filter(Boolean).map(s => `<div class="service-item">• ${s}</div>`).join('')}</div>
</div>` : ''}

${d.projects?.length ? `
<div class="section">
  <div class="section-title">Projects</div>
  ${d.projects.map(proj => `
  <div class="project">
    <div>
      <span class="project-name">${proj.name}</span>
      <span class="project-links">
        ${proj.repoUrl ? `<a href="${proj.repoUrl}">GitHub ↗</a>` : ''}
        ${proj.liveUrl ? `<a href="${proj.liveUrl}">Live ↗</a>` : ''}
      </span>
    </div>
    ${proj.description ? `<div class="project-desc">${proj.description}</div>` : ''}
    ${proj.technologies?.length ? `<div class="tags" style="margin-top:6px">${proj.technologies.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
  </div>`).join('')}
</div>` : ''}

${d.experience?.filter(e => e.company || e.role).length ? `
<div class="section">
  <div class="section-title">Experience</div>
  ${d.experience.filter(e => e.company || e.role).map(exp => `
  <div class="entry">
    <div class="entry-header">
      <div>
        <div class="entry-role">${exp.role || ''}</div>
        <div class="entry-org">${exp.company || ''}</div>
      </div>
      <div class="entry-dates">${exp.startDate || ''}${exp.endDate ? ` – ${exp.endDate}` : ''}</div>
    </div>
    ${exp.description ? `<div class="entry-desc">${exp.description}</div>` : ''}
  </div>`).join('')}
</div>` : ''}

${d.education?.filter(e => e.institution || e.degree).length ? `
<div class="section">
  <div class="section-title">Education</div>
  ${d.education.filter(e => e.institution || e.degree).map(edu => `
  <div class="entry">
    <div class="entry-header">
      <div>
        <div class="entry-role">${edu.degree || ''}${edu.field ? ` in ${edu.field}` : ''}</div>
        <div class="entry-org">${edu.institution || ''}</div>
      </div>
      <div class="entry-dates">${edu.startDate || ''}${edu.endDate ? ` – ${edu.endDate}` : ''}</div>
    </div>
    ${edu.description ? `<div class="entry-desc">${edu.description}</div>` : ''}
  </div>`).join('')}
</div>` : ''}

${(d.contact?.email || d.contact?.phone || d.contact?.github || d.contact?.linkedin) ? `
<div class="section">
  <div class="section-title">Contact</div>
  <div class="contact-grid">
    ${d.contact?.email    ? `<div class="contact-item"><span>Email</span>${d.contact.email}</div>` : ''}
    ${d.contact?.phone    ? `<div class="contact-item"><span>Phone</span>${d.contact.phone}</div>` : ''}
    ${d.contact?.location ? `<div class="contact-item"><span>Location</span>${d.contact.location}</div>` : ''}
    ${d.contact?.github   ? `<div class="contact-item"><span>GitHub</span>${d.contact.github}</div>` : ''}
    ${d.contact?.linkedin ? `<div class="contact-item"><span>LinkedIn</span>${d.contact.linkedin}</div>` : ''}
  </div>
</div>` : ''}

</body>
</html>`;

  function handlePrint() {
    iframeRef.current?.contentWindow?.print();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0d1117] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">

        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <BsStars size={14} className="text-white" />
            </div>
            <span className="font-bold text-white text-sm truncate max-w-xs">
              {portfolio?.title ?? 'Portfolio Preview'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition-opacity"
            >
              <FiDownload size={13} />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* iframe preview */}
        <iframe
          ref={iframeRef}
          srcDoc={html}
          title="Portfolio PDF Preview"
          className="w-full flex-1 bg-white"
          style={{ minHeight: '600px' }}
        />
      </div>
    </div>
  );
}