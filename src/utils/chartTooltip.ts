import Highcharts from 'highcharts'

export function tooltipFormatter(
  this: Highcharts.TooltipFormatterContextObject,
  xLabel: string,
  yLabel: string,
  showPercentage: boolean = true,
): string {
  let tooltip = `<span class="flex flex-col gap-1"><span><span class="inline-block w-2 h-2 rounded-full" style="background-color: ${this.point.color}"></span> <span class="text-xs">${this.series.name}</span></span>
  <span class="flex justify-between gap-2"><span>${xLabel}: </span><span>${this.x}</span></span>`

  if (this.y !== null && this.y !== undefined) {
    // Use type assertion to inform TypeScript about the existence of tooltipOptions
    const series = this.series as Highcharts.Series & { tooltipOptions?: { valueSuffix?: string } }
    const valueSuffix = series.tooltipOptions?.valueSuffix || ''
    tooltip += `<span class="flex justify-between gap-2"><span>${yLabel}: </span><span>${Highcharts.numberFormat(this.y)} ${valueSuffix}</span></span>`
  }

  if (showPercentage && this.point.percentage !== undefined) {
    tooltip += `<span class="flex justify-between gap-2"><span>Percentage: </span><span>${Highcharts.numberFormat(this.point.percentage, 2)}%</span></span>`
  }

  tooltip += '</span>'

  return tooltip
}

export function createTooltipFormatter(
  xLabel: string,
  yLabel: string,
  showPercentage: boolean = true,
) {
  return function (this: Highcharts.TooltipFormatterContextObject) {
    return tooltipFormatter.call(this, xLabel, yLabel, showPercentage)
  }
}
