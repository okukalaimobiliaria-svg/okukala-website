import { NextResponse } from 'next/server'
import { createHygraphClient } from '@/lib/hygraph'

interface JobItem {
  title: string
  location: string
  description: string
  requirements: string[]
  image: string
}

interface InvestmentItem {
  title: string
  description: string
  image: string
}

function normalizeJob(item: Record<string, any>): JobItem {
  const requirements = typeof item.requisitos === 'string'
    ? item.requisitos.split(/\n|;/).map((value: string) => value.trim()).filter(Boolean)
    : Array.isArray(item.requisitos)
      ? item.requisitos.filter(Boolean).map((value: unknown) => String(value))
      : []

  return {
    title: item.nomeDaVaga,
    location: item.localizacao,
    description: item.descricao,
    requirements,
    image: item.imagem?.url || '',
  }
}

function normalizeInvestment(item: Record<string, any>): InvestmentItem {
  return {
    title: item.titulo,
    description: item.descricao,
    image: item.imagem?.url || '',
  }
}

function buildJobsQuery() {
  const model = process.env.HYGRAPH_JOBS_MODEL || 'vagasTrabalhos'
  const titleField = process.env.HYGRAPH_JOBS_TITLE_FIELD || 'nomeDaVaga'
  const locationField = process.env.HYGRAPH_JOBS_LOCATION_FIELD || 'localizacao'
  const descriptionField = process.env.HYGRAPH_JOBS_DESCRIPTION_FIELD || 'descricao'
  const requirementsField = process.env.HYGRAPH_JOBS_REQUIREMENTS_FIELD || 'requisitos'

  return `
    query GetJobs {
      ${model}(first: 20, orderBy: createdAt_DESC, where: { exibir: true }) {
        id
        ${titleField}
        ${locationField}
        ${descriptionField}
        ${requirementsField}
        imagem {
          url
        }
        slug
        exibir
      }
    }
  `
}

function buildInvestmentsQuery() {
  const model = process.env.HYGRAPH_INVESTMENT_MODEL || 'portalInvestimentos'
  const titleField = process.env.HYGRAPH_INVESTMENT_TITLE_FIELD || 'titulo'
  const descriptionField = process.env.HYGRAPH_INVESTMENT_DESCRIPTION_FIELD || 'descricao'

  return `
    query GetInvestments {
      ${model}(first: 20, orderBy: createdAt_DESC, where: { exibir: true }) {
        id
        ${titleField}
        ${descriptionField}
        imagem {
          url
        }
        slug
        exibir
      }
    }
  `
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const client = createHygraphClient()

    if (type === 'jobs') {
      const data = await client.request<{ [key: string]: Array<Record<string, any>> }>(buildJobsQuery())
      const modelKey = Object.keys(data || {}).find((key) => Array.isArray(data[key]))
      const items = modelKey ? data[modelKey] || [] : []
      return NextResponse.json({ ok: true, items: items.map(normalizeJob) })
    }

    if (type === 'investments') {
      const data = await client.request<{ [key: string]: Array<Record<string, any>> }>(buildInvestmentsQuery())
      const modelKey = Object.keys(data || {}).find((key) => Array.isArray(data[key]))
      const items = modelKey ? data[modelKey] || [] : []
      return NextResponse.json({ ok: true, items: items.map(normalizeInvestment) })
    }

    return NextResponse.json({ ok: false, error: 'Missing type' }, { status: 400 })
  } catch (error) {
    console.error('[Hygraph content] request failed:', error)
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 })
  }
}
