"use client";

import styles from "./Banner.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IconSprites1 } from "../iconSprites/IconSprites";
import BannerLabel from "./bannerLabel/BannerLabel";

const bannerList = [
    {
        label: {
            text: "Tìm sân pickleball",
            keyword: "pickleball"
        },
        description: "",
        align: "left",
        button: {
            text: "Tìm sân",
            link: "/tim-san"
        },
        image: "https://cdn.shopify.com/s/files/1/0697/0110/8031/files/1732632732_157_Giai-pickleball-PWR-Thu-Duc-HTV-DJOY-mo-rong.jpg?v=1744220542",
        // image: "https://cdn.shopify.com/s/files/1/0697/0110/8031/files/471667765_122118895328418574_4207077662079925695_n.jpg?v=1744220540"
        // image: {
        //     small: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,h_500,dpr_auto,f_auto,q_auto/v1731040959/648cce3343cc3c5ded55ea07_Wollman_Updated_vzsz5o.jpg",
        //     medium: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,w_800,dpr_auto,f_auto,q_auto/v1731040959/648cce3343cc3c5ded55ea07_Wollman_Updated_vzsz5o.jpg",
        //     large: "https://res.cloudinary.com/du2azaqnn/image/upload/v1731040959/648cce3343cc3c5ded55ea07_Wollman_Updated_vzsz5o.jpg"
        // }
    },
    {
        label: {
            text: "Hướng dẫn chơi pickleball",
            keyword: "pickleball"
        },
        description: "",
        align: "right",
        button: {
            text: "Hướng dẫn",
            link: "/huong-dan"
        },
        image: "https://res.cloudinary.com/du2azaqnn/image/upload/v1731048582/aleksander-saks-VkQwgdIuqA4-unsplash_mmpvrz.jpg"
        // image: {
        //     small: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,h_500,dpr_auto,f_auto,q_auto/v1728444395/pickleballatcrandall_zmyp6p.jpg",
        //     medium: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,w_800,dpr_auto,f_auto,q_auto/v1728444395/pickleballatcrandall_zmyp6p.jpg",
        //     large: "https://res.cloudinary.com/du2azaqnn/image/upload/v1728444395/pickleballatcrandall_zmyp6p.jpg"
        // }
    },
    // {
    //     label: {
    //         text: "Các bài viết về pickleball",
    //         keyword: "pickleball"
    //     },
    //     description: "",
    //     align: "left",
    //     button: {
    //         text: "Xem blog",
    //         link: "/blog"
    //     },
    //     image: "https://res.cloudinary.com/du2azaqnn/image/upload/v1728444394/PXL_20220518_123625984_tdujtq.jpg"
    //     // image: {
    //     //     small: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,h_500,dpr_auto,f_auto,q_auto/v1728444394/PXL_20220518_123625984_tdujtq.jpg",
    //     //     medium: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,w_800,dpr_auto,f_auto,q_auto/v1728444394/PXL_20220518_123625984_tdujtq.jpg",
    //     //     large: "https://res.cloudinary.com/du2azaqnn/image/upload/v1728444394/PXL_20220518_123625984_tdujtq.jpg"
    //     // }
    // },
    {
        label: {
            text: "Tìm người chơi",
            keyword: "người chơi"
        },
        description: "",
        align: "right",
        button: {
            text: "Tìm bạn",
            link: "/tim-nguoi-choi"
        },
        image: "https://res.cloudinary.com/du2azaqnn/image/upload/v1731047469/original-1a402f7367574a417d402553b2165460_w5kyh1.jpg"
        // image: {
        //     small: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,h_500,dpr_auto,f_auto,q_auto/v1728444343/original-1a402f7367574a417d402553b2165460_gcxial.jpg",
        //     medium: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,w_800,dpr_auto,f_auto,q_auto/v1728444343/original-1a402f7367574a417d402553b2165460_gcxial.jpg",
        //     large: "https://res.cloudinary.com/du2azaqnn/image/upload/v1728444343/original-1a402f7367574a417d402553b2165460_gcxial.jpg"
        // }
    }
];

const Banner = () => {

    const renderArrowPrev = (onClickHandler, hasPrev, label) => {
        return hasPrev && (
            <button type="button" onClick={onClickHandler} className={`${styles["custom-arrow"]} ${styles["custom-arrow-prev"]}`}>
                <IconSprites1 id="sprites-icon-chevron-up" className={styles["chevron-left-icon"]} />
            </button>
        );
    };


    // Custom Next Arrow
    const renderArrowNext = (onClickHandler, hasNext, label) => {
        return hasNext && (
            <button type="button" onClick={onClickHandler} className={`${styles["custom-arrow"]} ${styles["custom-arrow-next"]}`}>
                <IconSprites1 id="sprites-icon-chevron-up" className={styles["chevron-right-icon"]} />
            </button>
        );
    };

    const renderIndicator = (onClick, isSelected, index, label) => {
        const className = isSelected ? `${styles["custom-indicator"]} ${styles["selected"]}` : styles["custom-indicator"];
        return (
            <button
                type="button"
                className={className}
                onClick={onClick}
                aria-label={`Slide ${index + 1}`}
                key={index}
            />
        );
    };


    return (
        <div className={styles["banner-container"]}>
            <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                // autoPlay
                interval={3000}
                stopOnHover
                showArrows
                showIndicators
                className={styles["banner-carousel"]}
                renderIndicator={renderIndicator}
                renderArrowPrev={renderArrowPrev}
                renderArrowNext={renderArrowNext}
            >
                {bannerList.map((slide, index) => (
                    <div key={index} className={styles["carousel-slide"]}>
                        <img src={slide?.image} alt={slide?.label?.text} />
                        {/* <picture>
                            <source media="(max-width: 599px)" srcSet={slide.image.small} />
                            <source media="(min-width: 600px) and (max-width: 1199px)" srcSet={slide.image.medium} />
                            <source media="(min-width: 1200px)" srcSet={slide.image.large} />
                            <img src={slide.image.large} alt={slide.label} className="carousel-image" />
                        </picture> */}
                        <div className={`${styles["carousel-content"]} ${styles[slide.align]}`}>
                            <BannerLabel label={slide.label} align={slide.align} />
                            <button className="button">
                                <a href={slide.button.link} >
                                    {slide.button.text}
                                </a>
                            </button>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;