import { useState } from 'react'

const Tv = () => {

    const [screenType, setScreenType] = useState("")
    const [screenSize, setScreenSize] = useState("50")
    const [dailyUse, setDailyUse] = useState("3")
    const [consumption, setConsumption] = useState("")
    const [isCalculated, setIsCalculated] = useState(false)

    const handleSelection = (event) => {
        setScreenType(event.target.value)
    }

    const handleSize = (event) => {
        setScreenSize(event.target.value)
    }

    const handleUse = (event) => {
        setDailyUse(event.target.value)
    }

    const handleCalculation = (event) => {
        event.preventDefault()

        if (screenType && screenSize && dailyUse) {
            setConsumption(screenType * screenSize * screenSize * dailyUse * 30 / 1000)
            setIsCalculated(true)
        } else {
            alert("Please, provide calculator with the info.")
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className='text-3xl font-bold mb-6 text-center'>TV Monthly Electricity Consumption</h1>
            <form onSubmit={handleCalculation} className='space-y-6'>
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                        Screen type:
                    </label>
                    <select
                        value={screenType}
                        onChange={handleSelection}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Select</option>
                        <option value="0.08">LCD</option>
                        <option value="0.06">LED</option>
                        <option value="0.04">OLED</option>
                    </select>
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                        Screen size (in inches):
                    </label>
                    <input
                        type="range"
                        min="24"
                        max="75"
                        value={screenSize}
                        onChange={handleSize}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>24</span>
                        <span>75</span>
                    </div>
                    <div className="text-center mt-2 text-xl font-semibold">
                        {screenSize} inches
                    </div>
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                        Average daily use (in hours):
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="24"
                        value={dailyUse}
                        onChange={handleUse}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>1</span>
                        <span>24</span>
                    </div>
                    <div className="text-center mt-2 text-xl font-semibold">
                        {dailyUse} hours
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className={`w-full py-3 font-semibold rounded-md transition duration-200 ${screenType ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                        disabled={!screenType}
                    >
                        Calculate
                    </button>
                </div>
            </form>

            {isCalculated && (
                <p className="mt-6 text-xl font-semibold text-center text-green-600">
                    On average, your TV consumes {consumption.toFixed(2)} kWh a month
                </p>
            )}
        </div>
    )
}

export default Tv