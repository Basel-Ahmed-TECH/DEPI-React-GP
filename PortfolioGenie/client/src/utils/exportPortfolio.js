import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { getTemplate } from '../components/templates';

/**
 * Exports the portfolio as a standalone index.html inside a .zip file.
 * Tailwind CDN is injected so all Tailwind classes work without a build step.
 *
 * @param {object} data       - Portfolio data object
 * @param {string} templateId - 'midnight' | 'aurora' | 'ember'
 */
export async function exportPortfolio(data, templateId) {
  const tmpl = getTemplate(templateId);
  const Component = tmpl.component;

  // Server-render the template to static HTML
  const bodyHtml = renderToStaticMarkup(React.createElement(Component, { data }));

  const name  = data?.personalInfo?.fullName || 'Portfolio';
  const title = `${name} — Portfolio`;

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="Portfolio of ${name}" />

  <!-- Tailwind CSS (required for template styles) -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Inter font -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
  </style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

  const zip = new JSZip();
  zip.file('index.html', fullHtml);

  const blob     = await zip.generateAsync({ type: 'blob' });
  const fileName = `${name.replace(/\s+/g, '-').toLowerCase()}-portfolio.zip`;
  saveAs(blob, fileName);
}
