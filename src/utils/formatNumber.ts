/**
 * Simple function to format a number to a string with 2 decimal places
 *
 * @param number
 * @returns
 */
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

	return number.toLocaleString('de-CH', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
}
