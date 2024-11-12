"use strict";

export function chart3() {
	fetch('./data/erzeugung.json')
		.then(response => response.json())
		.then(data => {
			Highcharts.chart('chart3', {
				chart: {
					backgroundColor: 'transparent',
					type: 'area',
				},
				title: false,
				credits: {
					enabled: false
				},
				xAxis: {
					categories: data[0].data.map((year) => year)
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
					area: {
						stacking: 'percent',
						marker: {
							enabled: false
						}
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
