// todo: make nice
export default function formatNumber(number: number | undefined): string {
  if (number === 0) {
    return '0'
  }

  if (!number) {
    return 'NaN'
  }

  if (isNaN(number)) {
    return 'NaN'
  }

  const formattedNumber = number.toFixed(2)
  const parts = formattedNumber.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "'")
  return parts.join('.')
}
