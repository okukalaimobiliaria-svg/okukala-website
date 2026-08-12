import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hygraphClient } from '@/lib/hygraph'
import { GET_BLOG_BY_SLUG, GET_RELATED_BLOGS } from '@/lib/queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0
import { BlogPostContent } from './BlogPostContent'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/formatting'

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

interface BlogRelatedItem {
  id: string
  titulo: string
  slug: string
  resumo?: string | null
  dataDePublicacao?: string | null
  imagemDeCapa?: { url?: string | null } | null
  categoria?: string | null
}

async function getBlogPostBySlug(slugOrId: string): Promise<BlogPostDetail | null> {
  try {
    const data = await hygraphClient.request<{ blogs: BlogPostDetail[] }>(GET_BLOG_BY_SLUG, { slug: slugOrId, id: slugOrId })
    return data.blogs?.[0] || null
  } catch (error) {
    console.error('Erro ao carregar artigo do blog:', error)
    return null
  }
}

async function getRelatedBlogs(excludeId: string): Promise<BlogRelatedItem[]> {
  try {
    const data = await hygraphClient.request<{ blogs: BlogRelatedItem[] }>(GET_RELATED_BLOGS, { excludeId, first: 3 })
    return data.blogs || []
  } catch (error) {
    console.error('Erro ao carregar artigos relacionados:', error)
    return []
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
  const relatedPosts = post ? await getRelatedBlogs(post.id) : []

  if (!post) {
    notFound()
  }

  const contentHtml = post.conteudo?.html || post.conteudo?.text || '<p>Este artigo ainda não possui conteúdo publicado.</p>'

  return (
    <>
      <BlogPostContent post={post} contentHtml={contentHtml} />
      
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#03113E] mb-12 font-montserrat">Artigos Relacionados</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug ?? relatedPost.id}`}
                  className="group overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-lg shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={relatedPost.imagemDeCapa?.url || '/Imagens/imovel1.png'}
                      alt={relatedPost.titulo}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {relatedPost.categoria && (
                      <div className="absolute left-4 top-4">
                        <span className="inline-block rounded-full bg-[#0A43D8]/90 backdrop-blur-sm px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                          {relatedPost.categoria}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-2 text-xs font-medium text-gray-400">
                      <Clock size={14} />
                      <span>{formatDate(relatedPost.dataDePublicacao || new Date().toISOString())}</span>
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-[#03113E] transition-colors group-hover:text-[#0A43D8] leading-snug">
                      {relatedPost.titulo}
                    </h3>
                    <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-gray-500">{relatedPost.resumo}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-[#0A43D8] group-hover:gap-2 transition-all">
                      Ler artigo <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}


