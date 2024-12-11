import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";

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
            "https://www.carlroth.com/medias/TY09-1-01-1000Wx1000H?context=bWFzdGVyfGltYWdlc3w3NzYxMHxpbWFnZS9qcGVnfGFXMWhaMlZ6TDJobU1DOW9PV012T1RBek56RXpOVGszTURNek5DNXFjR2N8Y2E2MTgyNDdlNjE3MGNjYTE0MTc2MTE3ODgzYWRmM2E1MzZkMmQwYjk5YjY2NjUxOWZmYzgxNWViMjVmYjA4MQ"
    },
    {
        url:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-kids-movies-2020-call-of-the-wild-1579042974.jpg?crop=0.9760858955588091xw:1xh;center,top&resize=480:*"
    },
    {
        url:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-for-kids-2020-sonic-the-hedgehog-1571173983.jpg?crop=0.9871668311944719xw:1xh;center,top&resize=480:*"
    },
    {
        url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU"
    },


    {
        url:
        "https://m.media-amazon.com/images/I/3136b-51UqL._AC_UF1000,1000_QL80_.jpg"
    }
];
const Slider = () => {
    return (
        <div className="parent h-full items-center justify-center w-5/6">
            <Carousel
                responsive={responsive}
                autoPlay={true}
                swipeable={true}
                draggable={true}
                infinite={true}
                partialVisible={false}

            >
                {sliderImageUrl.map((imageUrl, index) => {
                    return (
                        <div className='mb-10 mt-10 flex self-center justify-center' key={index}>
                            <Card image={imageUrl.url} alt="image"/>
                        </div>
                            );
                            })}
            </Carousel>
                </div>
                )
                    ;
                };
                    export default Slider;
