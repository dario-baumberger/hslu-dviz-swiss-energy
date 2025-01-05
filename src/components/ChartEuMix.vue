<template>
	<div id="ChartEuMix" class="h-screen-2/3"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as Highcharts from 'highcharts'
import HighchartsAccessibility from 'highcharts/modules/accessibility'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'

import { tooltip } from '../utils/chartTooltip'
import { genericOptions } from '../utils/highchartsOptions'
import formatNumber from '../utils/formatNumber'
import energiemixData from '../data/energiemix-eu.json'

HighchartsAccessibility(Highcharts)
HighchartsExporting(Highcharts)
HighchartsExportData(Highcharts)

/**
 * Data type for the data.
 */
type ProductionData = {
	name: string
	data: number[] | string[]
}

/**
 * Data type for the component data.
 */
type ComponentData = {
	min: number
	max: number
	knob1: number
	knob2: number | undefined
	originalData: ProductionData[]
	years: number[]
	chart: Highcharts.Chart | undefined
}

export default defineComponent({
	data(): ComponentData {
		const years = energiemixData[0].data as number[]
		const min = Math.min(...years)
		const max = Math.max(...years)
		return {
			min: min,
			max: max,
			knob1: min,
			knob2: max,
			originalData: energiemixData,
			years: years,
			chart: undefined,
		}
	},
	computed: {
		filteredData(): ProductionData[] {
			const startIndex = this.years.indexOf(this.knob1!)
			const endIndex = this.years.indexOf(this.knob2!) + 1
			return this.originalData.map((series) => ({
				...series,
				data: series.data.slice(startIndex, endIndex),
			}))
		},
		filteredYears(): string[] {
			return this.years
				.filter((year) => year >= this.knob1! && year <= this.knob2!)
				.map((year) => year.toString())
		},
	},
	methods: {
		createChart() {
			// chart configuration
			const options: Highcharts.Options = {
				...genericOptions,
				chart: {
					backgroundColor: 'white',
					type: 'bar',
					height: null,
					style: {
						fontFamily: 'var(--font-serif)',
					},
				},
				title: {
					text: '',
				},
				credits: {
					enabled: false,
				},
				// axes are inverted
				yAxis: {
					title: {
						text: 'Percentage',
					},
				},
				xAxis: {
					categories: this.originalData[0].data.map((country) => country.toString()),
					title: {
						text: 'Countries',
					},
					labels: {
						step: 1,
					},
				},
				tooltip: {
					useHTML: true,
					formatter: function () {
						return tooltip(this.point.color as string, this.series.name, [
							{ label: 'Country', value: this.key },
							{ label: 'Production', value: `${formatNumber(this.point.y)} GWh` },
							{ label: 'Percentage', value: `${formatNumber(this.point.percentage)} %` },
						])
					},
				},
				plotOptions: {
					series: {
						stacking: 'percent',
						dataLabels: {
							enabled: false,
						},
					},
				},
				series: this.originalData.slice(1).map((series, index) => ({
					...series,
					color: ['#4CB19E', '#6D6D6D', '#E4C54E'][index % 3],
				})) as Highcharts.SeriesOptionsType[],
			}

			this.chart = Highcharts.chart('ChartEuMix', options)
		},
		updateChart() {
			if (this.chart) {
				this.chart.update({
					series: this.filteredData as Highcharts.SeriesOptionsType[],
				})
			}
		},
		handleRangeChange({ low, high }: { low: number; high: number }) {
			this.knob1 = low
			this.knob2 = high
			this.updateChart()
		},
	},
	mounted() {
		this.createChart()
	},
})
</script>
