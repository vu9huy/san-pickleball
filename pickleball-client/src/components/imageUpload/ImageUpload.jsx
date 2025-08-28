"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./ImageUpload.module.css";
import ImageElementSelected from "../imageElementSelected/ImageElementSelected";
import convertSizeOfFileToKb from "@/utils/others/convertSizeOfFileToKb";
import { convertImageToBase64 } from "@/utils/others/convertBase64";


// max size of file (kb)
const MAX_FILE_SIZE = 2048;

// max size of file (bytes)
const maxSize = 2048000;

const ImageUpload = ({ multiple = true, images = [], setImages, maxFiles = 10, field, watch }) => {

    const [errorMessage, setErrorMessage] = useState("");

    const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
        setErrorMessage("");
        let newAcceptedFiles = acceptedFiles;
        const totalImages = images.length + acceptedFiles.length;


        if (totalImages > maxFiles) {
            const remainingImages = maxFiles - images.length > 0 ? maxFiles - images.length : 0;
            newAcceptedFiles = acceptedFiles.slice(0, remainingImages);
            setErrorMessage("Chọn tối đa 10 ảnh");
        }

        if (rejectedFiles.length > 0) {
            const rejectedFilesName = rejectedFiles.map(fileObject => {
                const file = fileObject.file;
                // get file too large size
                if (file.size > maxSize) {
                    return file.name;
                }
            });
            setErrorMessage(`Ảnh ${rejectedFilesName.join(", ")} vượt quá 2Mb`);
        }

        const newImages = newAcceptedFiles.map((file) => {
            const size = convertSizeOfFileToKb(file.size);
            // Check maxsize (Do có check maxSize ở dưới useDropzone nên có thể bỏ đi)
            const exceedSize = size > MAX_FILE_SIZE;
            return Object.assign(file, {
                preview: URL.createObjectURL(file),
                exceedSize: exceedSize
            });
        });
        if (field.onChange && watch) {
            const base64s = await convertImageToBase64(newImages, watch("name"));
            field.onChange(base64s);
        }
        setImages((prevImages) => (multiple ? [...prevImages, ...newImages] : newImages));
    }, [images.length]);

    const removeImage = async (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);

        if (field.onChange) {
            const base64s = await convertImageToBase64(newImages, watch("name"));
            field.onChange(base64s);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop,
        multiple,
        maxSize
    });

    return (
        <div className={styles["upload-image-container"]}>
            <div {...getRootProps({ className: styles["upload-image-dropzone"] })}>
                <input {...getInputProps()} />
                <p>Kéo thả ảnh vào đây, hoặc click để chọn ảnh {multiple ? "(Tối đa 10 ảnh, 2Mb/ảnh)" : ""}</p>
            </div>
            <div className={styles["upload-image-util"]}>
                <div className={styles["upload-image-warning"]}>
                    {errorMessage ?
                        <span className={styles["upload-image-warning-message"]}>
                            *{errorMessage}
                        </span>
                        : ""}
                </div>
                {multiple ?
                    <button className={!images?.length ? "button disable" : "button"} onClick={() => setImages([])}>Bỏ chọn tất cả ảnh</button> :
                    ""}
            </div>

            {images.length ?
                <div className={styles["upload-image-previews"]}>
                    {images?.map((file, index) => {
                        return (
                            <>{file ? <ImageElementSelected index={index} key={index} file={file} removeImage={removeImage} /> : null}</>
                        );
                    })}
                </div> :
                ""}

        </div>
    );
};

export default ImageUpload;
