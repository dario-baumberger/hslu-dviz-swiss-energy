export default function formatNumber(number: number): string {
  const formattedNumber = number.toFixed(2)
  const parts = formattedNumber.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "'")
  return parts.join('.')
}
