'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Clock, ArrowLeft, BookOpen, Share2, Copy, Check, MessageCircle } from 'lucide-react'
import { formatDate } from '@/lib/formatting'

interface BlogPostDetail {
  id: string
  titulo: string
  slug?: string | null
  resumo?: string | null
  dataDePublicacao?: string | null
  categoria?: string | null
  imagemDeCapa?: {
    url?: string | null
  } | null
  conteudo?: {
    html?: string | null
    text?: string | null
  } | null
}

export function BlogPostContent({ post, contentHtml }: { post: BlogPostDetail, contentHtml: string }) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  return (
    <main className="w-full bg-[#F8FAFC]">
      {/* Hero */}
      <section className="relative pt-10 pb-8 overflow-hidden">
        <div className="mx-auto w-full max-w-[1000px] px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0A43D8] hover:text-[#03113E] transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Voltar ao Blog
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#03113E] leading-[1.1] mb-6 font-montserrat">
              {post.titulo}
            </h1>
            <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#0A43D8]" />
                <span>{formatDate(post.dataDePublicacao || new Date().toISOString())}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-[#0A43D8]" />
                <span>Por OKUKALA</span>
              </div>
            </div>
          </div>

          <div className="relative h-[30rem] w-full overflow-hidden rounded-[2rem] shadow-xl">
            <Image
              src={post.imagemDeCapa?.url || '/Imagens/imovel1.png'}
              alt={post.titulo}
              fill
              className="object-cover"
              priority
            />
            {post.categoria && (
              <div className="absolute left-6 top-6">
                <span className="inline-block rounded-full bg-[#FFC800] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#03113E] shadow-lg">
                  {post.categoria}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-14 md:pb-20">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-8">
          <div className="rounded-3xl border border-gray-100 bg-white p-8 md:p-12 lg:p-16 shadow-lg shadow-gray-100/50">
            <article className="prose prose-lg prose-slate max-w-none
              prose-headings:font-montserrat prose-headings:font-extrabold prose-headings:text-[#03113E]
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-lg
              prose-a:text-[#0A43D8] prose-a:font-semibold hover:prose-a:underline
              prose-img:rounded-2xl prose-img:shadow-lg
            " dangerouslySetInnerHTML={{ __html: contentHtml }} />
            
            <div className="mt-16 pt-8 border-t border-gray-100">
              <h4 className="text-lg font-bold text-[#03113E] mb-6 flex items-center gap-2">
                <Share2 size={20} className="text-[#0A43D8]"/> Partilhe este artigo:
              </h4>
              <div className="flex flex-wrap gap-3">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1877F2] text-white text-sm font-semibold hover:bg-[#1877F2]/90 transition-all cursor-pointer"
                >
                  <Share2 size={18} /> Facebook
                </a>
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(url)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-semibold hover:bg-[#25D366]/90 transition-all cursor-pointer"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
