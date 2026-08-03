import { NextResponse } from 'next/server'
import { gql } from 'graphql-request'
import { createHygraphClient } from '@/lib/hygraph'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, data } = body as { type: string; data: Record<string, any> }

    const token = process.env.HYGRAPH_MUTATION_TOKEN || process.env.NEXT_PRIVATE_HYGRAPH_TOKEN || process.env.NEXT_HYGRAPH_TOKEN
    if (!token) {
      return NextResponse.json({ ok: false, error: 'HYGRAPH_MUTATION_TOKEN not set' }, { status: 500 })
    }

    const client = createHygraphClient(token)

    if (type === 'work') {
      const mutation = gql`
        mutation CreateCandidatura($nome: String!, $email: String!, $telefone: String, $cargo: String, $mensagem: String) {
          createCandidatura(data: { nome: $nome, email: $email, telefone: $telefone, cargo: $cargo, mensagem: $mensagem }) { id }
        }
      `

      const variables = {
        nome: data.nome || '',
        email: data.email || '',
        telefone: data.telefone || null,
        cargo: data.cargo || null,
        mensagem: data.mensagem || null,
      }

      const res = await client.request(mutation, variables)
      return NextResponse.json({ ok: true, result: res })
    }

    if (type === 'investor') {
      const mutation = gql`
        mutation CreateInvestorInterest($nome: String!, $email: String!, $telefone: String, $tipo_investimento: String, $mensagem: String) {
          createInvestorInterest(data: { nome: $nome, email: $email, telefone: $telefone, tipo_investimento: $tipo_investimento, mensagem: $mensagem }) { id }
        }
      `

      const variables = {
        nome: data.nome || '',
        email: data.email || '',
        telefone: data.telefone || null,
        tipo_investimento: data.tipoInvestimento || data.tipo_investimento || null,
        mensagem: data.mensagem || null,
      }

      const res = await client.request(mutation, variables)
      return NextResponse.json({ ok: true, result: res })
    }

    return NextResponse.json({ ok: false, error: 'Unknown submission type' }, { status: 400 })
  } catch (err) {
    console.error('[API] Hygraph submit error:', err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
