import Highcharts from 'highcharts'

/**
 * Highcharts export options for all charts
 */
export const exportSettings = {
	exporting: {
		buttons: {
			contextButton: {
				enabled: false,
				menuItems: [
					'viewFullscreen',
					'Print',
					'printChart',
					'separator',
					'downloadPNG',
					'downloadJPEG',
					'downloadPDF',
					'downloadSVG',
					'separator',
					'downloadCSV',
					'downloadXLS',
				],
			},
		},
	},
}

/**
 * Highcharts options for all charts
 */
export const genericOptions: Highcharts.Options = {
	title: {
		text: '',
	},
	credits: {
		enabled: false,
	},
	...exportSettings,
}

/*
 * Highcharts tooltip options for all charts
 */
export const tooltipOptions: Highcharts.TooltipOptions = {
	useHTML: true,
	hideDelay: 300,
	shadow: true,
	padding: 0,
	backgroundColor: 'white',
}
