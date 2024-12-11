import Slider from "./Slider";
import { useState } from "react";

function DryingCabinet() {
    const [customChosen, setCustomChosen] = useState(false);

    return (
        <div className="w-full h-screen overflow-hidden">
            <div
                className={`absolute top-10 left-0 w-full h-full flex flex-col items-center justify-center bg-white transition-transform duration-500 ease-in-out transform ${
                    customChosen ? "-translate-x-full" : "translate-x-0"
                }`}
            >
                <h1 className="text-2xl pt-20 mb-10">Choose device from the list</h1>
                <Slider />
                <div className="mt-5 mb-36 flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold">Or</h1>
                    <button
                        className="p-3 bg-[#BAE3EF] rounded-full text-lg mt-4"
                        onClick={() => setCustomChosen(true)}
                    >
                        Create Custom Device
                    </button>
                </div>
            </div>

            <div
                className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-100 transition-transform duration-500 ease-in-out transform ${
                    customChosen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <h1 className="text-2xl pt-20 mb-10">Here calculator</h1>
                <button
                    className="p-3 bg-[#BAE3EF] rounded-full text-lg mt-4"
                    onClick={() => setCustomChosen(false)}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default DryingCabinet;
