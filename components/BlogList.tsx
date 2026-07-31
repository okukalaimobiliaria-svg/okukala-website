'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight, Search } from 'lucide-react'
import { formatDate } from '@/lib/formatting'

interface BlogPostListItem {
  id: string
  titulo: string
  slug?: string | null
  resumo?: string | null
  dataDePublicacao?: string | null
  categoria?: string | null
  imagemDeCapa?: { url?: string | null } | null
}

export function BlogList({ posts }: { posts: BlogPostListItem[] }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const POSTS_PER_PAGE = 9

  const categories = useMemo(() => {
    return Array.from(new Set(posts.map((post) => post.categoria).filter(Boolean) as string[]))
  }, [posts])

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.titulo.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = activeCategory ? post.categoria === activeCategory : true
      return matchesSearch && matchesCategory
    })
  }, [posts, search, activeCategory])

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE
    return filteredPosts.slice(start, start + POSTS_PER_PAGE)
  }, [filteredPosts, currentPage])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  return (
    <div>
      {/* Search & Filters */}
      <section className="border-b border-gray-100 bg-white py-10 md:py-14">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-md w-full">
              <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-400">Pesquisar Artigos</label>
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar por título..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 py-3.5 pl-12 pr-4 text-sm text-[#03113E] placeholder:text-gray-400 focus:border-[#0A43D8] focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-[#0A43D8]/10 transition-all"
                />
              </div>
            </div>

            <div className="flex-1 md:text-right">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Categorias</p>
              <div className="flex flex-wrap gap-2.5 md:justify-end">
                <button
                  onClick={() => { setActiveCategory(null); setCurrentPage(1); }}
                  className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeCategory === null ? 'bg-[#0A43D8] text-white border-[#0A43D8]' : 'border-gray-100 bg-white text-gray-600 hover:border-[#0A43D8]/30 hover:bg-[#0A43D8]/5 hover:text-[#0A43D8]'
                  }`}
                >
                  Todas
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => { setActiveCategory(category); setCurrentPage(1); }}
                    className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      activeCategory === category ? 'bg-[#0A43D8] text-white border-[#0A43D8]' : 'border-gray-100 bg-white text-gray-600 hover:border-[#0A43D8]/30 hover:bg-[#0A43D8]/5 hover:text-[#0A43D8]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          {paginatedPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-lg shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={post.imagemDeCapa?.url || '/Imagens/imovel1.png'}
                      alt={post.titulo}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute left-4 top-4">
                      <span className="inline-block rounded-full bg-[#0A43D8]/90 backdrop-blur-sm px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                        {post.categoria}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-2 text-xs font-medium text-gray-400">
                      <Clock size={14} />
                      <span>{formatDate(post.dataDePublicacao || new Date().toISOString())}</span>
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-[#03113E] transition-colors group-hover:text-[#0A43D8] leading-snug">
                      {post.titulo}
                    </h3>
                    <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-gray-500">{post.resumo}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-[#0A43D8] group-hover:gap-2 transition-all">
                      Ler artigo <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-600">
              Nenhum artigo encontrado com os filtros selecionados.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-10 w-10 rounded-xl font-bold transition-all ${
                    currentPage === i + 1 ? 'bg-[#0A43D8] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
