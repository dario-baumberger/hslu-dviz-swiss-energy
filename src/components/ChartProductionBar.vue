<template>
  <div>
    <div id="chart1" class="h-full"></div>
    <div class="flex h-auto w-full flex-col">
      <div class="relative h-auto min-h-4 pt-10 pb-5">
        <span class="absolute top-0 left-0">{{ min }} {{ knob1 }}</span>
        <span class="absolute top-0 right-0">{{ max }} {{ knob2 }}</span>
        <label>
          <span class="sr-only">Limit 1</span>
          <input
            class="appearance-none h-1 w-full absolute pointer-events-none bg-slate-200"
            type="range"
            v-model.number="knob1"
            :min="min"
            :max="max"
            @input="updateChart"
          />
        </label>
        <label>
          <span class="sr-only">Limit 2</span>
          <input
            class="appearance-none h-1 w-full absolute pointer-events-none bg-slate-200"
            type="range"
            v-model.number="knob2"
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
import Highcharts from 'highcharts'

type ProductionData = {
  name: string
  data: number[]
}

type ComponentData = {
  min: number
  max: number
  knob1: number
  knob2: number
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
      years: [] as number[],
      chart: null as Highcharts.Chart | null,
    }
  },
  methods: {
    createChart(years: number[], data: ProductionData[]) {
      const options: Highcharts.Options = {
        chart: {
          backgroundColor: 'transparent',
          type: 'column',
        },
        title: {
          text: 'Stromproduktion in der Schweiz',
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          categories: years.map((year) => year.toString()),
        },
        yAxis: {
          title: {
            text: 'Produktion (GWh)',
          },
        },
        tooltip: {
          valueSuffix: ' GWh',
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: false,
            },
          },
          series: {
            // borderRadius: '25%'
          },
        },
        series: data as Highcharts.SeriesOptionsType[],
      }

      this.chart = Highcharts.chart('chart1', options)
    },
    updateChart() {
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
    fetch('./data/stromproduktion_swissgrid.json')
      .then((response) => response.json())
      .then((data) => {
        this.years = data[0].data.map((_: unknown, index: number) => index + 2014)
        this.originalData = data

        this.min = Math.min(...this.years)
        this.max = Math.max(...this.years)
        this.knob1 = this.min
        this.knob2 = this.max

        this.createChart(this.years, data)
      })
      .catch((error) => console.error('Error fetching the JSON data:', error))
  },
})
</script>
