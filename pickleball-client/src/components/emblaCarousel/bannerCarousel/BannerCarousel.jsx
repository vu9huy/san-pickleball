"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { BannerEmblaThumb } from "./bannerEmblaThumb/BannerEmblaThumb";
import "./BannerCarousel.css";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";

const SLIDE_COUNT = 6;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const BannerCarousel = (props) => {
    // const { slides, options } = props
    const slides = SLIDES;
    const option = {
        containScroll: "keepSnaps",
        dragFree: false,
        loop: true
    };
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(option, [Autoplay({ playOnInit: true, delay: 3000 })]);
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({ ...option, watchDrag: false }, [Fade()]);

    console.log("selectedIndex", selectedIndex);

    const onThumbClick = useCallback(
        (index) => {
            if (!emblaMainApi || !emblaThumbsApi) return;
            emblaMainApi.scrollTo(index);
        },
        [emblaMainApi, emblaThumbsApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        setSelectedIndex(emblaMainApi.selectedScrollSnap());
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();

        emblaMainApi.on("select", onSelect).on("reInit", onSelect);
    }, [emblaMainApi, onSelect]);

    return (
        <div className="embla-container">
            <div className='embla'>
                <div className="embla__viewport" ref={emblaMainRef}>
                    <div className="embla__container">
                        {slides.map((index) => (
                            <div className={`embla__slide ${selectedIndex === index ? "active" : ""}`} key={index} onClick={() => onThumbClick(index)}>
                                <div className="embla__slide__number">{index + 1}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="embla-thumbs">
                    <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                        <div className="embla-thumbs__container">
                            {slides.map((index) => (
                                <BannerEmblaThumb
                                    key={index}
                                    onClick={() => onThumbClick(index)}
                                    selected={index === selectedIndex}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerCarousel;
