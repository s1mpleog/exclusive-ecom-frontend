/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Banner2 from "@/assets/images/banner2.png";
import Banner4 from "@/assets/images/banner4.jpg";
import Banner5 from "@/assets/images/banner5.jpg";
import Banner7 from "@/assets/images/banner7.webp";
import Banner8 from "@/assets/images/banner9.jpg";

import Apple from "@/assets/images/apple.png";
import { Link } from "react-router-dom";

type EventHandlerType = () => void;

const images = [Banner4, Banner5, Banner8, Banner7];

export default function HomeBanner() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  //   @ts-expect-error
  useEffect(() => {
    if (!embla) return;

    const onSelect: EventHandlerType = () => {
      setSelectedIndex(embla.selectedScrollSnap());
    };

    embla.on("select", onSelect);

    return () => embla.off("select", onSelect);
  }, [embla, setSelectedIndex]);

  return (
    <div className="relative py-8">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide flex bg-black w-full max-h-[500px]">
            <div className="container mx-auto flex items-center justify-evenly">
              <div className="">
                <div className="flex items-center gap-5">
                  <img src={Apple} className="object-cover" alt="apple" />
                  <p className="text-white text-lg">iPhone 15 Series</p>
                </div>
                <div className="text-white">
                  <h3 className="text-5xl leading-[1.80] font-bold">
                    Up to 10% <br /> off Voucher
                  </h3>
                  <Link
                    to="/brand/apple"
                    className="text-xl my-10 font-semibold underline"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
              <div>
                <img src={Banner2} alt="" />
              </div>
            </div>
          </div>

          {images.map((image, i) => (
            <div key={i} className="embla__slide">
              <img
                src={image}
                className="max-h-[500px] rounded-md w-full object-cover"
                alt={image}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
        {embla &&
          Array.from(Array(embla.scrollSnapList().length)).map((_, index) => (
            <button
              key={index}
              onClick={() => embla.scrollTo(index)}
              className={`w-3 h-3 rounded-full ${
                index === selectedIndex ? "bg-red-500" : "bg-gray-300"
              }`}
            ></button>
          ))}
      </div>
    </div>
  );
}
