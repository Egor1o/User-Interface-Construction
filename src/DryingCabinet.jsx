import Slider from "./Slider";
import { useEffect, useState } from "react";
import Refrigerator from "./devices/Refrigerator";

function DryingCabinet() {
    const [customChosen, setCustomChosen] = useState(false);
    const [compartments, setCompartments] = useState([]);
    const [consumption, setConsumption] = useState(0);
    const [devices, setDevices] = useState([]);
    const [isCalculated, setIsCalculated] = useState(false);
    const [value, setValue] = useState(0.0);

    useEffect(() => {
        console.log(consumption, compartments, devices, isCalculated);
    }, [consumption, compartments, devices, isCalculated]);

    return (
        <div className="w-full flex flex-row overflow-hidden">
            {customChosen ? (
                <div
                    className={`w-full h-full flex items-center justify-center transition-transform`}
                >
                    <div className="relative w-full h-full flex flex-row mt-16">
                        <div className="w-2/4 ml-10">
                            <Refrigerator
                                setValue={setValue}
                                compartments={compartments}
                                setCompartments={setCompartments}
                                consumption={consumption}
                                devices={devices}
                                isCalculated={isCalculated}
                                setConsumption={setConsumption}
                                setDevices={setDevices}
                                setIsCalculated={setIsCalculated}
                            />
                        </div>
                        <div className="flex flex-col items-center w-2/4">
                            <div className="shadow-md flex flex-col justify-between rounded-t-2xl bg-gray-100 sticky w-3/4 top-0">
                                <h1 className="text-2xl font-bold p-4 self-center">Total Consumption</h1>
                                <div className="flex flex-col min-h-[150px] items-center mt-4">
                                    {compartments.map((elem, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center flex-col justify-center bg-white shadow-md rounded-lg p-4 mb-4 w-auto"
                                        >
                                            <p>Dryer Cabinet {index + 1}</p>
                                            <div className="flex flex-row items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-8 w-8 text-green-500 mr-3"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M11 3L4 14h6l-1 7L16 6h-5l1-3z" />
                                                </svg>
                                                <p className="text-lg text-green-600 font-bold">
                                                    Average consumption: {(value/compartments.length).toFixed(2)} kWh
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex bg-blue-500 w-auto p-3 mt-5 border-t-1 border-black rounded-b-lg">
                                    <p className="text-bold text-white text-lg">
                                        The average consumption of your device(s) is: {consumption.toFixed(2)} kWh
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className={`w-full h-full flex flex-col items-center justify-center bg-white transition-transform duration-500 ease-in-out transform ${
                        customChosen ? "-translate-y-full" : "translate-y-0"
                    }`}
                >
                    <h1 className="text-2xl mt-20">Choose device from the list</h1>
                    <Slider/>
                    <div className="mt-10 mb-36 flex flex-col justify-center items-center">
                        <h1 className="text-2xl font-bold">Or</h1>
                        <button
                            className="p-3 bg-blue-500 rounded-full text-white text-lg mt-4"
                            onClick={() => setCustomChosen(true)}
                        >
                            Create Custom Device
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DryingCabinet;
