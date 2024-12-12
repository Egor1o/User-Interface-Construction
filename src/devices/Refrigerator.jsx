import { useState } from "react";
import axios from "axios";

const Refrigerator = ({compartments, setCompartments, consumption, setConsumption, devices, setDevices, isCalculated, setIsCalculated, setValue}) => {


  const addCompartment = () => {
    setCompartments([
      ...compartments,
      { height: 100, width: 100, depth: 100, temperature: 4, isFreezer: false },
    ]);
  };

  const removeCompartment = (index) => {
    const updatedCompartments = compartments.filter((_, i) => i !== index);
    setCompartments(updatedCompartments);
    if (updatedCompartments.length === 0) setIsCalculated(false);
  };

  const updateCompartment = (index, updates) => {
    const updatedCompartments = compartments.map((compartment, i) =>
      i === index ? { ...compartment, ...updates } : compartment
    );
    setCompartments(updatedCompartments);
  };

  const calculateVolume = (dimensions) =>
    (dimensions.height * dimensions.width * dimensions.depth) / 1000;

  const calculateCompartmentConsumption = (compartment) => {
    const volume = calculateVolume(compartment);

    const fridgeBaseConsumption = 0.5; // kWh per liter per year (for a fridge at 4°C)
    const freezerBaseConsumption = 1.5; // kWh per liter per year (for a freezer at -18°C)

    let consumptionPerLiter;
    if (compartment.isFreezer) {
      consumptionPerLiter =
        freezerBaseConsumption * (1 + (18 - compartment.temperature) * 0.1);
    } else {
      consumptionPerLiter =
        fridgeBaseConsumption * (1 - (compartment.temperature - 4) * 0.05); // Scaling factor for fridge temperature
    }
    const annualConsumption = volume * consumptionPerLiter;
    return annualConsumption / 12;
  };

  const handleCalculation = async (event) => {
    event.preventDefault();

    const totalConsumption = compartments
      .map(calculateCompartmentConsumption)
      .reduce((sum, c) => sum + c, 0);

    setValue(totalConsumption)

    setConsumption(totalConsumption);
    setIsCalculated(true);
    const response = await axios.get("http://localhost:3001/consumption");
    setDevices(response.data);
  };

  const handleSaving = async (event) => {
    event.preventDefault();
    const refrigerator = {
      name: "Refrigerator",
      consumption: consumption,
    };
    if (!devices.map((device) => device.name).includes("Refrigerator")) {
      await axios.post("http://localhost:3001/consumption", refrigerator);
    } else {
      const refrigeratorToUpdate = devices.find(
        (device) => device.name === "Refrigerator"
      );
      await axios.put(
        `http://localhost:3001/consumption/${refrigeratorToUpdate.id}`,
        refrigerator
      );
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg border">
      <h1 className="mb-6 text-3xl font-bold text-center">
        Refrigerator Monthly Electricity Consumption
      </h1>
      <form onSubmit={handleCalculation} className="space-y-6">
        <div>
          <label className="block mb-2 text-lg font-medium text-gray-700">
            Freezer / Fridge compartments:
          </label>
          {compartments.map((compartment, index) => {
            const minTemp = compartment.isFreezer ? -20 : 2;
            const maxTemp = compartment.isFreezer ? -2 : 8;

            return (
              <div
                key={index}
                className="p-4 mb-4 space-y-4 bg-gray-100 rounded-lg shadow-md"
              >
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">
                    Compartment {index + 1} (
                    {compartment.isFreezer ? "Freezer" : "Fridge"})
                  </h3>
                  <button
                    type="button"
                    className="p-2 text-red-500 rounded-md cursor-pointer hover:bg-red-500 hover:text-white"
                    onClick={() => removeCompartment(index)}
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">
                    Is this a freezer?
                  </label>
                  <input
                    type="checkbox"
                    value={compartment.isFreezer}
                    onChange={(e) => {
                      updateCompartment(index, {
                        temperature: compartment.isFreezer ? 4 : -16,
                        isFreezer: !compartment.isFreezer,
                      });
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Temperature (°C):
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min={minTemp}
                      max={maxTemp}
                      value={compartment.temperature}
                      onChange={(e) =>
                        updateCompartment(index, {
                          temperature: parseFloat(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                    <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-xl font-semibold text-center">
                      {compartment.temperature}°C
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{minTemp}°C</span>
                    <span>{maxTemp}°C</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Height (cm):
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={compartment.height}
                      onChange={(e) =>
                        updateCompartment(index, {
                          height: parseFloat(e.target.value),
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Height"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Width (cm):
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={compartment.width}
                      onChange={(e) =>
                        updateCompartment(index, {
                          width: parseFloat(e.target.value),
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Width"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Depth (cm):
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={compartment.depth}
                      onChange={(e) =>
                        updateCompartment(index, {
                          depth: parseFloat(e.target.value),
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Depth"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <button
            type="button"
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={addCompartment}
          >
            Add Compartment
          </button>
        </div>

        <div>
          <button
            type="submit"
            className={`w-full py-3 font-semibold rounded-md transition duration-200 ${
              compartments.length > 0
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={compartments.length === 0}
          >
            Calculate
          </button>
        </div>
      </form>

      {isCalculated && (
        <div>
          <p className="mt-6 mb-6 text-xl font-semibold text-center text-green-600">
            On average, your refrigerator consumes {consumption.toFixed(2)} kWh
            a month
          </p>
          <button
            onClick={handleSaving}
            className={
              "w-full py-3 font-semibold rounded-md transition duration-200 bg-blue-500 text-white hover:bg-blue-600"
            }
          >
            Set as my case
          </button>
        </div>
      )}
    </div>
  );
};

export default Refrigerator;
