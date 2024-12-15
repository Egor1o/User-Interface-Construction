import { useState } from 'react';
import ProgressBar from '../components/ProgressBar'; 
import InfoBox from '../components/InfoBox'; 
import axios from "axios";

const Dishwasher = () => {

  const currentPrice = 0.15;
  const monthlyAvgPrice = 0.09;

  const dishwashers = [
    { name: "A", power: 1300, time: 2.1 }, 
    { name: "B", power: 1550, time: 2.1 },
    { name: "C", power: 1800, time: 2.1 },
    { name: "D", power: 2000, time: 2.1 }, 
    { name: "E", power: 2300, time: 2.1 }, 
    { name: "F", power: 2500, time: 2.1 }, 
    { name: "G", power: 2900, time: 2.1 }, 
  ];

  const [showToast, setShowToast] = useState(false); // For save success

  const [selectedModel, setSelectedModel] = useState(dishwashers[2]);


  const [power, setPower] = useState(dishwashers[2].power); // Power in watts
  const [freq, setFreq] = useState(2);
  const [time, setTime] = useState(2.1); // Time in hours
  const [showModal, setShowModal] = useState(false);

  const consumption = ((power / 1000) * time).toFixed(2); // Electricity consumption in kWh
  let monthlyConsumption = consumption * 4 * freq ;
  monthlyConsumption = Math.round((monthlyConsumption) * 100) / 100 ;

  const averageDailyUse = 10; // Average daily electricity use in Finland (kWh)
  const averageMonthlyUse = averageDailyUse * 30;

  const percentage = ((monthlyConsumption / averageMonthlyUse) * 100).toFixed(1); // Percentage calculation
  const cost = Math.round((consumption * currentPrice) * 100) / 100 ;

  const monthlyCost = Math.round((monthlyConsumption * monthlyAvgPrice) * 100) / 100 ;


  const handleModelChange = (e) => {
    const model = dishwashers.find((d) => d.name === e.target.value);
    setSelectedModel(model);
    setPower(model.power);
    setTime(model.time);

  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };


  const saveToDatabase = async (event) => {
    event.preventDefault();
    const response = await axios.get("http://localhost:3001/consumption");
    const devices = response.data;
    const dishwasher = {
      name: "Dishwasher",
      consumption: monthlyConsumption,
    };
    if (!devices.map((device) => device.name).includes("Dishwasher")) {
      await axios.post("http://localhost:3001/consumption", dishwasher);
    } else {
      const washerToUpdate = devices.find(
        (device) => device.name === "Dishwasher"
      );
      await axios.put(
        `http://localhost:3001/consumption/${washerToUpdate.id}`,
        dishwasher
      );
    }

    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };


  return (
    <div className="">

      <div className="bg-white min-h-screen flex flex-col items-center justify-center">
        <p className="text-black text-2xl font-bold mb-4">
          Dishwasher Electricity Consumption
        </p>
        <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg max-w-4xl p-6 flex flex-col items-center justify-center shadow-lg">

        {/* Model Selector */}
        <div className="mb-6 w-full">
          <label className="block text-black font-semibold mb-2 text-left">
            Dishwasher Energy Label:
          </label>
          <select
            value={selectedModel.name}
            onChange={handleModelChange}
            className="w-full p-2 rounded-md border text-black"
          >
            {dishwashers.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Info Icon and Instructions */}
          <div className="flex items-center mt-2">
            <span
              className="text-blue-500 cursor-pointer"
              onClick={toggleModal}
            >
              <i className="fas fa-info-circle text-lg"></i> {/* Info Icon */}
            </span>
            <span
              className="text-sm text-gray-600 ml-2 cursor-pointer"
              onClick={toggleModal}
            >
              Most dishwashers are labelled C or D
            </span>
          </div>
        </div>


          {/* Power Slider */}
          <div className="mb-6 w-full">
            <label className="block text-black font-semibold mb-2">
              Number of washes in one week: {freq} 
            </label>
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              value={freq}
              onChange={(e) => setFreq(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Time Slider */}
          <div className="mb-6 w-full">
            <label className="block text-black font-semibold mb-2">
              Wash time (Hours): {time}h
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="mt-4 bg-white rounded-md p-4 shadow text-center w-full flex flex-row flex-wrap gap-4">

          <div className="w-1/5">
          <InfoBox title="Monthly Use" content={monthlyConsumption} unit="kWh"/>
          </div>

          <div className="w-1/5">
          <InfoBox title="Monthly Cost" content={monthlyCost} unit="€"/>
          </div>

          <div className="flex-1">
          <div className="bg-gray-200 rounded-lg h-32 flex justify-between items-start relative flex-col p-2">
          <p className="text-black text-base text-left">
            Current Cost
          </p>
          <p className="text-black text-xs text-left mt-1 mb-auto">
            This much it would cost to wash your dishwasher now
          </p>

          <div className="flex items-end">
            <p
              className=" text-black text-3xl text-left">
               {cost}
            </p>
            <p className="text-black text-sm text-left">€</p>
          </div>

          <div className="absolute right-4 top-[50%]">
            <p class="text-3xl"></p>
          </div>

          </div>

          </div>

             <ProgressBar percentage={percentage} info="of the average monthly household electricity usage in Finland" />

           <div className="mt-4 w-full">
           <button
             onClick={saveToDatabase}
             className={`px-4 py-2 rounded primary bg-blue-500 text-white w-full flex justify-center relative 
                        `}
           >
          <p>
            Save consumption details
            </p>
            <p className="absolute right-4">
              →
            </p>
          </button>

        </div>

          </div>
        </div>

        {/* Toast */}
        {showToast && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            Saved successfully!
          </div>
        )}

      </div>
    </div>
  );
}

export default Dishwasher;
