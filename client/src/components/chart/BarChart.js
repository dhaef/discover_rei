import React, { useState, useEffect } from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
// import { plugins } from 'chart.js';

defaults.global.defaultFontFamily = "Gill Sans";

const BarChart = ({ data }) => {
    const [dimensions, setDimensions] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setDimensions(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dimensions]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Annual Severe Weather Property Damage',
            fontSize: 20,
            padding: 20
        },
        legend: {
            display: false,
        },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
                display: dimensions >= 768 ? true : false,
                // position: 'top',
                labels: {
                    title: {
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                color: 'black',
                formatter: value => `$${value.toLocaleString()}`
            }
        },
        events: [],
        // scaleLabel: value => `$${(+value).toLocaleString()}`
        // ticks: {
        //     callback: value => `$${(+value).toLocaleString()}`
        // }
        scales: {
            yAxes: [{
                type: 'linear',
                ticks: {
                    callback: value => `$${value.toLocaleString()}`
                }
            }]
        }
    }

    return (
        <div className="mt-1" style={{ position: 'relative', width: '100%', height: '300px' }}>
            <Bar options={options} data={{
                labels: ['2015', '2016', '2017', '2018', '2019', '2020'],
                datasets: [
                    {
                        // label: 'Rainfall',
                        backgroundColor: '#a1caf1',
                        // borderColor: 'rgba(0,0,0,1)',
                        // borderWidth: 2,
                        data
                    }
                ]
            }} />
        </div>
    )
}

export default BarChart