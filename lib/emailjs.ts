import emailjs from '@emailjs/browser'

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
const templateContatoId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTATO
const templateCandidaturaId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CANDIDATURA
const templateAgendamentoId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_AGENDAMENTO

if (publicKey) {
  emailjs.init(publicKey)
}

export interface ContactFormData {
  nome: string
  email: string
  telefone: string
  assunto?: string
  mensagem: string
}

export interface WorkApplicationData {
  nome: string
  email: string
  telefone: string
  cargo: string
  mensagem: string
}

export interface InvestorInterestData {
  nome: string
  email: string
  telefone: string
  tipoInvestimento: string
  mensagem: string
}

export interface PropertyInquiryData {
  nome: string
  email: string
  telefone: string
  mensagem: string
  slug: string
}

export interface AppointmentRequestData {
  nome: string
  email: string
  telefone: string
  data: string
  hora: string
  mensagem: string
  slug: string
  imovel: string
}

function assertEmailJsConfigured(templateIdValue: string | undefined, variableName: string) {
  if (!serviceId || !templateIdValue || !publicKey) {
    const missing = []
    if (!serviceId) missing.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID')
    if (!publicKey) missing.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY')
    if (!templateIdValue) missing.push(variableName)

    throw new Error(`EmailJS não configurado. Faltam as variáveis: ${missing.join(', ')}`)
  }
}

async function sendTemplate(templateId: string | undefined, payload: Record<string, string>, variableName: string) {
  assertEmailJsConfigured(templateId, variableName)

  try {
    return await emailjs.send(serviceId!, templateId!, payload, publicKey)
  } catch (error) {
    console.error('Erro ao enviar email via EmailJS:', error)
    throw error
  }
}

export async function sendContactForm(data: ContactFormData) {
  return sendTemplate(templateContatoId, {
    to_email: data.email,
    nome: data.nome,
    email: data.email,
    telefone: data.telefone,
    assunto: data.assunto ?? 'Sem assunto',
    mensagem: data.mensagem,
  }, 'NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTATO')
}

export async function sendWorkApplication(data: WorkApplicationData) {
  return sendTemplate(templateCandidaturaId, {
    to_email: data.email,
    nome: data.nome,
    email: data.email,
    telefone: data.telefone,
    cargo: data.cargo,
    mensagem: data.mensagem,
  }, 'NEXT_PUBLIC_EMAILJS_TEMPLATE_CANDIDATURA')
}

export async function sendWorkApplicationForm(form: HTMLFormElement) {
  assertEmailJsConfigured(templateCandidaturaId, 'NEXT_PUBLIC_EMAILJS_TEMPLATE_CANDIDATURA')

  try {
    const response = await emailjs.sendForm(serviceId!, templateCandidaturaId!, form, publicKey)
    return response
  } catch (error) {
    console.error('Erro ao enviar candidatura com currículo:', error)
    if (error instanceof Error) {
      throw new Error(`Não foi possível enviar a candidatura. ${error.message}`)
    }
    throw new Error('Não foi possível enviar a candidatura. Verifique o template do EmailJS, os campos do formulário e o anexo.')
  }
}

export async function sendInvestorInterest(data: InvestorInterestData) {
  return sendTemplate(templateContatoId, {
    to_email: data.email,
    nome: data.nome,
    email: data.email,
    telefone: data.telefone,
    tipo_investimento: data.tipoInvestimento,
    mensagem: data.mensagem,
  }, 'NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTATO')
}

export async function sendPropertyInquiry(data: PropertyInquiryData) {
  return sendTemplate(templateContatoId, {
    to_email: data.email,
    nome: data.nome,
    email: data.email,
    telefone: data.telefone,
    assunto: `Solicitação de informação sobre imóvel ${data.slug}`,
    mensagem: data.mensagem,
    slug: data.slug,
  }, 'NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTATO')
}

export async function sendAppointmentRequest(data: AppointmentRequestData) {
  return sendTemplate(templateAgendamentoId, {
    to_email: data.email,
    nome: data.nome,
    email: data.email,
    telefone: data.telefone,
    data: data.data,
    hora: data.hora,
    mensagem: data.mensagem,
    slug: data.slug,
    imovel: data.imovel,
  }, 'NEXT_PUBLIC_EMAILJS_TEMPLATE_AGENDAMENTO')
}
