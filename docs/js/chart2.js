"use strict";

export function chart2() {
	fetch('./data/einfuhr_ausfuhr.json')
		.then(response => response.json())
		.then(data => {
			Highcharts.chart('chart1', {
				chart: {
					backgroundColor: 'transparent',
					type: 'column',
				},
				title: false,
				credits: {
					enabled: false
				},
				xAxis: {
					categories: data[0].data
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
						dataLabels: {
							enabled: false
						},
					},
					series: {
						// borderRadius: '25%'

					}
				},
				series: data.slice(1)
			});
		})
		.catch(error => console.error('Error fetching the JSON data:', error));
}
