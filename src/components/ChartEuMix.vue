<script lang="ts">
import { defineComponent } from 'vue'
import * as Highcharts from 'highcharts'
import HighchartsAccessibility from 'highcharts/modules/accessibility'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'

import { tooltip } from '../utils/chartTooltip'
import { genericOptions } from '../utils/highchartsOptions'
import formatNumber from '../utils/formatNumber'

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
      const options: Highcharts.Options = {
        ...genericOptions,
        chart: {
          backgroundColor: 'white',
          type: 'bar',
          height: null,
        },
        title: {
          text: '',
        },
        credits: {
          enabled: false,
        },
        // axes are inverted
        yAxis: {
          title: {
            text: 'Percentage',
          },
        },
        xAxis: {
          categories: data[0].data.map((country) => country.toString()),
          title: {
            text: 'Countries',
          },
          labels: {
            step: 1,
          },
        },
        tooltip: {
          valueSuffix: 'GWh',
          useHTML: true,
          formatter: function () {
            console.log(this)
            return tooltip(this.point.color as string, this.series.name, [
              { label: 'Country', value: this.key },
              { label: 'Production', value: `${formatNumber(this.point.y)} GWh` },
              { label: 'Percentage', value: `${formatNumber(this.point.percentage)} %` },
            ])
          },
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
          color: ['#4CB19E', '#6D6D6D', '#E4C54E'][index % 3],
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

      //const filteredYears = this.years.filter((year) => year >= minYear && year <= maxYear)
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
  <div id="ChartEuMix" class="h-screen-2/3"></div>
</template>
