import React, { useEffect, useState } from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

defaults.global.defaultFontFamily = "Gill Sans";

const Chart = ({ data, income, title, year }) => {
    const [dimensions, setDimensions] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setDimensions(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dimensions]);

    const labels = year === '2018' ? ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017',
        '2018'] : year === '11' ? ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017',
            '2018', '2019', '2020 (May)'] : year === '10' ? ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017',
                '2018', '2019'] : ['2011', '2012', '2013', '2014', '2015', '2016', '2017',
                    '2018', '2019'];
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        labels: labels,

        legend: {
            position: 'bottom'
        },
        tooltips: {
            mode: 'label'
        },
        layout: {
            padding: {

            }
        },
        elements: {
            line: {
                fill: false
            }
        },
        title: {
            display: true,
            text: title,
            fontSize: 20,
            padding: 20
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: false
                    },

                    labels: labels
                }
            ],
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    gridLines: {
                        display: false
                    },
                    labels: {
                        show: true
                    },
                    ticks: {
                        callback: value => {
                            if (income) {
                                return `$${(+value).toLocaleString()}`
                            } else {
                                return `${(+value).toLocaleString()}`
                            }
                        }
                    }
                },
                {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        display: false
                    },
                    labels: {
                        show: true
                    },
                    ticks: {
                        callback: value => `${value}%`
                    }
                }
            ]
        },
        events: [],
        plugins: {
            // datalabels: {
            //     display: false
            // }
        }
    };

    return (
        <div className="mt-1" style={{ position: 'relative', width: '100%', height: '300px' }}>
            <Bar data={{
                datasets: [
                    {
                        label: title === 'Metro Unemployment' ? `${title.split(' ')[1]} Rate` : `${title.split(' ')[1]} Growth`,
                        // label: "Population Growth",
                        yAxisID: 'y-axis-2',
                        backgroundColor: '#a1caf1',
                        borderColor: '#7a7a7a',
                        borderWidth: 2,
                        type: 'line',
                        data: data.growth,
                        datalabels: {
                            align: 'end',
                            anchor: 'end',
                            display: dimensions >= 768 ? 'auto' : false,
                            clamp: true,
                            labels: {
                                title: {
                                    font: {
                                        weight: 'bold'
                                    }
                                }
                            },
                            color: 'black',
                            formatter: value => `${value}%`
                        }
                    },
                    {
                        label: `${title.split(' ')[1]}`,
                        backgroundColor: '#a1caf1',
                        // borderColor: '#a1caf1',
                        // borderWidth: 2,
                        type: 'bar',
                        data: data.total,
                        yAxisID: 'y-axis-1',
                        datalabels: {
                            align: 'end',
                            anchor: 'end',
                            display: dimensions >= 768 ? 'auto' : false,
                            color: 'black',
                            clamp: true,
                            labels: {
                                title: {
                                    font: {
                                        weight: 'bold'
                                    }
                                }
                            },
                            formatter: value => {
                                if (income) {
                                    return `$${(+value).toLocaleString()}`
                                } else {
                                    return (+value).toLocaleString()
                                }
                            }
                        }
                    }
                ]
            }}
                options={options}
            />
        </div>
    )
}

export default Chart
