import styles from "./SliderImage.module.css";

const SliderImage = ({ src, isLazy, imageClass, alt, sizes, displayType, openModal }) => {
    return <div className={`${styles[imageClass]} ${styles[displayType]}`} onClick={() => openModal(src, alt)}>
        {src ? (
                <img
                    className={styles["slider-image"]}
                    src={src}
                    alt={alt || "pickleball"}
                    loading={isLazy ? "lazy" : "eager"}
                    sizes={sizes}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            ) : null}
    </div>;
};

export default SliderImage;
