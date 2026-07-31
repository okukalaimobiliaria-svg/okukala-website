export function formatPrice(price: number): string {
  const formattedPrice = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

  return `${formattedPrice} Kz`
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
