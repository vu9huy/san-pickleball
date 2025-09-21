"use client";

import useEmblaCarousel from 'embla-carousel-react';
import { useState, useCallback, useEffect } from 'react';
import SliderImage from "./sliderImage/SliderImage";
import ArrowKeenSlider from "./arrow/ArrowKeenSlider";
import Loading from "../loading/Loading";
import "./ReactResposiveCarousel.css";
import "./SlideModal.css";

const ReactResponsiveCarousel = ({ images, slideImageClass, isLazy, displayType }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        dragFree: false,
        containScroll: 'trimSnaps'
    });


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [loadingImage, setLoadingImage] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const openModal = (src, alt) => {
        const image = { src, alt };
        setCurrentImage(image);
        setModalIsOpen(true);
        setLoadingImage(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentImage(null);
    };

    const handleOutsideClick = (e) => {
        if (e.target.className === "slide-modal-image" || e.target.className === "slide-modal-content") {
            setCurrentImage();
            closeModal();
        }
    };

    const handleOnloadImage = () => {
        setLoadingImage(false);
    };

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    const arrowStyles = {
        position: "absolute",
        zIndex: 2,
        top: "calc(50% - 15px)",
        width: 30,
        height: 30,
        cursor: "pointer"
    };

    const numberOfImages = images?.length;
    const checkOneImage = numberOfImages === 1;

    if (!images || !images.length) return "";

    return (
        <>
            <div className={`embla ${!displayType ? "court-detail" : ""}`}>
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {images.map((image, index) => (
                            <div className="embla__slide" key={index}>
                                <SliderImage
                                    src={image.url}
                                    isLazy={isLazy ? true : index === 0 ? false : true}
                                    imageClass={slideImageClass}
                                    displayType={displayType}
                                    alt={image.alt}
                                    openModal={openModal}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows */}
                {!checkOneImage && (
                    <>
                        <ArrowKeenSlider 
                            isLeft={true} 
                            styles={{ ...arrowStyles, left: "15px" }} 
                            onClick={scrollPrev} 
                            disabled={!canScrollPrev} 
                        />
                        <ArrowKeenSlider 
                            isLeft={false} 
                            styles={{ ...arrowStyles, right: "15px" }} 
                            onClick={scrollNext} 
                            disabled={!canScrollNext} 
                        />
                    </>
                )}

                {/* Indicators/Dots */}
                {!checkOneImage && (
                    <div className="embla__dots">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
                                type="button"
                                onClick={() => scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalIsOpen && (
                <div className="slide-modal-overlay">
                    <div className="slide-modal-content" onClick={handleOutsideClick}>
                        <button className="slide-close-button" onClick={closeModal}>×</button>
                        <div className="slide-modal-image" onClick={handleOutsideClick}>
                            {loadingImage && (
                                <div style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)"
                                }}>
                                    <Loading width={"50px"} />
                                </div>
                            )}
                            <div style={{ visibility: loadingImage ? "hidden" : "visible", maxHeight: "100%" }}>
                                {currentImage.src && (
                                    <img
                                        src={currentImage.src}
                                        alt={currentImage.alt || "pickleball"}
                                        loading="lazy"
                                        onLoad={handleOnloadImage}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                        }}
                                        />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReactResponsiveCarousel;