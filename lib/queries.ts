export const GET_HOME_IMOVEIS = `
  query GetHomeImoveis {
    imoveiss(where: { destacarNaPaginaInicial: true, estadoDoImovel: novo }, first: 3) {
      id
      nomeDoImovel
      slug
      preco
      cidade
      quantidadeDeQuartos
      vagasNaGaragem
      area
      imagemDeDestaque {
        url
      }
      imagens {
        url
      }
    }
  }
`

export const GET_ALL_IMOVEIS = `
  query GetAllImoveis($skip: Int!, $first: Int!) {
    imoveiss(
      skip: $skip
      first: $first
      orderBy: createdAt_DESC
    ) {
      id
      nomeDoImovel
      slug
      preco
      cidade
      quantidadeDeQuartos
      vagasNaGaragem
      area
      imagemDeDestaque { url }
      imagens {
        url
      }
      destacarNaPaginaInicial
      tipoDeOferta
    }
    imoveissConnection {
      aggregate {
        count
      }
    }
  }
`

export const GET_IMOVEL_BY_SLUG = `
  query GetImovelBySlug($slug: String, $id: ID) {
    imoveiss(where: { OR: [{ slug: $slug }, { id: $id }] }, first: 1) {
      id
      nomeDoImovel
      slug
      descricao {
        html
        text
      }
      preco
      tipoDeOferta
      cidade
      bairro
      quantidadeDeQuartos
      vagasNaGaragem
      area
      imagemDeDestaque {
        url
      }
      imagens {
        url
      }
      estadoDoImovel
      caracteristicasPrincipais
      oQueHaProximo
      linkDoMapa
      createdAt
    }
  }
`

export const GET_RELATED_IMOVEIS = `
  query GetRelatedImoveis($excludeId: ID!, $first: Int!) {
    imoveiss(where: { id_not: $excludeId, estadoDoImovel: novo }, first: $first, orderBy: createdAt_DESC) {
      id
      nomeDoImovel
      slug
      preco
      cidade
      quantidadeDeQuartos
      vagasNaGaragem
      area
      imagens {
        url
      }
      tipoDeOferta
    }
  }
`

export const GET_RELATED_BLOGS = `
  query GetRelatedBlogs($excludeId: ID!, $first: Int!) {
    blogs(where: { id_not: $excludeId }, first: $first, orderBy: dataDePublicacao_DESC) {
      id
      titulo
      slug
      resumo
      dataDePublicacao
      imagemDeCapa { url }
      categoria
    }
  }
`

export const GET_BLOGS = `
  query GetBlogs {
    blogs(orderBy: dataDePublicacao_DESC, first: 1000) {
      id
      titulo
      slug
      resumo
      dataDePublicacao
      conteudo {
        raw
        html
        markdown
        text
      }
      imagemDeCapa {
        url
      }
      categoria
    }
  }
`

export const GET_FEATURED_BLOGS = `
  query GetFeaturedBlogs {
    blogs(where: { destacarNaPaginaInicial: true }, orderBy: dataDePublicacao_DESC, first: 3) {
      id
      titulo
      slug
      resumo
      dataDePublicacao
      imagemDeCapa { url }
      categoria
      destacarNaPaginaInicial
    }
  }
`

export const GET_BLOG_BY_SLUG = `
  query GetBlogBySlug($slug: String, $id: ID) {
    blogs(where: { OR: [{ slug: $slug }, { id: $id }] }, first: 1) {
      id
      titulo
      slug
      resumo
      dataDePublicacao
      conteudo {
        raw
        html
        markdown
        text
      }
      imagemDeCapa {
        url
      }
      categoria
    }
  }
`

export const GET_IMOVEL_SLUGS = `
  query GetImovelSlugs {
    imoveiss(first: 1000, where: { estadoDoImovel: novo }) {
      slug
    }
  }
`

export const GET_POST_SLUGS = `
  query GetPostSlugs {
    blogs(first: 1000) {
      slug
    }
  }
`
