import { Carousel } from "react-responsive-carousel";

type SingleDetailsPageCarousel = {
  images: { url: string; public_id: string }[] | undefined;
};

const SingleDetailsPageCarousel = ({ images }: SingleDetailsPageCarousel) => {
  return (
    <div className="">
      <Carousel
        showArrows={false}
        thumbWidth={70}
        showStatus={false}
        showIndicators={false}
        autoPlay={true}
        transitionTime={1200}
        infiniteLoop={true}
        animationHandler={"fade"}
      >
        {images?.map((image) => (
          <img
            className="max-h-[500px] object-contain"
            key={image.url}
            src={image.url}
            alt="single page image"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default SingleDetailsPageCarousel;
