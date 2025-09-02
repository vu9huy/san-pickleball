import { IconSprites1 } from "../iconSprites/IconSprites";
import styles from "./ImageElementSelected.module.css";

export const isImageFile = (obj) => {
    return obj instanceof File && obj.type.startsWith("image/");
};

const ImageElementSelected = ({ index, file, removeImage }) => {

    const checkImageFile = isImageFile(file);
    const exceedSize = file?.exceedSize;

    return (
        <div key={index} className={styles["upload-image-preview-container"]}>
            {checkImageFile ?
                <img src={file?.preview} alt={`preview ${index}`} /> :
                <img
                    src={file?.url}
                    alt={`preview ${index}`}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                    />}
            <div className={`${styles["upload-image-remove-preview"]} ${styles[exceedSize ? "style-2" : ""]}`} onClick={() => removeImage(index)}>
                <IconSprites1 id="sprites-icon-close" className={styles["upload-image-remove-icon"]} />
            </div>
            {exceedSize ?
                <div className={styles["upload-image-warning"]}>
                    <span className={styles["upload-image-warning-message"]}>*Ảnh vượt quá 2Mb, chọn ảnh khác thay thế</span>
                </div> :
                ""}
        </div>
    );
};

export default ImageElementSelected;