// todo: make nice
export function tooltip(
  color: string | undefined,
  title: string | undefined,
  values: Array<{ label: string | undefined; value: string | undefined }>,
) {
  let tooltip = `<span class="flex flex-col gap-1 bg-white">`
  tooltip += `<span class="flex flex-row gap-1 bg-white items-center">`
  if (color) {
    tooltip += `<span class="inline-block w-2 h-2 rounded-full" style="background-color: ${color}"></span>`
  }

  if (title) {
    tooltip += `<span class="text-xs">${title}</span>`
  }

  tooltip += `</span>`

  for (const { label, value } of values) {
    tooltip += `<span class="flex justify-between gap-2"><span>${label}: </span><span>${value}</span></span>`
  }

  tooltip += '</span>'

  return tooltip
}
