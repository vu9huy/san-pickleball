"use client"

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import styles from './FeaturedCourts.module.css';

const FeaturedCourts = ({ images = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: false, // Disabled loop as requested
      align: 'start',
      skipSnaps: false,
      dragFree: false,
      containScroll: 'trimSnaps',
      duration: 15, // Fast transition
      startIndex: 0,
      // Mobile-specific settings for 1 slide per view
      breakpoints: {
        '(max-width: 768px)': {
          align: 'center'
        }
      }
    },
    // [Autoplay({ 
    //   delay: 2500, 
    //   stopOnInteraction: true,
    // })]
  );

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const defaultImages = [
    'https://cdn.shopify.com/s/files/1/0697/0110/8031/files/upload_7e593edae4ad3a7c21f6e21241e8e400.png?v=1744220542',
    'https://cdn.shopify.com/s/files/1/0697/0110/8031/files/468940422_1019584290184039_1516322884193738209_n.jpg?v=1744220541',
    'https://cdn.shopify.com/s/files/1/0697/0110/8031/files/471667765_122118895328418574_4207077662079925695_n.jpg?v=1744220540',
    'https://cdn.shopify.com/s/files/1/0697/0110/8031/files/444503393_897981355464914_5814536304720537180_n.jpg?v=1744220541',
    'https://cdn.shopify.com/s/files/1/0697/0110/8031/files/469040479_1019584630184005_3526969399568578701_n.jpg?v=1744220541',
  ];

  const imageList = images.length > 0 ? images : defaultImages;

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {imageList.map((image, index) => (
            <div className={styles.slide} key={index}>
              <div className={styles.slideInner}>
                <img
                  className={styles.slideImg}
                  src={typeof image === 'string' ? image : image.src}
                  alt={typeof image === 'object' && image.alt ? image.alt : `Image ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className={`${styles.button} ${styles.buttonPrev}`}
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        aria-label="Previous image"
      >
        <svg className={styles.buttonIcon} viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        className={`${styles.button} ${styles.buttonNext}`}
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        aria-label="Next image"
      >
        <svg className={styles.buttonIcon} viewBox="0 0 24 24">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className={styles.dots}>
        {imageList.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === selectedIndex ? styles.dotSelected : ''}`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCourts;