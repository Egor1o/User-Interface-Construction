import Slider from "../components/Slider";
import { useEffect, useState } from "react";
import Calculator from "../components/Calculator";
import axios from "axios";

function DryingCabinet() {
    const [customChosen, setCustomChosen] = useState(false);
    const [compartments, setCompartments] = useState([]);
    const [consumption, setConsumption] = useState(0);
    const [devices, setDevices] = useState([]);
    const [isCalculated, setIsCalculated] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false); // New state for success

    const handleSaving = async (event) => {
        event.preventDefault();
        const dryingCabinet = {
            name: "Drying-cabinet",
            consumption: consumption,
        };
        try {
            if (!devices.map((device) => device.name).includes("Drying-cabinet")) {
                await axios.post("http://localhost:3001/consumption", dryingCabinet);
            } else {
                const dryingCabinetToUpdate = devices.find(
                    (device) => device.name === "Drying-cabinet"
                );
                await axios.put(
                    `http://localhost:3001/consumption/${dryingCabinetToUpdate.id}`,
                    dryingCabinet
                );
            }
            setIsSuccess(true); // Set success to true
            setTimeout(() => setIsSuccess(false), 3000); // Remove success icon after 3 seconds
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

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
                            <Calculator
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
                        <div className="flex flex-col items-center w-2/4 fixed top-20 scroll-mt-10 right-0">
                            <div className="shadow-md flex flex-col justify-between rounded-t-2xl bg-gray-100 sticky w-3/4 top-0">
                                <h1 className="text-2xl font-bold p-4 self-center">Total Consumption</h1>
                                <div className="flex flex-col min-h-[150px] items-center mt-4 overflow-y-auto max-h-80">
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
                                                    Average consumption: {elem.consumption ? elem.consumption.toFixed(2) : 0.0} kWh
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
                            {isCalculated && (
                                <div className="flex flex-col justify-center items-center">
                                    <button
                                        onClick={handleSaving}
                                        className={
                                            "p-3 mt-4 font-semibold rounded-md transition duration-200 bg-green-500 text-white hover:bg-blue-600"
                                        }
                                    >
                                        Set as my case
                                    </button>
                                    {isSuccess && (
                                        <div className="flex items-center mt-4 text-green-500">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 mr-2"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586 4.707 11.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <p>Success!</p>
                                        </div>
                                    )}
                                </div>
                            )}
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
                    <Slider devices={devices} setSuccess={setIsSuccess}/>
                    {isSuccess && (
                        <div className="flex items-center mt-4 text-green-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586 4.707 11.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p>Success!</p>
                        </div>
                    )}
                    <div className="mt-10 mb-36 flex flex-col justify-center items-center ">
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
