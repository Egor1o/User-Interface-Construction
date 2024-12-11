import { useState } from 'react'
import axios from 'axios'

const Tv = () => {

    const [screenType, setScreenType] = useState("")
    const [screenSize, setScreenSize] = useState("50")
    const [dailyUse, setDailyUse] = useState("3")
    const [consumption, setConsumption] = useState("")
    const [devices, setDevices] = useState([])
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

    const handleCalculation = async (event) => {
        event.preventDefault()

        const newConsumption = screenType * screenSize * screenSize * dailyUse * 30 / 1000
        setConsumption(newConsumption)
        setIsCalculated(true)
        const response = await axios.get('http://localhost:3001/consumption')
        setDevices(response.data)
    }

    const handleSaving = async (event) => {
        event.preventDefault()
        const tv = {
            name: 'TV',
            consumption: `${consumption}`
        }
        if (!devices.map(device => device.name).includes('TV')) {
            await axios.post('http://localhost:3001/consumption', tv)
        } else {
            const tvToUpdate = devices.find(device => device.name === 'TV')
            await axios.put(`http://localhost:3001/consumption/${tvToUpdate.id}`, tv)
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
                <div>
                    <p className="mt-6 mb-6 text-xl font-semibold text-center text-green-600">
                        On average, your TV consumes {consumption.toFixed(2)} kWh a month
                    </p>
                    <button 
                        onClick={handleSaving}
                        className={"w-full py-3 font-semibold rounded-md transition duration-200 bg-blue-500 text-white hover:bg-blue-600"}
                        >Set as my case</button>
                </div>
            )}
        </div>
    )
}

export default Tv