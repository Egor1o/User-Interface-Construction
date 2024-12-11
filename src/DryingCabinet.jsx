import Slider from "./Slider";

function DryingCabinet(){

    return(<div className="flex flex-col w-full h-full justify-center items-center">
        <h1 className="text-2xl">
            Choose device from the list
        </h1>
        <Slider />
        <div className="mt-10 flex flex-col justify-center items-center
        ">
        <h1 className="text-2xl font-bold">
            Or
        </h1>
        <button className="p-3 bg-[#BAE3EF] rounded-full text-lg mt-4">
            Create Custom Device
        </button>
        </div>
    </div>)
}

export default DryingCabinet