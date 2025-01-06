<template>
	<div id="chartCategorization" class="h-screen-1/2 w-full" style="height: 66vh"></div>
	<InputSlide
		v-if="min !== undefined && max !== undefined && yearToShow !== undefined"
		:min="min"
		:max="max"
		:value="yearToShow"
		@changed="handleRangeChange"
	/>
</template>

<script lang="ts">
import type { ProductionData } from '../types/production.types'

import { defineComponent } from 'vue'
import Highcharts from 'highcharts'
import InputSlide from './InputSlide.vue'
import HighchartsAccessibility from 'highcharts/modules/accessibility'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import { genericOptions, tooltipOptions } from '../utils/highchartsOptions'
import { tooltip } from '../utils/chartTooltip'
import formatNumber from '../utils/formatNumber'
import erzeugungData from '../data/production.json'
import erzeugungGroupedData from '../data/production-grouped.json'

HighchartsAccessibility(Highcharts)
HighchartsExporting(Highcharts)
HighchartsExportData(Highcharts)

/**
 * Data type for the component data.
 */
type ComponentData = {
	min: number
	max: number
	yearToShow: number
	yearToShowIndex: number
	ungroupedData: ProductionData[]
	groupedData: ProductionData[]
	years: number[]
	chart: Highcharts.Chart | null
}

export default defineComponent({
	components: {
		InputSlide,
	},
	data(): ComponentData {
		const years = erzeugungData[0].data as number[]
		const min = Math.min(...years)
		const max = Math.max(...years)
		return {
			min: min,
			max: max,
			yearToShow: max,
			yearToShowIndex: years.indexOf(max),
			ungroupedData: erzeugungData,
			groupedData: erzeugungGroupedData,
			years: years,
			chart: null as Highcharts.Chart | null,
		}
	},
	computed: {
		categoriesData(): { name: string; y: number }[] {
			return this.ungroupedData.slice(1).map((series) => ({
				name: series.name,
				y: series.data[this.yearToShowIndex],
			}))
		},
		detailsData(): { name: string; y: number }[] {
			return this.groupedData.slice(1).map((series) => ({
				name: series.name,
				y: series.data[this.yearToShowIndex],
			}))
		},
	},
	methods: {
		createChart() {
			// chart configuration
			const options: Highcharts.Options = {
				...genericOptions,
				chart: {
					backgroundColor: 'white',
					type: 'pie',
					spacingTop: 0,
					spacingRight: 0,
					spacingBottom: 0,
					spacingLeft: 0,
					style: {
						fontFamily: 'var(--font-serif)',
					},
				},
				tooltip: {
					...tooltipOptions,
					formatter: function () {
						return tooltip(this.point.color as string, this.point.name, [
							{ label: 'Production', value: `${formatNumber(this.point.y)} GWh` },
							{ label: 'Percentage', value: `${formatNumber(this.point.percentage)} %` },
						])
					},
				},
				plotOptions: {
					pie: {
						shadow: false,
						center: ['50%', '50%'],
						innerSize: '50%',
						dataLabels: {
							enabled: true,
							distance: 70,
							alignTo: 'plotEdges',
							connectorWidth: 1,
							crop: false,
							overflow: 'justify',
						},
					},
				},
				series: [
					{
						name: 'Categories',
						type: 'pie',
						size: '60%',
						innerSize: '60%',
						borderWidth: 1,

						colors: [
							'#66C7B6',
							'#3A8C80',
							'#6EC7A1',
							'#90D4B4',
							'#5B9F88',
							'#7EAF92',
							'#8FBF9E',
							'#A0A0A0',
							'#E4C54E',
						],
						data: this.categoriesData,
					},
					{
						name: 'Details',
						type: 'pie',
						size: '40%',
						innerSize: '50%',
						borderWidth: 1,
						colors: ['#4CB19E', '#6D6D6D', '#E4C54E'],
						data: this.detailsData,
					},
				],
			}

			this.chart = Highcharts.chart('chartCategorization', options)
		},
		handleRangeChange(value: number) {
			this.yearToShow = value
			this.yearToShowIndex = this.years.indexOf(this.yearToShow ?? this.years[-1])
			this.updateChart()
		},
		updateChart() {
			if (!(this.yearToShow && this.min && this.max)) {
				return
			}

			this.chart?.update({
				series: [
					{
						name: 'Categories',
						type: 'pie',
						size: '60%',
						colors: [
							'#66C7B6',
							'#3A8C80',
							'#6EC7A1',
							'#90D4B4',
							'#5B9F88',
							'#7EAF92',
							'#8FBF9E',
							'#A0A0A0',
							'#E4C54E',
						],
						data: this.categoriesData,
					},
					{
						name: 'Details',
						type: 'pie',
						size: '40%',
						colors: ['#4CB19E', '#6D6D6D', '#E4C54E'],
						data: this.detailsData,
					},
				],
			})
		},
	},
	mounted() {
		this.createChart()
	},
})
</script>
