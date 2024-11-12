export function chart1() {
		fetch('./data/stromproduktion_swissgrid.json')
			.then(response => response.json())
			.then(data => {
				Highcharts.chart('chart1', {
					chart: {
						backgroundColor: 'transparent',
						type: 'column'
					},
					title: false,
					credits: {
						enabled: false
					},
					xAxis: {
						categories: data[0].data.map((_, index) => index + 2014)
					},
					yAxis: {
						title: {
							text: 'Produktion (GWh)'
						}
					},
					tooltip: {
						valueSuffix: ' GWh'
					},
					plotOptions: {
						column: {
							stacking: 'normal',
							dataLabels: {
								enabled: false
							},
						},
						series: {
							// borderRadius: '25%'

						}
					},
					series: data
				});
			})
			.catch(error => console.error('Error fetching the JSON data:', error));
}
