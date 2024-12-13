const Card = ({ image, handleSaving }) => {

    return (
        <div
            className="flex flex-col max-w-[350px] h-full border border-black rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={handleSaving}
        >
            <div className="w-full h-[230px] overflow-hidden">
                <img src={image} alt="img" className="w-full h-full object-cover" />
            </div>
            <div className="p-2">
                <h1 className="text-lg font-bold">QuickDry Pro</h1>
                <p className="text-sm text-gray-700">
                    Efficient and compact drying cabinet perfect for homes or small businesses.
                </p>
            </div>
        </div>
    );
};

export default Card;
