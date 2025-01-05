<template>
	<div class="flex flex-col md:flex-row gap-4 justify-center md:max-w-none mx-auto">
		<div class="w-full hidden md:block">
			<h2 class="text-xl mb-4 font-sans text-center">Import into CH</h2>
			<div id="chartMapImport" class="h-screen-1/2 w-full"></div>
		</div>
		<div class="w-full hidden md:block">
			<h2 class="text-xl mb-4 font-sans text-center">Export from CH</h2>
			<div id="chartMapExport" class="h-screen-1/2 w-full"></div>
		</div>
		<div class="w-full">
			<h2 class="text-xl mb-4 font-sans text-center">Import Export</h2>
			<div id="chartMapNetto" class="h-screen-1/2 w-full"></div>
		</div>
	</div>
	<InputSlide
		v-if="min !== undefined && max !== undefined && yearToShow !== undefined"
		:min="min"
		:max="max"
		:value="yearToShow"
		@changed="handleRangeChange"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Highcharts from 'highcharts/highmaps'
//import topology from '@highcharts/map-collection/custom/european-union.topo.json'
import topology from '../assets/map.topo.json'
import InputSlide from './InputSlide.vue'
import formatNumber from '../utils/formatNumber'
import HighchartsAccessibility from 'highcharts/modules/accessibility'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import { genericOptions } from '../utils/highchartsOptions'
import { tooltip } from '../utils/chartTooltip'
import data from '../data/ogd107_strom_import_export.json'

HighchartsAccessibility(Highcharts)
HighchartsExporting(Highcharts)
HighchartsExportData(Highcharts)

type YearlyData = {
	name: number
	data: {
		exports: Record<string, number>
		imports: Record<string, number>
		netto: Record<string, number>
	}
}

type ComponentData = {
	min: number
	max: number
	yearToShow: number
	originalData: YearlyData[]
	years: number[]
	chartImport: Highcharts.Chart | undefined
	chartExport: Highcharts.Chart | undefined
	chartNetto: Highcharts.Chart | undefined
}

function isNumberOrNull(value: unknown): value is number | null {
	return typeof value === 'number' || value === null
}

function mapData(data: unknown): [string, number | null][] {
	return Object.entries(data || {}).map(([key, value]) => [
		key,
		isNumberOrNull(value) ? value : null,
	]) as [string, number | null][]
}

/**
 * Component for the EU map.
 * Import and Export will be hidden on mobile.
 */
