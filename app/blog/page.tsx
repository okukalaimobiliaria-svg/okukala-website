import { Metadata } from 'next'
import { BlogList } from '@/components/BlogList'
import { hygraphClient } from '@/lib/hygraph'
import { GET_BLOGS, GET_FEATURED_BLOGS } from '@/lib/queries'

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
    const [blogData, featuredData] = await Promise.all([
      hygraphClient.request<{ blogs: BlogPostListItem[] }>(GET_BLOGS),
      hygraphClient.request<{ blogs: BlogPostListItem[] }>(GET_FEATURED_BLOGS),
    ])

    const latestPosts = (blogData.blogs || []).map((post) => ({ ...post, slug: post.slug ?? post.id }))
    const featuredPosts = (featuredData.blogs || []).map((post) => ({ ...post, slug: post.slug ?? post.id }))

    const combinedPosts = [...featuredPosts, ...latestPosts]
    const uniquePostsMap = new Map<string, BlogPostListItem>()

    combinedPosts.forEach((post) => {
      const key = post.slug || post.id
      uniquePostsMap.set(key, { ...post, slug: post.slug ?? post.id })
    })

    posts = Array.from(uniquePostsMap.values())
  } catch (error) {
    console.error('Erro ao carregar posts do blog:', error)
  }

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative h-auto lg:h-[600px] flex flex-col lg:flex-row overflow-hidden">
        {/* Image (Background) */}
        <div className="relative lg:absolute right-0 top-0 w-full lg:w-[64%] h-[300px] lg:h-full z-0 overflow-hidden">
          <img 
            src="/heros/real-estate-accommodation-property-investment-graphic-word.jpg" 
            alt="Hero Background"
            className="w-full h-full object-cover object-left" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021a5c]/90 via-[#021a5c]/50 to-transparent z-10 pointer-events-none" />
        </div>

        {/* Camada 2 (Faixa Amarela Intermediária - z-10) */}
        <div className="hidden lg:block absolute left-0 top-0 w-full h-full bg-[#FFC800] z-10 lg:[clip-path:polygon(0_0,_52%_0,_39%_50%,_52%_100%,_0_100%)]" />

        {/* Camada 3 (Container Azul Principal - z-20) */}
        <div className="w-full h-3 bg-[#FFC800] lg:hidden" />
        <div className="relative w-full bg-[#042A8F] p-8 md:p-12 lg:p-20 z-20 flex items-center lg:[clip-path:polygon(0_0,_49%_0,_36%_50%,_49%_100%,_0_100%)]">
          <div className="max-w-xl text-white">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FFC800] backdrop-blur-sm">
              Blog OKUKALA
            </span>
            <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
              Insights sobre o{' '}
              <span className="text-[#FFC800]">Mercado Imobiliário</span>
            </h1>
            <p className="text-lg text-blue-200/80 font-light">
              Dicas, tendências e análises para você tomar as melhores decisões de investimento.
            </p>
          </div>
        </div>
      </section>

      <BlogList posts={posts} />
    </main>
  )
}
