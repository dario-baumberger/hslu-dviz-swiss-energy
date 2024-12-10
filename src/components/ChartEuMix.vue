<script lang="ts">
import { defineComponent } from 'vue'
import * as Highcharts from 'highcharts'
import InputRange from './InputRange.vue'

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
      min: undefined,
      max: undefined,
      knob1: undefined,
      knob2: undefined,
      originalData: [],
      years: [],
      chart: null,
    }
  },
  methods: {
    createChart(data: ProductionData[]) {
      console.log(data[0].data)
      const options: Highcharts.Options = {
        chart: {
          backgroundColor: 'transparent',
          type: 'bar',
        },
        title: {
          text: '',
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          categories: Array.from({ length: 101 }, (_, i) => i.toString()), // Create array from 0 to 100
          title: {
            text: 'Percentage',
          },
        },
        yAxis: {
          categories: data[0].data.map((country) => country.toString()), // Display data[0] on the left side
          title: {
            text: 'Countries',
          },
        },
        tooltip: {
          valueSuffix: ' GWh',
        },
        plotOptions: {
          series: {
            stacking: 'percent',
            dataLabels: {
              enabled: false,
            },
          },
        },
        series: data.slice(1).map((series, index) => ({
          ...series,
          color: ['#77c3aa', '#9d9d9c', '#edd76d'][index % 3], // Assign colors to series
        })) as Highcharts.SeriesOptionsType[],
      }

      this.chart = Highcharts.chart('ChartEuMix', options)
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
        /*  xAxis: {
          categories: filteredYears.map((year) => year.toString()),
        }, */
        series: filteredData as Highcharts.SeriesOptionsType[],
      })
    },
    handleRangeChange({ low, high }: { low: number; high: number }) {
      this.knob1 = low
      this.knob2 = high
      this.updateChart()
    },
  },
  mounted() {
    fetch('./data/energiemix_eu.json')
      .then((response) => response.json())
      .then((data: ProductionData[]) => {
        //this.years = data[0].data
        console.log(data)
        this.originalData = data
        //this.min = Math.min(...this.years)
        //this.max = Math.max(...this.years)
        //this.knob1 = this.min
        //this.knob2 = this.max

        this.createChart(data)
      })
      .catch((error) => console.error('Error fetching the JSON data:', error))
  },
})
</script>

<template>
  <div id="ChartEuMix" class="h-full"></div>
</template>
