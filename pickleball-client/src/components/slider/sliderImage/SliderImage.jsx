import Image from "next/image";
import styles from "./SliderImage.module.css";
import { CldImage } from "next-cloudinary";

const SliderImage = ({ src, isLazy, imageClass, alt, sizes, displayType, openModal }) => {
    return <div className={`${styles[imageClass]} ${styles[displayType]}`} onClick={() => openModal(src, alt)}>
        {src ?
            <Image
                className={styles["slider-image"]}
                src={src}
                alt={alt || "pickleball"}
                fill={true}
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading={isLazy ? "lazy" : "eager"} />
            : ""}
        
        {/* <CldImage
            className={styles["slider-image"]}
            fill
            // sizes="(max-width: 768px) 100vw,
            // 50vw"
            src={src}
            format="auto"
            alt={alt || "pickleball"}
            loading={isLazy ? "lazy" : "eager"}
        /> */}
    </div>;
};

export default SliderImage;
