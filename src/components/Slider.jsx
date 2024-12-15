import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";
import axios from "axios";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        slidesToSlide: 3
    },
    mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 2,
        slidesToSlide: 1
    }
};

const sliderImageUrl = [
    {
        url:
        "https://www.lgcorp.com/media/release/images/52587"
    },
    {
        url:
            "https://www.lgcorp.com/media/release/images/52587"
    },
    {
        url:
            "https://m.media-amazon.com/images/I/3136b-51UqL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        url:
        "https://www.lgcorp.com/media/release/images/52587"
    },


    {
        url:
        "https://m.media-amazon.com/images/I/3136b-51UqL._AC_UF1000,1000_QL80_.jpg"
    }
];
const Slider = ({devices, setSuccess}) => {
    const handleSaving = async (event) => {
        event.preventDefault();
        const dryingCabinet = {
            name: "Drying-cabinet",
            consumption: 36,
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
            setSuccess(true)
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };
    return (
        <div className="parent h-full items-center justify-center w-5/6">
            <Carousel
                responsive={responsive}
                autoPlay={true}
                swipeable={true}
                draggable={true}
                infinite={true}
                partialVisible={false}
                className="pb-6"
            >
                {sliderImageUrl.map((imageUrl, index) => {
                    return (
                        <div className='mt-10 flex self-center justify-center' key={index}>
                            <Card image={imageUrl.url} alt="image" handleSaving={handleSaving}/>
                        </div>
                            );
                            })}
            </Carousel>
                </div>
                )
                    ;
                };
                    export default Slider;
