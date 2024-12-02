<template>
  <div>
    <div class="flex flex-col md:flex-row gap-4 justify-center max-w-56 md:max-w-none mx-auto">
      <div id="chartImport3" class="h-full w-full"></div>
      <div id="chartExport3" class="h-full w-full"></div>
    </div>
    <div class="flex h-auto w-full flex-col">
      <div class="relative h-auto min-h-4 pt-10 pb-5">
        <span class="absolute top-0 left-0">{{ min }}</span>
        <span class="absolute top-0 right-0">{{ max }}</span>
        <label v-if="min && max && yearToShow">
          <span class="sr-only">Limit 1</span>
          <input
            class="appearance-none h-1 w-full absolute pointer-events-none bg-slate-200"
            type="range"
            v-model.number="yearToShow"
            :min="min"
            :max="max"
            @input="updateChart"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Highcharts from 'highcharts/highmaps'
import topology from '@highcharts/map-collection/custom/europe.topo.json'

interface YearlyData {
  name: number
  data: {
    exports: [string, number][]
    imports: [string, number][]
  }
}

type ComponentData = {
  min: number
  max: number
  yearToShow: number
  originalData: YearlyData[]
  years: number[]
  chartImport: Highcharts.Chart | null
  chartExport: Highcharts.Chart | null
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
  data(): ComponentData {
    return {
      min: 0,
      max: 100,
      yearToShow: 10,
      originalData: [],
      years: [],
      chartImport: null,
      chartExport: null,
    }
  },
  methods: {
    createChart(years: number[], data: YearlyData[]) {
      const filteredYears = data.find((year) => year.name === this.yearToShow)

      const options: Highcharts.Options = {
        chart: {
          map: topology,
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
          minColor: '#E6E7E8',
          maxColor: '#FF0000',
        },
        series: [
          {
            type: 'map',
            name: 'Import',

            data: mapData(filteredYears?.data.imports),
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
      }
      const exportOptions: Highcharts.Options = {
        ...options,
        title: {
          text: 'Export',
        },
        colorAxis: {
          type: 'linear',
          minColor: '#E6E7E8',
          maxColor: '#005645',
        },
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
      }

      this.chartImport = Highcharts.mapChart('chartImport3', importOptions)
      this.chartExport = Highcharts.mapChart('chartExport3', exportOptions)
    },
    updateChart() {
      console.log('update')

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
    },
  },
  mounted() {
    fetch('./data/ogd107_strom_import_export.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

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
