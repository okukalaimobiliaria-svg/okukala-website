import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/formatting'
import { hygraphClient } from '@/lib/hygraph'
import { GET_BLOGS } from '@/lib/queries'
import { Clock, ArrowRight, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - OKUKALA Imobiliária',
  description: 'Artigos e dicas sobre o mercado imobiliário em Angola. Conheça tendências, guias de investimento e muito mais.',
}

interface BlogPostListItem {
  id: string
  titulo: string
  slug?: string | null
  resumo?: string | null
  dataDePublicacao?: string | null
  categoria?: string | null
  imagemDeCapa?: {
    url?: string | null
  } | null
}

export default async function BlogPage() {
  let posts: BlogPostListItem[] = []

  try {
    const data = await hygraphClient.request<{ blogs: BlogPostListItem[] }>(GET_BLOGS)
    posts = (data.blogs || []).filter((post) => Boolean(post.slug))
  } catch (error) {
    console.error('Erro ao carregar posts do blog:', error)
  }

  const categories = Array.from(
    new Set(posts.map((post) => post.categoria).filter(Boolean) as string[])
  )

  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#021a5c] py-20 md:py-28">
        <div className="absolute inset-0">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#0A43D8]/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#FFC800]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FFC800] backdrop-blur-sm">
            Blog OKUKALA
          </span>
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Insights sobre o{' '}
            <span className="text-[#FFC800]">Mercado Imobiliário</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-blue-200/80">
            Dicas, tendências e análises para você tomar as melhores decisões de investimento.
          </p>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="border-b border-gray-100 bg-white py-10 md:py-14">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <div className="mb-8 max-w-xl">
            <h2 className="mb-4 text-lg font-bold text-[#03113E]">Pesquisar Artigos</h2>
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Digite uma palavra-chave..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm text-[#03113E] placeholder:text-gray-400 focus:border-[#0A43D8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A43D8]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Categorias</p>
            <div className="flex flex-wrap gap-2.5">
              {categories.map((category) => (
                <button
                  key={category}
                  className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-600 transition-all hover:border-[#0A43D8] hover:bg-[#0A43D8]/5 hover:text-[#0A43D8] cursor-pointer"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          {featuredPost ? (
            <>
              {/* Featured Post */}
              <div className="mb-12">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group grid gap-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:grid-cols-2"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-100 md:h-full">
                    <Image
                      src={featuredPost.imagemDeCapa?.url || '/Imagens/imovel1.png'}
                      alt={featuredPost.titulo}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute left-4 top-4">
                      <span className="inline-block rounded-full bg-[#FFC800] px-3 py-1 text-xs font-bold text-[#03113E]">
                        Destaque
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-8">
                    <span className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0A43D8]">{featuredPost.categoria}</span>
                    <h2 className="mb-3 text-2xl font-extrabold text-[#03113E] transition-colors group-hover:text-[#0A43D8]">
                      {featuredPost.titulo}
                    </h2>
                    <p className="mb-4 leading-relaxed text-gray-600">{featuredPost.resumo}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock size={14} />
                        <span>{formatDate(featuredPost.dataDePublicacao || new Date().toISOString())}</span>
                      </div>
                      <span className="flex items-center gap-1 text-sm font-bold text-[#0A43D8] group-hover:gap-2 transition-all">
                        Ler artigo <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Other Posts Grid */}
              {otherPosts.length > 0 && (
                <div className="grid gap-8 md:grid-cols-3">
                  {otherPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                        <Image
                          src={post.imagemDeCapa?.url || '/Imagens/imovel1.png'}
                          alt={post.titulo}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute left-3 top-3">
                          <span className="inline-block rounded-full bg-[#0A43D8] px-3 py-1 text-xs font-bold text-white">
                            {post.categoria}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="mb-3 flex items-center gap-2 text-xs text-gray-400">
                          <Clock size={12} />
                          <span>{formatDate(post.dataDePublicacao || new Date().toISOString())}</span>
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-[#03113E] transition-colors group-hover:text-[#0A43D8]">
                          {post.titulo}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">{post.resumo}</p>
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-[#0A43D8] group-hover:gap-2 transition-all">
                          Ler artigo <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-600">
              Ainda não existem artigos publicados no blog.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
