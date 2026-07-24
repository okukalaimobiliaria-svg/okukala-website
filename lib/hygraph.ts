import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_URL

if (!endpoint) {
  console.warn('[Hygraph] NEXT_PUBLIC_HYGRAPH_URL not configured. Using placeholder.')
}

export const hygraphClient = new GraphQLClient(endpoint || 'https://api-eu-west-2.hygraph.com/v2/cmrjqsukb04q406vu1edxky40/master', {
  headers: {
    'Content-Type': 'application/json',
  },
})

// TypeScript types
export interface Imovel {
  id: string
  nomeDoImovel: string
  slug: string
  descricao: { html: string }
  preco: number
  tipoDeOferta: 'venda' | 'aluguel'
  cidade: string
  bairro?: string
  quantidadeDeQuartos?: number
  vagasNaGaragem?: number
  area?: number
  imagens: Array<{ url: string }>
  destacarNaPaginaInicial: boolean
  estadoDoImovel: 'novo' | 'usado' | 'emObras' | 'bomEstado'
  createdAt: string
}

export interface BlogPost {
  id: string
  titulo: string
  slug: string
  data: string
  conteudo: string
  imagemCapa: { url: string }
  categoria?: string
}
