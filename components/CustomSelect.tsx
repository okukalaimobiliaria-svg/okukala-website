'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
}

export function CustomSelect({ value, onChange, options, placeholder = 'Selecionar' }: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selected = options.find((o) => o.value === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-sm text-left transition-all duration-200 cursor-pointer ${
          selected
            ? 'border-gray-200 bg-white font-medium text-[#03113E]'
            : 'border-gray-200 bg-white font-normal text-gray-400'
        } hover:border-[#0A43D8]/40 hover:shadow-sm focus:outline-none focus:ring-[3px] focus:ring-[#0A43D8]/10`}
      >
        <span className={selected ? '' : 'text-gray-400'}>{selected ? selected.label : placeholder}</span>
        <svg
          className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg shadow-black/5"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between px-4 py-3 text-sm text-left transition-all duration-150 cursor-pointer ${
                  value === option.value
                    ? 'bg-[#0A43D8]/10 font-semibold text-[#0A43D8]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#03113E]'
                }`}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <svg className="h-4 w-4 text-[#0A43D8]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
