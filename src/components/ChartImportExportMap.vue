<template>
  <div class="flex flex-col md:flex-row gap-4 justify-center md:max-w-none mx-auto">
    <div class="w-full">
      <h2 class="text-xl mb-4 font-sans text-center">Import into CH</h2>
      <div id="chartMapImport" class="h-screen-1/2 w-full hidden md:block"></div>
    </div>
    <div class="w-full">
      <h2 class="text-xl mb-4 font-sans text-center">Import from CH</h2>
      <div id="chartMapExport" class="h-screen-1/2 w-full hidden md:block"></div>
    </div>
    <div class="w-full">
      <h2 class="text-xl mb-4 font-sans text-center">Netto Import Export</h2>
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

HighchartsAccessibility(Highcharts)
HighchartsExporting(Highcharts)
HighchartsExportData(Highcharts)

interface YearlyData {
  name: number
  data: {
    exports: [string, number][]
    imports: [string, number][]
    netto: [string, number][]
  }
}

type ComponentData = {
  min: number | undefined
  max: number | undefined
  yearToShow: number | undefined
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

export default defineComponent({
  components: {
    InputSlide,
  },
  data(): ComponentData {
    return {
      min: undefined,
      max: undefined,
      yearToShow: undefined,
      originalData: [],
      years: [],
      chartImport: undefined,
      chartExport: undefined,
      chartNetto: undefined,
    }
  },
  methods: {
    createChart(years: number[], data: YearlyData[]) {
      const filteredYears = data.find((year) => year.name === this.yearToShow)

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

      const importOptions: Highcharts.Options = {
        ...options,
        title: {
          text: '',
        },
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
            const exports = filteredYears?.data.exports[hcKey] as unknown as number
            return tooltip(this.point.color as string, this.point.name, [
              { label: 'CH Imports', value: `${formatNumber(exports)} MWh` },
            ])
          },
        },
        series: [
          {
            type: 'map',
            name: 'Import',
            data: mapData(filteredYears?.data.imports),
            states: {
              hover: {
                color: '#f44336',
              },
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}',
            },
          },
        ],
      }
      const exportOptions: Highcharts.Options = {
        ...options,
        title: {
          text: '',
        },
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
            const imports = filteredYears?.data.imports[hcKey] as unknown as number

            return tooltip(this.point.color as string, this.point.name, [
              { label: 'CH Exports', value: `${formatNumber(imports)} MWh` },
            ])
          },
        },
        series: [
          {
            type: 'map',
            name: 'Export',
            data: mapData(filteredYears?.data.exports),
            states: {
              hover: {
                color: '#4caf50',
              },
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}',
            },
          },
        ],
      }

      const nettoOptions: Highcharts.Options = {
        ...options,
        title: {
          text: '',
        },
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
            const imports = filteredYears?.data.imports[hcKey] as unknown as number
            const exports = filteredYears?.data.exports[hcKey] as unknown as number
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
            data: mapData(filteredYears?.data.netto),
            states: {
              hover: {
                color: '#0000FF',
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
      const filteredYears = this.originalData.find((item) => item.name === this.yearToShow)

      this.chartExport?.update({
        series: [
          {
            type: 'map',
            name: 'Export',
            data: mapData(filteredYears?.data.exports),
            states: {
              hover: {
                color: '#BADA55',
              },
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}',
            },
          },
        ],
      })

      this.chartImport?.update({
        series: [
          {
            type: 'map',
            name: 'Import',
            data: mapData(filteredYears?.data.imports),
            states: {
              hover: {
                color: 'red',
              },
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}',
            },
          },
        ],
      })

      this.chartNetto?.update({
        series: [
          {
            type: 'map',
            name: 'Import',
            data: mapData(filteredYears?.data.netto),
            states: {
              hover: {
                color: 'red',
              },
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}',
            },
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
    fetch('./data/ogd107_strom_import_export.json')
      .then((response) => response.json())
      .then((data) => {
        this.years = data.map((item: YearlyData) => item.name)
        this.originalData = data
        this.min = Math.min(...this.years)
        this.max = Math.max(...this.years)
        this.yearToShow = this.max

        this.createChart(this.years, data)
      })
      .catch((error) => console.error('Error fetching the JSON data:', error))
  },
})
</script>
