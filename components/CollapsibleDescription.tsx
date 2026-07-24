'use client'

import { useState } from 'react'

interface CollapsibleDescriptionProps {
  html: string
  maxLines?: number
}

export function CollapsibleDescription({ html, maxLines = 6 }: CollapsibleDescriptionProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <div
        className={`prose prose-lg prose-slate max-w-none text-gray-600 leading-relaxed ${
          expanded ? '' : `line-clamp-${maxLines}`
        }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-sm font-semibold text-[#0A43D8] hover:text-[#021a5c] transition-colors cursor-pointer"
      >
        {expanded ? 'Ver menos' : 'Ver mais'}
      </button>
    </div>
  )
}
