import emailjs from '@emailjs/browser'

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
const templateContatoId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTATO
const templateSolicitacaoId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_SOLICITACAO

if (publicKey) {
  emailjs.init(publicKey)
}

export interface ContactFormData {
  nome: string
  email: string
  telefone: string
  mensagem: string
}

export interface PropertyInquiryData {
  nome: string
  email: string
  telefone: string
  slug: string
  mensagem: string
}

export async function sendContactForm(data: ContactFormData) {
  if (!serviceId || !templateContatoId || !publicKey) {
    throw new Error('EmailJS não configurado. Verifique as variáveis de ambiente.')
  }

  try {
    const response = await emailjs.send(serviceId, templateContatoId, {
      to_email: data.email,
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      mensagem: data.mensagem,
    })

    return response
  } catch (error) {
    console.error('Erro ao enviar email de contato:', error)
    throw error
  }
}

export async function sendPropertyInquiry(data: PropertyInquiryData) {
  if (!serviceId || !templateSolicitacaoId || !publicKey) {
    throw new Error('EmailJS não configurado. Verifique as variáveis de ambiente.')
  }

  try {
    const response = await emailjs.send(serviceId, templateSolicitacaoId, {
      to_email: data.email,
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      slug: data.slug,
      mensagem: data.mensagem,
    })

    return response
  } catch (error) {
    console.error('Erro ao enviar solicitação de informações:', error)
    throw error
  }
}
