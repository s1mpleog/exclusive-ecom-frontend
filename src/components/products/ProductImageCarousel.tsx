import { Carousel } from "react-responsive-carousel";

type ProductImageCarouselType = {
  images: { url: string; public_id: string }[];
};

const ProductImageCarousel = ({ images }: ProductImageCarouselType) => {
  return (
    <div className="flex">
      <Carousel
        className="max-w-[340px] mr-4"
        stopOnHover={true}
        autoPlay={true}
        showThumbs={false}
        dynamicHeight={true}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        animationHandler={"slide"}
        infiniteLoop={true}
        swipeable={true}
        transitionTime={1200}
      >
        {images.map((image) => (
          <div className="flex flex-1" key={image.public_id}>
            <img
              src={image.url}
              className="min-w-[200px] min-h-[200px] object-contain max-w-[200px] max-h-[200px]"
              alt=""
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductImageCarousel;
