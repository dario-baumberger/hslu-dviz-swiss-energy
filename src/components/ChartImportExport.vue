<template>
  <div id="chart2" class="h-full"></div>
  <InputRange
    v-if="min !== undefined && max !== undefined && knob1 !== undefined && knob2 !== undefined"
    :min="min"
    :max="max"
    :low="knob1"
    :high="knob2"
    @changed="handleRangeChange"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Highcharts from 'highcharts'
import InputRange from './InputRange.vue'
import { tooltip } from '../utils/chartTooltip'
import HighchartsAccessibility from 'highcharts/modules/accessibility'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import { genericOptions } from '../utils/highchartsOptions'
import formatNumber from '../utils/formatNumber'
import einfuhr_ausfuhr from '../data/einfuhr_ausfuhr.json'

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
      originalData: einfuhr_ausfuhr,
      years: [],
      chart: null,
    }
  },
  methods: {
    createChart() {
      const options: Highcharts.Options = {
        ...genericOptions,
        chart: {
          backgroundColor: 'white',
          type: 'column',
          style: {
            fontFamily: 'var(--font-serif)',
          },
        },
        title: {
          text: '',
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          categories: this.years.map((year) => year.toString()),
        },
        yAxis: {
          title: {
            text: 'GWh',
          },
        },
        tooltip: {
          useHTML: true,
          formatter: function () {
            return tooltip(this.point.color as string, this.series.name, [
              { label: 'Year', value: this.key },
              { label: 'Production', value: `${formatNumber(this.point.y)} GWh` },
            ])
          },
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: false,
            },
          },
          series: {},
        },
        colors: ['#b71c1c', '#1b5e20'],
        series: this.originalData.slice(1).map((series) => ({
          ...series,
          type: 'column',
        })),
      }

      this.chart = Highcharts.chart('chart2', options)
    },
    handleRangeChange({ low, high }: { low: number; high: number }) {
      this.knob1 = low
      this.knob2 = high
      this.updateChart()
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
        data: series.data.slice(startIndex + 1, endIndex),
      }))

      this.chart?.update({
        xAxis: {
          categories: filteredYears.map((year) => year.toString()),
        },
        series: filteredData.slice(1) as Highcharts.SeriesOptionsType[],
      })
    },
  },
  mounted() {
    this.years = this.originalData[0].data

    this.min = Math.min(...this.years)
    this.max = Math.max(...this.years)
    this.knob1 = this.min
    this.knob2 = this.max

    this.createChart()
    if (window.innerWidth < 768 && this.max - 7 > this.min) {
      this.knob1 = this.max - 7
      this.updateChart()
    }
  },
})
</script>
