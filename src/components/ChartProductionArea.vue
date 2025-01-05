<template>
  <div id="chart3" class="h-full"></div>
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
import type { ProductionData } from '../types/production.types'

import { defineComponent } from 'vue'
import * as Highcharts from 'highcharts'
import InputRange from './InputRange.vue'
import { tooltip } from '../utils/chartTooltip'
import HighchartsAccessibility from 'highcharts/modules/accessibility'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import { genericOptions } from '../utils/highchartsOptions'
import formatNumber from '../utils/formatNumber'
import productionData from '../data/erzeugung-grouped-2.json'

HighchartsAccessibility(Highcharts)
HighchartsExporting(Highcharts)
HighchartsExportData(Highcharts)

/**
 * Data type for the component data.
 */
type ComponentData = {
  min: number
  max: number
  knob1: number
  knob2: number
  originalData: ProductionData[]
  years: number[]
  chart: Highcharts.Chart | null
}

/**
 * Component for the production area chart.
 */
export default defineComponent({
  components: {
    InputRange,
  },
  data(): ComponentData {
    const years = productionData[0].data as number[]
    const min = Math.min(...years)
    const max = Math.max(...years)
    return {
      min: min,
      max: max,
      knob1: min,
      knob2: max,
      originalData: productionData,
      years: years,
      chart: null,
    }
  },
  computed: {
    filteredData(): ProductionData[] {
      const startIndex = this.years.indexOf(this.knob1)
      const endIndex = this.years.indexOf(this.knob2) + 1
      return this.originalData.map((series) => ({
        ...series,
        data: series.data.slice(startIndex, endIndex),
      }))
    },
    filteredYears(): string[] {
      return this.years
        .filter((year) => year >= this.knob1 && year <= this.knob2)
        .map((year) => year.toString())
    },
  },
  methods: {
    createChart() {
      // chart configuration
      const options: Highcharts.Options = {
        ...genericOptions,
        chart: {
          backgroundColor: 'white',
          type: 'area',
          style: {
            fontFamily: 'var(--font-serif)',
            fontWeight: '200',
          },
        },
        lang: {
          decimalPoint: '.',
          thousandsSep: "'",
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
            text: '',
          },
          labels: {
            enabled: false,
          },
        },
        tooltip: {
          useHTML: true,
          formatter: function () {
            return tooltip(this.point.color as string, this.series.name, [
              { label: 'Year', value: this.key },
              { label: 'Production', value: `${formatNumber(this.point.y)} GWh` },
              { label: 'Percentage', value: `${formatNumber(this.point.percentage)} %` },
            ])
          },
        },
        plotOptions: {
          area: {
            stacking: 'percent',
            marker: {
              enabled: false,
            },
          },
          series: {},
        },
        series: this.originalData.slice(1).map((series, index) => ({
          ...series,
          color: ['#4CB19E', '#6D6D6D', '#E4C54E'][index % 3],
        })) as Highcharts.SeriesOptionsType[],
      }

      this.chart = Highcharts.chart('chart3', options)
    },
    updateChart() {
      if (this.chart) {
        this.chart.update({
          xAxis: {
            categories: this.filteredYears,
          },
          series: this.filteredData.slice(1) as Highcharts.SeriesOptionsType[],
        })
      }
    },
    handleRangeChange({ low, high }: { low: number; high: number }) {
      this.knob1 = low
      this.knob2 = high
      this.updateChart()
    },
  },
  mounted() {
    this.createChart()
  },
})
</script>
