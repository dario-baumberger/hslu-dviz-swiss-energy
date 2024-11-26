<template>
  <div>
    <div id="chart2" class="h-full"></div>
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
        <input
          class="appearance-none h-1 w-full absolute pointer-events-none bg-slate-200"
          type="range"
          v-model.number="knob2"
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
      years: [],
      chart: null,
    }
  },
  methods: {
    createChart(years: number[], data: Highcharts.SeriesOptionsType[]) {
      const options: Highcharts.Options = {
        chart: {
          backgroundColor: 'transparent',
          type: 'column',
        },
        title: {
          text: '',
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
            dataLabels: {
              enabled: false,
            },
          },
          series: {
            // borderRadius: '25%'
          },
        },
        series: data.slice(1),
      }

      this.chart = Highcharts.chart('chart2', options)
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

        this.createChart(this.years, data)
      })
      .catch((error) => console.error('Error fetching the JSON data:', error))
  },
})
</script>
