<template>
  <div>
    <div id="chartExport2" class="h-full"></div>
    <div class="flex h-auto w-full flex-col">
      <div class="relative h-auto min-h-4 pt-10 pb-5">
        <span class="absolute top-0 left-0">{{ min }}</span>
        <span class="absolute top-0 right-0">{{ max }}</span>
        <input
          class="appearance-none h-1 w-full absolute pointer-events-none bg-slate-200"
          type="range"
          v-model.number="knob1"
          :min="min"
          :max="max"
          @input="updateChart"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Highcharts from 'highcharts/highmaps'
import topology from '@highcharts/map-collection/countries/ch/ch-all.topo.json'

type ProductionData = {
  name: string
  data: number[]
}

type ComponentData = {
  min: number | undefined
  max: number | undefined
  knob1: number | undefined
  knob2: number | undefined
  originalData: ProductionData[]
  years: number[]
  chart: Highcharts.Chart | null
}

export default defineComponent({
  data(): ComponentData {
    return {
      min: 0,
      max: 100,
      knob1: 10,
      knob2: 40,
      originalData: [],
      years: [],
      chart: null,
    }
  },
  methods: {
    createChart(years: number[], data: Highcharts.SeriesMapDataOptions[]) {
      const options: Highcharts.Options = {
        chart: {
          map: topology,
        },
        colorAxis: {
          min: 0,
          max: 100,
          type: 'linear',
          minColor: '#E6E7E8',
          maxColor: '#005645',
        },
        title: {
          text: '',
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            type: 'map',
            name: 'Einfuhr',
            data: data,
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
        data: {
          columns: [
            ['ch-fr', 10],
            ['ch-lu', 11],
            ['ch-ni', 12],
            ['ch-vs', 13],
            ['ch-sg', 14],
            ['ch-ar', 15],
            ['ch-ti', 16],
            ['ch-gl', 17],
            ['ch-gr', 18],
            ['ch-sz', 19],
            ['ch-tg', 20],
            ['ch-sh', 21],
            ['ch-ur', 22],
            ['ch-zh', 23],
            ['ch-zg', 24],
            ['ch-vd', 25],
            ['ch-bl', 26],
            ['ch-be', 27],
            ['ch-bs', 28],
            ['ch-so', 29],
            ['ch-nw', 30],
            ['ch-ai', 31],
            ['ch-ge', 32],
            ['ch-ju', 33],
            ['ch-ne', 34],
            ['ch-ag', 35],
          ],
        },
      }

      this.chart = Highcharts.mapChart('chartExport2', options)
    },
    updateChart() {
      if (!(this.knob1 && this.knob2 && this.min && this.max)) {
        return
      }

      const minYear = this.knob1
      const maxYear = this.knob2

      const filteredYears = this.years.filter((year) => year >= minYear && year <= maxYear)
      const startIndex = this.years.indexOf(minYear)
      const endIndex = this.years.indexOf(maxYear) + 1

      const filteredData = this.originalData.map((series) => ({
        ...series,
        data: series.data.slice(startIndex, endIndex),
      }))

      this.chart?.update({
        xAxis: {
          categories: filteredYears.map((year) => year.toString()),
        },
        series: filteredData as Highcharts.SeriesOptionsType[],
      })
    },
  },
  mounted() {
    fetch('./data/einfuhr_ausfuhr.json')
      .then((response) => response.json())
      .then((data) => {
        this.years = data[0].data
        this.originalData = data

        this.min = Math.min(...this.years)
        this.max = Math.max(...this.years)
        this.knob1 = this.min
        this.knob2 = this.max
        console.log(this.knob2, this.max)

        data = {
          data: [
            ['ch-fr', 10],
            ['ch-lu', 11],
            ['ch-ni', 12],
            ['ch-vs', 13],
            ['ch-sg', 14],
            ['ch-ar', 15],
            ['ch-ti', 16],
            ['ch-gl', 17],
            ['ch-gr', 18],
            ['ch-sz', 19],
            ['ch-tg', 20],
            ['ch-sh', 21],
            ['ch-ur', 22],
            ['ch-zh', 23],
            ['ch-zg', 24],
            ['ch-vd', 25],
            ['ch-bl', 26],
            ['ch-be', 27],
            ['ch-bs', 28],
            ['ch-so', 29],
            ['ch-nw', 30],
            ['ch-ai', 31],
            ['ch-ge', 32],
            ['ch-ju', 33],
            ['ch-ne', 34],
            ['ch-ag', 35],
          ],
        } as Highcharts.SeriesMapDataOptions

        this.createChart(this.years, data)
      })
      .catch((error) => console.error('Error fetching the JSON data:', error))
  },
})
</script>
