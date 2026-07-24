export function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: string): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('pt-AO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}
