<template>
	<div id="chartProductionBar" class="h-full"></div>
	<InputRange
		v-if="min !== undefined && max !== undefined && knob1 !== undefined && knob2 !== undefined"
		:min="min"
		:max="max"
		:low="knob1"
		:high="knob2"
		@changed="handleRangeChange"
	/>
</template>

<script lang="ts">
import type { ProductionData } from '../types/production.types'

import { defineComponent } from 'vue'
import Highcharts from 'highcharts'
import InputRange from './InputRange.vue'
import { tooltip } from '../utils/chartTooltip'
import HighchartsAccessibility from 'highcharts/modules/accessibility'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import { genericOptions } from '../utils/highchartsOptions'
import formatNumber from '../utils/formatNumber'
import erzeugungData from '../data/production.json'

HighchartsAccessibility(Highcharts)
HighchartsExporting(Highcharts)
HighchartsExportData(Highcharts)

/**
 * Data type for the component data.
 */
type ComponentData = {
	min: number
	max: number
	knob1: number
	knob2: number
	originalData: ProductionData[]
	years: number[]
	chart: Highcharts.Chart | undefined
}

/**
 * Component for the production bar chart.
 */
export default defineComponent({
	components: {
		InputRange,
	},
	data(): ComponentData {
		const years = erzeugungData[0].data as number[]
		const min = Math.min(...years)
		const max = Math.max(...years)
		return {
			min: min,
			max: max,
			knob1: min,
			knob2: max,
			originalData: erzeugungData,
			years: years,
			chart: undefined,
		}
	},
	computed: {
		filteredData(): ProductionData[] {
			const startIndex = this.years.indexOf(this.knob1)
			const endIndex = this.years.indexOf(this.knob2) + 1
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
					type: 'column',
					style: {
						fontFamily: 'var(--font-serif)',
					},
				},
				lang: {
					decimalPoint: '.',
					thousandsSep: "'",
				},
				title: {
					text: '',
				},
				credits: {
					enabled: false,
				},
				xAxis: {
					categories: this.years.map((year) => year.toString()),
				},
				yAxis: {
					title: {
						text: 'GWh',
					},
				},
				tooltip: {
					useHTML: true,
					formatter: function () {
						return tooltip(this.point.color as string, this.series.name, [
							{ label: 'Year', value: this.key },
							{ label: 'Production', value: `${formatNumber(this.point.y)} GWh` },
							{ label: 'Percentage', value: `${formatNumber(this.point.percentage)} %` },
						])
					},
				},
				plotOptions: {
					column: {
						stacking: 'normal',

						dataLabels: {
							enabled: false,
						},
						point: {},
					},
				},

				series: this.originalData.slice(1).map((series, index) => ({
					name: series.name,
					data: series.data,
					type: 'column',
					color: [
						'#66C7B6',
						'#3A8C80',
						'#6EC7A1',
						'#90D4B4',
						'#5B9F88',
						'#7EAF92',
						'#8FBF9E',
						'#A0A0A0',
						'#E4C54E',
					][index % 9],
				})),
			}

			this.chart = Highcharts.chart('chartProductionBar', options)
		},
		updateChart() {
			if (this.chart) {
				this.chart.update({
					xAxis: {
						categories: this.filteredYears,
					},
					series: this.filteredData.slice(1) as Highcharts.SeriesOptionsType[],
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

		//on mobile screens limit inital displayed data
		if (window.innerWidth < 768 && this.max - 7 > this.min) {
			this.knob1 = this.max - 7
			this.updateChart()
		}
	},
})
</script>
