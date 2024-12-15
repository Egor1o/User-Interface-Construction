import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  const [totalConsumption, setTotalConsumption] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3001/consumption");
      const consumptionData = response.data;

      const labels = consumptionData.map((device) => device.name);
      const values = consumptionData.map((device) => device.consumption);

      const total = values.reduce((sum, val) => sum + val, 0);
      setTotalConsumption(total.toFixed(2));

      setData({
        labels,
        datasets: [
          {
            label: "kWh",
            data: values,
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)", // Teal
              "rgba(153, 102, 255, 0.6)", // Purple
              "rgba(255, 159, 64, 0.6)", // Orange
              "rgba(217, 55, 64, 0.6)", // Reddish
              "rgba(255, 124, 87, 0.6)", // Salmon
              "rgba(54, 162, 235, 0.6)", // Light Blue
              "rgba(201, 203, 207, 0.6)", // Light Gray
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)", // Teal
              "rgba(153, 102, 255, 1)", // Purple
              "rgba(255, 159, 64, 1)", // Orange
              "rgba(96, 113, 28, 1)", // Yellow-Green
              "rgba(255, 124, 87, 1)", // Salmon
              "rgba(54, 162, 235, 1)", // Light Blue
              "rgba(128, 128, 128, 1)", // Gray
            ],
            borderWidth: 1,
          },
        ],
      });
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const totalConsumption = data.datasets[0].data.reduce(
              (sum, val) => sum + val,
              0
            );

            const value = tooltipItem.raw;
            const consumptionPercentage = (value / totalConsumption) * 100;
            return `${value} kWh (${consumptionPercentage.toFixed(2)}%)`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
        },
        formatter: (value) => `${value} kWh`,
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const device = data.labels[index];
        window.location.href = `/${device.toLowerCase()}`;
      }
    },
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-center">
        Electricity Consumption Distribution
      </h1>
      <Pie data={data} options={options} />
      <p className="mt-4 text-lg font-medium text-center">
        Total Consumption: <span className="font-bold">{totalConsumption} kWh</span>
      </p>
    </div>
  );
};

export default PieChart;