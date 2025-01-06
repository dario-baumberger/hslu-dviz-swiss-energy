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

export const genericOptions = {
	title: {
		text: '',
	},
	credits: {
		enabled: false,
	},
	...exportSettings,
}
