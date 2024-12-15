import axios from "axios";
import { useEffect} from "react";

const Calculator = ({
                        compartments,
                        setCompartments,
                        setConsumption,
                        setDevices,
                        setIsCalculated,
                    }) => {
    const addCompartment = () => {
        setCompartments([
            ...compartments,
            { height: 100, width: 100, depth: 100, temperature: 30, usageHours: 2 },
        ]);
    };

    const removeCompartment = (index) => {
        console.log('index', index)
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
        (dimensions.height * dimensions.width * dimensions.depth) / 1000; // Convert to liters

    const calculateCompartmentConsumption = (compartment) => {
        const volume = calculateVolume(compartment);

        const baseConsumptionPerHour = 0.2; // kWh per hour per liter
        const hourlyConsumption = volume * baseConsumptionPerHour;
        const temperatureFactor = Math.pow(1.025, compartment.temperature - 30);

        const monthlyConsumption = hourlyConsumption * compartment.usageHours * 30 * temperatureFactor * 0.003; // 30 days in a month
        return monthlyConsumption;
    };

    useEffect(() => {
        if (compartments.length > 0) {
            const consumptions = compartments.map(calculateCompartmentConsumption);
            const totalConsumption = consumptions.reduce((sum, c) => sum + c, 0);

            setConsumption(totalConsumption);
            setIsCalculated(true);

            //so efficient.....
            const updatedCompartments = compartments.map((compartment, index) => {
                if (compartment.consumption !== consumptions[index]) {
                    return {
                        ...compartment,
                        consumption: consumptions[index],
                    };
                }
                return compartment;
            });

            if (JSON.stringify(updatedCompartments) !== JSON.stringify(compartments)) {
                setCompartments(updatedCompartments);
            }
        } else {
            setConsumption(0);
            setIsCalculated(false);
        }
    }, [compartments]);


    const handleCalculation = async (event) => {
        event.preventDefault();

        const totalConsumption = compartments
            .map(calculateCompartmentConsumption)
            .reduce((sum, c) => sum + c, 0);

        setConsumption(totalConsumption);
        setIsCalculated(true);

        const response = await axios.get("http://localhost:3001/consumption");
        setDevices(response.data);
    };

    return (
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg border">
            <h1 className="mb-6 text-3xl font-bold text-center">
                Drying Cabinet Electricity Consumption
            </h1>
            <form onSubmit={handleCalculation} className="space-y-6">
                <div>
                    {compartments.length === 0 ?? (
                        <label className="block mb-2 text-lg font-medium text-gray-700">
                            Drying Cabinets:
                        </label>
                    )}
                    {compartments.map((compartment, index) => {
                        const minTemp = 30;
                        const maxTemp = 80;

                        return (
                            <div
                                key={index}
                                className="p-4 mb-4 space-y-4 bg-gray-100 rounded-lg shadow-md"
                            >
                                <div className="flex justify-between">
                                    <h3 className="text-lg font-semibold">
                                        Drying cabinet {index + 1}
                                    </h3>
                                    <button
                                        type="button"
                                        className="p-2 text-red-500 rounded-md cursor-pointer hover:bg-red-500 hover:text-white"
                                        onClick={() => removeCompartment(index)}
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className="text-sm text-gray-600">
                                    <p>
                                        Monthly consumption:{" "}
                                        <span className="font-bold">
                                            {compartment.consumption?.toFixed(2) ?? 0} kWh
                                        </span>
                                    </p>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Temperature on average (°C):
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

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Daily Usage (hours):
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        value={compartment.usageHours}
                                        onChange={(e) =>
                                            updateCompartment(index, {
                                                usageHours: parseFloat(e.target.value),
                                            })
                                        }
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        );
                    })}
                    <div className="flex justify-center items-center">
                        <button
                            type="button"
                            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            onClick={addCompartment}
                        >
                            Add Drying Cabinet
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Calculator;
