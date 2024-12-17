<script lang="ts">
import { defineComponent } from 'vue'
import * as Highcharts from 'highcharts'
import InputRange from './InputRange.vue'
import { createTooltipFormatter } from '../utils/chartTooltip'
import HighchartsAccessibility from 'highcharts/modules/accessibility'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import { genericOptions } from '../utils/highchartsOptions'

HighchartsAccessibility(Highcharts)
HighchartsExporting(Highcharts)
HighchartsExportData(Highcharts)

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
  components: {
    InputRange,
  },
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
    createChart(years: number[], data: ProductionData[]) {
      const options: Highcharts.Options = {
        ...genericOptions,
        chart: {
          backgroundColor: 'white',
          type: 'column',
        },
        legend: {
          enabled: false,
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
            text: 'GWh',
          },
        },
        tooltip: {
          valueSuffix: 'GWh',
          useHTML: true,
          formatter: createTooltipFormatter('Year', 'Consumption', false),
        },
        plotOptions: {
          series: {
            stacking: 'normal',
            dataLabels: {
              enabled: false,
            },
          },
        },
        series: data.slice(1) as Highcharts.SeriesOptionsType[],
      }

      this.chart = Highcharts.chart('ChartConsumptionCh', options)
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
        series: filteredData.slice(1) as Highcharts.SeriesOptionsType[],
      })
    },
    handleRangeChange({ low, high }: { low: number; high: number }) {
      this.knob1 = low
      this.knob2 = high
      this.updateChart()
    },
  },
  mounted() {
    fetch('./data/consumption_CH.json')
      .then((response) => response.json())
      .then((data: ProductionData[]) => {
        this.years = data[0].data

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

<template>
  <div id="ChartConsumptionCh" class="h-full"></div>
  <InputRange
    v-if="min !== undefined && max !== undefined && knob1 !== undefined && knob2 !== undefined"
    :min="min"
    :max="max"
    :low="knob1"
    :high="knob2"
    @changed="handleRangeChange"
  />
</template>
