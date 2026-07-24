import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/formatting'
import { hygraphClient } from '@/lib/hygraph'
import { GET_BLOG_BY_SLUG } from '@/lib/queries'
import { Clock, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

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

async function getBlogPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  try {
    const data = await hygraphClient.request<{ blogs: BlogPostDetail[] }>(GET_BLOG_BY_SLUG, { slug })
    return data.blogs?.[0] || null
  } catch (error) {
    console.error('Erro ao carregar artigo do blog:', error)
    return null
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Artigo não encontrado - OKUKALA Blog',
      description: 'Não foi possível encontrar este artigo no momento.',
    }
  }

  return {
    title: `${post.titulo} - OKUKALA Blog`,
    description: post.resumo || 'Leia este artigo completo sobre o mercado imobiliário em Angola.',
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const contentHtml = post.conteudo?.html || post.conteudo?.text || '<p>Este artigo ainda não possui conteúdo publicado.</p>'

  return (
    <main className="w-full bg-[#F8FAFC]">
      {/* Hero */}
      <section className="relative h-[28rem] w-full overflow-hidden bg-gray-100">
        <Image
          src={post.imagemDeCapa?.url || '/Imagens/imovel1.png'}
          alt={post.titulo}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03113E]/90 via-[#03113E]/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-end justify-end">
          <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12 pb-12">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} />
              Voltar ao Blog
            </Link>
            <span className="mb-3 inline-block rounded-full bg-[#FFC800] px-3 py-1 text-xs font-bold text-[#03113E]">
              {post.categoria || 'Blog'}
            </span>
            <h1 className="mb-4 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
              {post.titulo}
            </h1>
            <div className="flex items-center gap-4 text-sm text-blue-200/80">
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{formatDate(post.dataDePublicacao || new Date().toISOString())}</span>
              </div>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-2">
                <BookOpen size={14} />
                <span>Por OKUKALA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-4">
            {/* Sidebar - Table of Contents */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-100/50">
                <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-[#03113E]">Conteúdo</h3>
                <ul className="space-y-3 text-sm">
                  {[
                    'Defina Seu Orçamento',
                    'Escolha a Localização',
                    'Avalie o Imóvel',
                    'Faça a Negociação',
                    'Finalize a Transação',
                  ].map((item, i) => (
                    <li key={i}>
                      <a href="#" className="group flex items-center gap-2 text-gray-500 transition-colors hover:text-[#0A43D8]">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-[10px] font-bold text-gray-400 transition-colors group-hover:bg-[#0A43D8]/10 group-hover:text-[#0A43D8]">
                          {i + 1}
                        </span>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Article Content */}
              <div className="rounded-2xl border border-gray-100 bg-white p-8 md:p-10 shadow-lg shadow-gray-100/50">
                <div className="prose prose-lg prose-gray max-w-none
                  prose-headings:text-[#03113E] prose-headings:font-extrabold
                  prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
                  prose-p:text-gray-600 prose-p:leading-relaxed
                  prose-a:text-[#0A43D8] prose-a:no-underline hover:prose-a:underline
                " dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </div>

              {/* Share Section */}
              <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-100/50">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#03113E]">Partilhe Este Artigo</h3>
                    <p className="mt-1 text-sm text-gray-500">Ajude outros a encontrar esta informação</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex h-10 items-center gap-2 rounded-xl bg-[#0A43D8] px-5 text-sm font-bold text-white transition-all hover:bg-[#03113E] cursor-pointer">
                      Facebook
                    </button>
                    <button className="flex h-10 items-center gap-2 rounded-xl bg-sky-500 px-5 text-sm font-bold text-white transition-all hover:bg-sky-600 cursor-pointer">
                      Twitter
                    </button>
                    <button className="flex h-10 items-center gap-2 rounded-xl bg-green-600 px-5 text-sm font-bold text-white transition-all hover:bg-green-700 cursor-pointer">
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div className="mt-8 border-t border-gray-100 pt-8">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-[#0A43D8] transition-colors hover:text-[#03113E]"
                >
                  <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                  Voltar para o Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="border-t border-gray-100 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <h2 className="mb-8 text-2xl font-extrabold text-[#03113E]">Artigos Relacionados</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                titulo: 'Investimento Imobiliário em Luanda',
                slug: 'investimento-imovel-luanda',
                imagem: '/Imagens/imovel2.png',
                data: '25 Maio 2024',
                descricao: 'Descubra as melhores estratégias para investir em imóveis em Luanda.',
                categoria: 'Investimento',
              },
              {
                titulo: 'Tendências do Mercado Imobiliário 2024',
                slug: 'tendencias-mercado-2024',
                imagem: '/Imagens/imovel3.png',
                data: '15 Maio 2024',
                descricao: 'Conheça as tendências mais importantes do mercado imobiliário angolano.',
                categoria: 'Tendências',
              },
              {
                titulo: 'Como Avaliar um Imóvel Corretamente',
                slug: 'como-avaliar-imovel',
                imagem: '/Imagens/imovel4.png',
                data: '01 Maio 2024',
                descricao: 'Aprenda os critérios profissionais para avaliar um imóvel.',
                categoria: 'Dicas',
              },
            ].map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={article.imagem}
                    alt={article.titulo}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute left-3 top-3">
                    <span className="inline-block rounded-full bg-[#0A43D8] px-3 py-1 text-xs font-bold text-white">
                      {article.categoria}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs text-gray-400">
                    <Clock size={12} />
                    <span>{article.data}</span>
                  </div>
                  <h3 className="mb-2 font-bold text-[#03113E] transition-colors group-hover:text-[#0A43D8] line-clamp-2">
                    {article.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.descricao}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative overflow-hidden bg-[#03113E] py-16 md:py-20">
        <div className="absolute inset-0">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#0A43D8]/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#FFC800]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-2xl px-6 text-center sm:px-8">
          <h2 className="text-3xl font-extrabold text-white">Receba Nossos Artigos</h2>
          <p className="mt-4 text-blue-200/80">
            Inscreva-se na nossa newsletter para receber as últimas dicas e tendências do mercado imobiliário.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/50 focus:border-[#FFC800] focus:outline-none focus:ring-2 focus:ring-[#FFC800]/30 backdrop-blur-sm transition-all"
            />
            <button className="rounded-xl bg-[#FFC800] px-8 py-3.5 text-sm font-extrabold uppercase tracking-wider text-[#03113E] shadow-lg shadow-[#FFC800]/25 transition-all hover:-translate-y-0.5 hover:bg-[#FFE066] cursor-pointer">
              Inscrever
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
