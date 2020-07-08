import React, { useState, useEffect } from 'react';
import { Pie, defaults } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

defaults.global.defaultFontFamily = "Gill Sans";

const PieChart = ({ data, labels }) => {
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
            text: 'GDP Split (%)',
            fontSize: 20
        },
        legend: {
            display: true,
            position: dimensions >= 768 ? 'right' : 'bottom'
        },
        plugins: {
            datalabels: {
                display: false,
            }
        },
    }

    return (
        <div className="pie-chart">
            <Pie options={options} data={{
                labels,
                datasets: [
                    {
                        // label: 'Rainfall',
                        backgroundColor: [
                            '#ef3c42',
                            '#53c025',
                            '#7328b6',
                            '#ffff2d',
                            '#4592ca',
                            '#f4aa2f',
                            '#3438bd',
                            '#f25e40',
                            '#a7d52a',
                            '#fdf32f',
                            '#b528c5',
                            '#f6c137',
                            '#3a57bf',
                            '#dd3371',
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

export default PieChart
