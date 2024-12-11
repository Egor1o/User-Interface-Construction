import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3001/consumption");
      const consumptionData = response.data;

      const labels = consumptionData.map((device) => device.name);
      const values = consumptionData.map((device) => device.consumption);

      setData({
        labels,
        datasets: [
          {
            label: "Energy Consumption Distribution (%)",
            data: values,
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
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
            return `${consumptionPercentage.toFixed(2)} %`;
          },
          footer: () => {
            return "Click to configure";
          },
        },
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
    </div>
  );
};

export default PieChart;
