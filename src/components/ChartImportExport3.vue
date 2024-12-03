<template>
  <div class="flex flex-col md:flex-row gap-4 justify-center md:max-w-none mx-auto">
    <div id="chartImport3" class="h-full w-full hidden md:block"></div>
    <div id="chartExport3" class="h-full w-full hidden md:block"></div>
    <div id="chartNetto3" class="h-full w-full"></div>
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
import topology from '@highcharts/map-collection/custom/european-union.topo.json'
import InputSlide from './InputSlide.vue'
import formatNumber from '../utils/formatNumber'

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
        chart: {
          map: topology,
          animation: false,
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
          text: 'Import',
        },
        colorAxis: {
          type: 'linear',
          minColor: '#efefef',
          maxColor: '#b71c1c',
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
          text: 'Export',
        },
        colorAxis: {
          type: 'linear',
          minColor: '#efefef',
          maxColor: '#1b5e20',
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
          text: 'Netto',
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
            return `
            <b class="text-sm">${point.name}</b><br/>
              <ul>
              <li class="text-xs flex gap-2 justify-between"><span>Imports: </span> <span class="text-right">${formatNumber(imports)} MWh</span></li>
              <li class="text-xs flex gap-2 justify-between"><span>Exports: </span> <span class="text-right">${formatNumber(exports)} MWh</span></li>
              <li class="text-xs flex gap-2 justify-between"><span>Netto: </span> <span class="text-right">${formatNumber(pointValue)} MWh</span></li>
              </ul>
            `
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

      this.chartImport = Highcharts.mapChart('chartImport3', importOptions)
      this.chartExport = Highcharts.mapChart('chartExport3', exportOptions)
      this.chartNetto = Highcharts.mapChart('chartNetto3', nettoOptions)
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
