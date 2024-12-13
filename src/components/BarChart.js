import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
)
const BarChart = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: []
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/consumption')
            const data = response.data

            const labels = data.map(device => device.name)
            const consumptionData = data.map(device => device.consumption)

            setData({
                labels,
                datasets: [
                    {
                        label: 'kWh',
                        data: consumptionData,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(217, 255, 64, 0.6)',
                            'rgba(255, 124, 87, 0.6)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(96, 113, 28, 1)',
                            'rgba(255, 124, 87, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            })
        }
        fetchData()
    }, [])

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    footer: () => {
                        return 'Click to configure'
                    }
                }
            }
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index
                const device = data.labels[index]
                window.location.href = `/${device.toLowerCase()}`
            }
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Monthly Electricity Consumption</h1>
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarChart