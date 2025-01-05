<template>
	<div id="chart2" class="h-full"></div>
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
import einfuhr_ausfuhr from '../data/import-export-ch.json'

HighchartsAccessibility(Highcharts)
HighchartsExporting(Highcharts)
HighchartsExportData(Highcharts)

type ComponentData = {
	min: number
	max: number
	knob1: number
	knob2: number
	originalData: ProductionData[]
	years: number[]
	chart: Highcharts.Chart | undefined
}

export default defineComponent({
	components: {
		InputRange,
	},
	data(): ComponentData {
		const years = einfuhr_ausfuhr[0].data
		const min = Math.min(...years)
		const max = Math.max(...years)
		return {
			min: min,
			max: max,
			knob1: min,
			knob2: max,
			originalData: einfuhr_ausfuhr,
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
				.filter((year) => year >= this.knob1 && year <= this.knob2)
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
				title: {
					text: '',
				},
				credits: {
					enabled: false,
				},
				xAxis: {
					categories: this.filteredYears,
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
						])
					},
				},
				plotOptions: {
					column: {
						dataLabels: {
							enabled: false,
						},
					},
					series: {},
				},
				colors: ['#b71c1c', '#1b5e20'],
				series: this.filteredData.slice(1).map((series) => ({
					...series,
					type: 'column',
				})),
			}

			this.chart = Highcharts.chart('chart2', options)
		},
		handleRangeChange({ low, high }: { low: number; high: number }) {
			this.knob1 = low
			this.knob2 = high
			this.updateChart()
		},
		updateChart() {
			this.chart?.update({
				xAxis: {
					categories: this.filteredYears,
				},
				series: this.filteredData.slice(1) as Highcharts.SeriesOptionsType[],
			})
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
