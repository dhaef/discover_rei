import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { defaults } from 'react-chartjs-2';
// import { plugins } from 'chart.js';

defaults.global.defaultFontFamily = "Gill Sans";

const TempChart = ({ data }) => {
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
            text: 'Average Monthly Temperature',
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
                formatter: value => `${value}°`
            }
        },
        events: [],
        scales: {
            yAxes: {
                type: 'linear',
                ticks: {
                    callback: value => `${value}°`
                }
            }
        }
    }

    return (
        <div className="mt-1" style={{ position: 'relative', width: '100%', height: '300px' }}>
            <Bar options={options} data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        // label: 'Rainfall',
                        backgroundColor: [
                            +data[0] > 40.1 ? '#eb4034' : '#0392ff',
                            +data[1] > 41 ? '#eb4034' : '#0392ff',
                            +data[2] > 46.6 ? '#eb4034' : '#0392ff',
                            +data[3] > 55.4 ? '#eb4034' : '#0392ff',
                            +data[4] > 63.3 ? '#eb4034' : '#0392ff',
                            +data[5] > 70 ? '#eb4034' : '#0392ff',
                            +data[6] > 78.6 ? '#eb4034' : '#0392ff',
                            +data[7] > 79.9 ? '#eb4034' : '#0392ff',
                            +data[8] > 73.2 ? '#eb4034' : '#0392ff',
                            +data[9] > 62.6 ? '#eb4034' : '#0392ff',
                            +data[10] > 53.6 ? '#eb4034' : '#0392ff',
                            +data[11] > 44.6 ? '#eb4034' : '#0392ff',
                        ],
                        // borderColor: 'rgba(0,0,0,1)',
                        // borderWidth: 2,
                        data
                    }
                ]
            }} />
        </div>
    )
}

export default TempChart
