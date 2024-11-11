fetch('./data/stromproduktion_swissgrid.json')
    .then(response => response.json())
    .then(data => {
        Highcharts.chart('chart1', {
            chart: {
                backgroundColor: 'transparent',
                type: 'column'
            }, 
            title: false,
            credits: {
                enabled: false
            },
            xAxis: {
                categories: data[0].data.map((_, index) => index + 2014) 
            },
            yAxis: {
                title: {
                    text: 'Produktion (GWh)'
                }
            },
            tooltip: {
                valueSuffix: ' GWh'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false
                    },
                },
                series: {
                    // borderRadius: '25%'
                    
                }
            },
            series: data
        });
    })
    .catch(error => console.error('Error fetching the JSON data:', error));


    fetch('./data/einfuhr_ausfuhr.json')
    .then(response => response.json())
    .then(data => {
        Highcharts.chart('chart2', {
            chart: {
                backgroundColor: 'transparent',
                type: 'column',
            },
            title: false,
            credits: {
                enabled: false
            },
            xAxis: {
                categories: data[0].data 
            },
            yAxis: {
                title: {
                    text: 'Produktion (GWh)'
                }
            },
            tooltip: {
                valueSuffix: ' GWh'
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: false
                    },
                },
                series: {
                    // borderRadius: '25%'
                    
                }
            },
            series: data.slice(1)
        });
    })
    .catch(error => console.error('Error fetching the JSON data:', error));



fetch('./data/erzeugung.json')
    .then(response => response.json())
    .then(data => {
        Highcharts.chart('chart3', {
            chart: {
                backgroundColor: 'transparent',
                type: 'area',
            },
            title: false,
            credits: {
                enabled: false
            },
            xAxis: {
                categories: data[0].data.map((year) => year) 
            },
            yAxis: {
                title: {
                    text: 'Produktion (GWh)'
                }
            },
            tooltip: {
                valueSuffix: ' GWh'
            },
            plotOptions: {
                area: {
                    stacking: 'percent',
                    marker: {
                        enabled: false
                    }
                },
                series: {
                    // borderRadius: '25%'
                    
                }
            },
            series: data.slice(1)
        });
    })
    .catch(error => console.error('Error fetching the JSON data:', error));