export const exportSettings = {
  exporting: {
    buttons: {
      contextButton: {
        menuItems: [
          'viewFullscreen',
          'Print',
          'printChart',
          'separator',
          'downloadPNG',
          'downloadJPEG',
          'downloadPDF',
          'downloadSVG',
          'separator',
          'downloadCSV',
          'downloadXLS',
        ],
      },
    },
  },
}

export const genericOptions = {
  title: {
    text: '',
  },
  credits: {
    enabled: false,
  },
  ...exportSettings,
}

export const patterns = [
  {
    id: 'pattern-1',
    path: {
      d: 'M 5 5 L 5 5',
      strokeWidth: 2,
    },
    width: 10,
    height: 10,
    color: '#66C7B6',
  },
  {
    id: 'pattern-2',
    path: {
      d: 'M 0 5 L 10 5',
      strokeWidth: 2,
    },
    width: 10,
    height: 10,
    color: '#3A8C80',
  },
  {
    id: 'pattern-3',
    path: {
      d: 'M 5 0 L 5 10',
      strokeWidth: 2,
    },
    width: 10,
    height: 10,
    color: '#6EC7A1',
  },
  {
    id: 'pattern-4',
    path: {
      d: 'M 0 0 L 10 10 M 10 0 L 0 10',
      strokeWidth: 2,
    },
    width: 10,
    height: 10,
    color: '#90D4B4',
  },
  {
    id: 'pattern-5',
    path: {
      d: 'M 5 5 L 5 5',
      strokeWidth: 2,
    },
    width: 10,
    height: 10,
    color: '#5B9F88',
  },
  {
    id: 'pattern-6',
    path: {
      d: 'M 0 5 L 10 5',
      strokeWidth: 2,
    },
    width: 10,
    height: 10,
    color: '#7EAF92',
  },
  {
    id: 'pattern-7',
    path: {
      d: 'M 5 0 L 5 10',
      strokeWidth: 2,
    },
    width: 10,
    height: 10,
    color: '#8FBF9E',
  },
  {
    id: 'pattern-8',
    path: {
      d: 'M 0 0 L 10 10 M 10 0 L 0 10',
      strokeWidth: 2,
    },
    width: 10,
    height: 10,
    color: '#A0A0A0',
  },
  {
    id: 'pattern-9',
    path: {
      d: 'M 5 5 L 5 5',
      strokeWidth: 2,
    },
    width: 10,
    height: 10,
    color: '#E4C54E',
  },
]
