import styles from "./ArrowKeenSlider.module.css";

const ArrowKeenSlider = (props) => {
    const { isLeft, onClick, disabled } = props;
    return (
        <svg
            onClick={onClick}
            // style={styles}
            className={`${styles["arrow"]} ${styles[isLeft ? "arrow--left" : "arrow--right"]} ${styles[disabled ? "arrow--disabled" : ""]}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {isLeft && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!isLeft && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    );
};
export default ArrowKeenSlider;