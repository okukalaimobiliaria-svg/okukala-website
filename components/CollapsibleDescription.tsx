'use client'

import { useState } from 'react'

interface CollapsibleDescriptionProps {
  html: string
  maxLines?: number
}

export function CollapsibleDescription({ html, maxLines = 5 }: CollapsibleDescriptionProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="max-w-3xl">
      <div
        className="prose prose-slate max-w-none text-sm leading-7 text-gray-600 sm:text-[15px]"
        style={{
          display: expanded ? 'block' : '-webkit-box',
          WebkitBoxOrient: expanded ? undefined : 'vertical',
          WebkitLineClamp: expanded ? undefined : maxLines,
          overflow: expanded ? 'visible' : 'hidden',
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#0A43D8] transition-colors hover:text-[#021a5c] cursor-pointer"
      >
        {expanded ? 'Ver menos' : 'Ver mais'}
      </button>
    </div>
  )
}
