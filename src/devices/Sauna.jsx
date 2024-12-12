import React, { useState } from 'react';
import axios from "axios";

const Sauna = () => {
  const [power, setPower] = useState(6); // kW
  const [volume, setVolume] = useState(15); // m³
  const [targetTemp, setTargetTemp] = useState(80); // °C
  const [userDuration, setUserDuration] = useState(1); // hours
  const [length, setLength] = useState(2); // meters
  const [width, setWidth] = useState(2); // meters
  const [height, setHeight] = useState(2.5); // meters
  const [useMeasurements, setUseMeasurements] = useState(false); // Toggle between volume and measurements

  const startTemp = 20; // °C
  const efficiencyConstant = 100; // Arbitrary

  // Pre-heat duration formula
  const preHeatDuration = (
    (volume * (targetTemp - startTemp)) /
    (power * efficiencyConstant)
  );
  const calculatedVolume = length * width * height;

  const totalDuration = preHeatDuration + userDuration;
  const consumption = power * totalDuration;

  const averageConsumption = 20; // kWh, daily avg in Finland

  const saveToDatabase = async (event) => {
    event.preventDefault();
    const response = await axios.get("http://localhost:3001/consumption");
    const devices = response.data;
    const sauna = {
      name: "Sauna",
      consumption: consumption,
    };
    if (!devices.map((device) => device.name).includes("Sauna")) {
      await axios.post("http://localhost:3001/consumption", sauna);
    } else {
      const saunaToUpdate = devices.find(
        (device) => device.name === "Sauna"
      );
      await axios.put(
        `http://localhost:3001/consumption/${saunaToUpdate.id}`,
        sauna
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-4">Sauna Electricity Calculator</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        
        {/* Stove power */}
        <label className="block mb-2 font-medium">Stove Power (kW)</label>
        <input
          type="number"
          min="2"
          max="36"
          step="0.1"
          value={power}
          onChange={(e) => setPower(Number(e.target.value))}
          className="w-full p-2 border rounded"
        />
        <p className="text-gray-600 flex justify-end">Typical: 5-10 kW</p>

        {/* Room volume / measurements toggle */}
        <div className="mt-4">
          <div className="flex gap-4">
            <button
              onClick={() => setUseMeasurements(false)}
              className={`px-4 py-2 rounded ${!useMeasurements ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Room Volume
            </button>
            <button
              onClick={() => setUseMeasurements(true)}
              className={`px-4 py-2 rounded ${useMeasurements ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Room Measurements
            </button>
          </div>
        </div>

        {/* Conditional rendering for volume / measurements */}
        {!useMeasurements ? (
          <div className="mt-4">
            <label className="block mb-2 font-medium">Room Volume (m³)</label>
            <input
              type="number"
              min="5"
              max="30"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
            <p className="text-gray-600 flex justify-end">Typical: 10-20 m³</p>
          </div>
        ) : (
          <div className="mt-4">
            <label className="block mb-2 font-medium">Room Measurements (meters)</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                min="1"
                step="0.1"
                placeholder="Length"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="p-2 border rounded"
              />
              <input
                type="number"
                min="1"
                step="0.1"
                placeholder="Width"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="p-2 border rounded"
              />
              <input
                type="number"
                min="1"
                step="0.1"
                placeholder="Height"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="p-2 border rounded"
              />
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Room Volume: {calculatedVolume.toFixed(2)} m³</p>
              <p>Typical: 10-20 m³</p>
            </div>
          </div>
        )}

        {/* Temperature */}
        <label className="block mt-4 mb-2 font-medium">Target Temperature (°C)</label>
        <input
          type="range"
          min="60"
          max="100"
          step="5"
          value={targetTemp}
          onChange={(e) => setTargetTemp(Number(e.target.value))}
          className="w-full p-2 border rounded"
        />
        <div className="flex justify-between text-gray-600">
          <p>Selected: {targetTemp} °C</p>
          <p>Typical: 70-90°C</p>
        </div>

        {/* Duration */}
        <label className="block mt-4 mb-2 font-medium">Duration After Pre-heating (hours)</label>
        <input
          type="range"
          min="0.25"
          max="4"
          step="0.25"
          value={userDuration}
          onChange={(e) => setUserDuration(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-gray-600">Selected: {userDuration} hours</p>

        {/* Results */}
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p className="text-lg font-bold">Pre-heat Duration: {preHeatDuration.toFixed(2)} hours</p>
          <p className="text-lg font-bold">Total Duration: {totalDuration.toFixed(2)} hours</p>
          <p className="text-lg font-bold">Estimated Consumption: {consumption.toFixed(2)} kWh</p>
          <p className="text-sm text-gray-600">
            This is about {(consumption / averageConsumption * 100).toFixed(1)}% of the average daily electricity consumption in Finland.
          </p>
        </div>

        {/* Save */}
        <div className="mt-4">
          <button
            onClick={saveToDatabase}
            className={`px-4 py-2 rounded ${useMeasurements ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sauna;