import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CostChart = () => {
  const [devices, setDevices] = useState([]);
  const [excludedDevices, setExcludedDevices] = useState([]);
  const [data, setData] = useState({
    labels: ["Monthly Cost", "Cost Excluding Selected"],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3001/consumption");
      const devicesData = response.data;
      setDevices(devicesData);

      const totalCost = devicesData.reduce(
        (sum, device) => sum + device.consumption * 0.15,
        0
      );

      setData({
        labels: ["Monthly Cost", "Cost Excluding Selected"],
        datasets: [
          {
            label: "Cost in EUR",
            data: [totalCost.toFixed(2), totalCost.toFixed(2)],
            backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)"],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"],
            borderWidth: 1,
          },
        ],
      });
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (deviceName) => {
    setExcludedDevices((prev) =>
      prev.includes(deviceName)
        ? prev.filter((name) => name !== deviceName)
        : [...prev, deviceName]
    );
  };

  useEffect(() => {
    const totalCost = devices.reduce(
      (sum, device) => sum + device.consumption * 0.15,
      0
    );

    const excludedCost = devices
      .filter((device) => excludedDevices.includes(device.name))
      .reduce((sum, device) => sum + device.consumption * 0.15, 0);

    const updatedData = {
      labels: ["Monthly Cost", "Cost Excluding Selected"],
      datasets: [
        {
          label: "Cost in EUR",
          data: [totalCost.toFixed(2), totalCost.toFixed(2) - excludedCost.toFixed(2)],
          backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)"],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"],
          borderWidth: 1,
        },
      ],
    };

    setData(updatedData);
  }, [excludedDevices, devices]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Monthly Electricity Cost</h1>

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Exclude Devices:</h2>
        <div className="flex flex-wrap gap-4">
          {devices.map((device) => (
            <label key={device.name} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={excludedDevices.includes(device.name)}
                onChange={() => handleCheckboxChange(device.name)}
              />
              {device.name}
            </label>
          ))}
        </div>
      </div>

      <Bar data={data} options={{ responsive: true }} />
    </div>
  );
};

export default CostChart;