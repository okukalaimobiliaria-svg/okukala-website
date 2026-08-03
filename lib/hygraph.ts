import { GraphQLClient } from 'graphql-request'

export const hygraphEndpoint = process.env.NEXT_PUBLIC_HYGRAPH_URL || 'https://api-eu-west-2.hygraph.com/v2/cmrjqsukb04q406vu1edxky40/master'

if (!process.env.NEXT_PUBLIC_HYGRAPH_URL) {
  console.warn('[Hygraph] NEXT_PUBLIC_HYGRAPH_URL not configured. Using placeholder.')
}

export const hygraphClient = new GraphQLClient(hygraphEndpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
})

export function createHygraphClient(adminToken?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (adminToken) {
    headers['Authorization'] = `Bearer ${adminToken}`
  }

  return new GraphQLClient(hygraphEndpoint, { headers })
}

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
