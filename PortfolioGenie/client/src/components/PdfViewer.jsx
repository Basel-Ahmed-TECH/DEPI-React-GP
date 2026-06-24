import { useState } from 'react'

export default function PdfViewer() {
  const templates = [
    { name: 'CV Template 1', url: '/templates/cv1.pdf' },
    { name: 'CV Template 2', url: '/templates/cv2.pdf' },
    { name: 'CV Template 3', url: '/templates/cv3.pdf' },
  ]

  const [activePdf, setActivePdf] = useState(templates[0].url)

  return (
    <div>
      <h1>PDF Template Viewer</h1>
      
      <div>
        {templates.map((template) => (
          <button
            key={template.url}
            onClick={() => setActivePdf(template.url)}
            style={{ marginRight: '10px' }}
          >
            {template.name}
          </button>
        ))}
      </div>

      <br />

      <iframe
        src={activePdf}
        width="100%"
        height="600px"
        title="PDF Viewer"
      />
    </div>
  )
}