export default defineComponent({
	components: {
		InputSlide,
	},
	data(): ComponentData {
		const years = data.map((item: YearlyData) => item.name)
		const min = Math.min(...years)
		const max = Math.max(...years)
		return {
			min: min,
			max: max,
			yearToShow: max,
			originalData: data,
			years: years,
			chartImport: undefined,
			chartExport: undefined,
			chartNetto: undefined,
		}
	},
	computed: {
		filteredYears(): YearlyData | undefined {
			return this.originalData.find((year) => year.name === this.yearToShow)
		},
	},
	methods: {
		createChart() {
			// need for access to parent context within Highcharts callbacks
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			const context = this

			// chart configuration for all charts
			const options: Highcharts.Options = {
				...genericOptions,
				chart: {
					map: topology,
					animation: false,
					backgroundColor: 'white',
					style: {
						fontFamily: 'var(--font-serif)',
					},
				},
				credits: {
					enabled: false,
				},
				title: {
					text: '',
				},
			}

			// chart configuration for import chart
			const importOptions: Highcharts.Options = {
				...options,
				colorAxis: {
					type: 'linear',
					minColor: '#efefef',
					maxColor: '#b71c1c',
				},
				tooltip: {
					useHTML: true,
					formatter: function () {
						const point = this.point
						const hcKey = point.properties['hc-key']
						const imports = context.filteredYears?.data.imports[hcKey] as unknown as number
						return tooltip(this.point.color as string, this.point.name, [
							{ label: 'CH Imports', value: `${formatNumber(imports)} MWh` },
						])
					},
				},
				series: [
					{
						type: 'map',
						name: 'Import',
						data: mapData(this.filteredYears?.data.imports || {}),
						states: {
							hover: {
								color: '#000000',
							},
						},
						dataLabels: {
							enabled: true,
							format: '{point.name}',
						},
					},
				],
			}

			// chart configuration for export chart
			const exportOptions: Highcharts.Options = {
				...options,
				colorAxis: {
					type: 'linear',
					minColor: '#efefef',
					maxColor: '#1b5e20',
				},
				tooltip: {
					useHTML: true,
					formatter: function () {
						const point = this.point
						const hcKey = point.properties['hc-key']
						const exports = context.filteredYears?.data.exports[hcKey] as unknown as number
						return tooltip(this.point.color as string, this.point.name, [
							{ label: 'CH Exports', value: `${formatNumber(exports)} MWh` },
						])
					},
				},
				series: [
					{
						type: 'map',
						name: 'Export',
						data: mapData(this.filteredYears?.data.exports || {}),
						states: {
							hover: {
								color: '#000000',
							},
						},
						dataLabels: {
							enabled: true,
							format: '{point.name}',
						},
					},
				],
			}

			// chart configuration for netto chart
			const nettoOptions: Highcharts.Options = {
				...options,
				colorAxis: {
					type: 'linear',
					stops: [
						[0, '#1b5e20'],
						[0.5, '#efefef'],
						[1, '#b71c1c'],
					],
				},
				tooltip: {
					useHTML: true,
					formatter: function () {
						const point = this.point
						const hcKey = point.properties['hc-key']
						const imports = context.filteredYears?.data.imports[hcKey] as unknown as number
						const exports = context.filteredYears?.data.exports[hcKey] as unknown as number
						const pointValue = point.value as number
						return tooltip(this.point.color as string, this.point.name, [
							{ label: 'CH Exports', value: `${formatNumber(imports)} MWh` },
							{ label: 'CH Imports', value: `${formatNumber(exports)} MWh` },
							{ label: 'Netto', value: `${formatNumber(pointValue)} MWh` },
						])
					},
				},
				series: [
					{
						type: 'map',
						name: 'Netto',
						data: mapData(this.filteredYears?.data.netto || {}),
						states: {
							hover: {
								color: '#000000',
							},
						},
						dataLabels: {
							enabled: true,
							format: '{point.name}',
						},
					},
				],
			}

			this.chartImport = Highcharts.mapChart('chartMapImport', importOptions)
			this.chartExport = Highcharts.mapChart('chartMapExport', exportOptions)
			this.chartNetto = Highcharts.mapChart('chartMapNetto', nettoOptions)
		},
		updateChart() {
			// need for access to parent context within Highcharts callbacks
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			const context = this

			this.chartExport?.update({
				tooltip: {
					useHTML: true,
					formatter: function () {
						const point = this.point
						const hcKey = point.properties['hc-key']
						const exports = context.filteredYears?.data.exports[hcKey] as unknown as number
						return tooltip(this.point.color as string, this.point.name, [
							{ label: 'CH Exports', value: `${formatNumber(exports)} MWh` },
						])
					},
				},
				series: [
					{
						type: 'map',
						name: 'Export',
						data: mapData(context.filteredYears?.data.exports),
					},
				],
			})

			this.chartImport?.update({
				tooltip: {
					useHTML: true,
					formatter: function () {
						const point = this.point
						const hcKey = point.properties['hc-key']
						const imports = context.filteredYears?.data.imports[hcKey] as unknown as number
						return tooltip(this.point.color as string, this.point.name, [
							{ label: 'CH Imports', value: `${formatNumber(imports)} MWh` },
						])
					},
				},
				series: [
					{
						type: 'map',
						name: 'Import',
						data: mapData(context.filteredYears?.data.imports),
					},
				],
			})

			this.chartNetto?.update({
				tooltip: {
					useHTML: true,
					formatter: function () {
						const point = this.point
						const hcKey = point.properties['hc-key']
						const imports = context.filteredYears?.data.imports[hcKey] as unknown as number
						const exports = context.filteredYears?.data.exports[hcKey] as unknown as number
						const pointValue = point.value as number
						return tooltip(this.point.color as string, this.point.name, [
							{ label: 'CH Exports', value: `${formatNumber(imports)} MWh` },
							{ label: 'CH Imports', value: `${formatNumber(exports)} MWh` },
							{ label: 'Netto', value: `${formatNumber(pointValue)} MWh` },
						])
					},
				},
				series: [
					{
						type: 'map',
						name: 'Netto',
						data: mapData(context.filteredYears?.data.netto),
					},
				],
			})
		},
		handleRangeChange(value: number) {
			this.yearToShow = value
			this.updateChart()
		},
	},
	mounted() {
		this.createChart()
	},
})
</script>
