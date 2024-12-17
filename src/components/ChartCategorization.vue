<template>
  <div id="chartCategorization" class="h-screen-1/2 w-full" style="height: 66vh"></div>
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
import Highcharts from 'highcharts'
import InputSlide from './InputSlide.vue'
import HighchartsAccessibility from 'highcharts/modules/accessibility'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import { genericOptions } from '../utils/highchartsOptions'
import { tooltip } from '../utils/chartTooltip'
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
  yearToShow: number | undefined
  yearToShowIndex: number
  ungroupedData: ProductionData[]
  groupedData: ProductionData[]
  years: number[]
  chart: Highcharts.Chart | null
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
      yearToShowIndex: -1,
      ungroupedData: [],
      groupedData: [],
      years: [],
      chart: null as Highcharts.Chart | null,
    }
  },
  methods: {
    createChart() {
      const options: Highcharts.Options = {
        ...genericOptions,
        chart: {
          backgroundColor: 'white',
          type: 'pie',
          spacingTop: 0,
          spacingRight: 0,
          spacingBottom: 0,
          spacingLeft: 0,
          margin: [0, 0, 0, 0],
        },
        tooltip: {
          valueSuffix: 'GWh',
          useHTML: true,
          formatter: function () {
            return tooltip(this.point.color as string, this.point.name, [
              { label: 'Production', value: `${formatNumber(this.point.y)} GWh` },
              { label: 'Percentage', value: `${formatNumber(this.point.percentage)} %` },
            ])
          },
        },
        plotOptions: {
          pie: {
            shadow: false,
            center: ['50%', '50%'],
            innerSize: '50%',
            dataLabels: {
              enabled: true,
              distance: 50,
            },
          },
        },
        series: [
          {
            name: 'Categories',
            type: 'pie',
            size: '60%',
            innerSize: '60%',
            borderWidth: 1,

            colors: [
              '#66C7B6',
              '#3A8C80',
              '#6EC7A1',
              '#90D4B4',
              '#5B9F88',
              '#7EAF92',
              '#8FBF9E',
              '#A0A0A0',
              '#E4C54E',
            ],
            data: this.ungroupedData.slice(1).map((series) => {
              return {
                name: series.name,
                y: series.data[this.yearToShowIndex],
              }
            }),
          },
          {
            name: 'Details',
            type: 'pie',
            size: '40%',
            innerSize: '50%',
            borderWidth: 1,
            colors: ['#4CB19E', '#6D6D6D', '#E4C54E'],
            data: this.groupedData.slice(1).map((series) => {
              return {
                name: series.name,
                y: series.data[this.yearToShowIndex],
              }
            }),
          },
        ],
      }

      this.chart = Highcharts.chart('chartCategorization', options)
    },
    handleRangeChange(value: number) {
      this.yearToShow = value
      this.yearToShowIndex = this.years.indexOf(this.yearToShow ?? this.years[-1])
      this.updateChart()
    },
    updateChart() {
      if (!(this.yearToShow && this.min && this.max)) {
        return
      }

      this.chart?.update({
        series: [
          {
            name: 'Categories',
            type: 'pie',
            size: '60%',
            colors: [
              '#66C7B6',
              '#3A8C80',
              '#6EC7A1',
              '#90D4B4',
              '#5B9F88',
              '#7EAF92',
              '#8FBF9E',
              '#A0A0A0',
              '#E4C54E',
            ],
            data: this.ungroupedData.slice(1).map((series) => {
              return {
                name: series.name,
                y: series.data[this.yearToShowIndex],
              }
            }),
          },
          {
            name: 'Details',
            type: 'pie',
            size: '40%',
            colors: ['#4CB19E', '#6D6D6D', '#E4C54E'],
            data: this.groupedData.slice(1).map((series) => {
              return {
                name: series.name,
                y: series.data[this.yearToShowIndex],
              }
            }),
          },
        ],
      })
    },
  },
  mounted() {
    Promise.all([
      fetch('./data/erzeugung.json').then((response) => response.json()),
      fetch('./data/erzeugung-grouped-2.json').then((response) => response.json()),
    ])
      .then(([ungroupedData, groupedData]: [ProductionData[], ProductionData[]]) => {
        this.years = ungroupedData[0].data
        this.min = Math.min(...this.years)
        this.max = Math.max(...this.years)
        this.yearToShow = this.max

        this.yearToShowIndex = this.years.indexOf(this.yearToShow ?? this.years[-1])

        this.ungroupedData = ungroupedData
        this.groupedData = groupedData

        this.createChart()
      })
      .catch((error) => console.error('Error fetching the JSON data:', error))
  },
})
</script>
