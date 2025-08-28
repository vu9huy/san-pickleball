import FormErrorMessage from "@/components/formErrorMessage/FormErrorMessage";
import styles from "./BookingInfoCourtForm.module.css";
import { convertVietNamMoneyFormat } from "@/utils/others/convertMoneyFormat";
import ImageUpload from "@/components/imageUpload/ImageUpload";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const BookingInfoCourtForm = ({ register, control, useFieldArray, errors, watch }) => {

    const { fields, append, remove } = useFieldArray({
        control,
        name: "bookingInfo.detail"
    });

    const validation = {
        required: "Vui lòng nhập trường này",
        pattern: {}
    };

    const minPrice = convertVietNamMoneyFormat(watch("bookingInfo.priceRange.min"));
    const maxPrice = convertVietNamMoneyFormat(watch("bookingInfo.priceRange.max"));

    const image = watch("bookingInfo.images");
    // const [priceImage, setPriceImage] = useState(image ? [image] : []);
    const [priceImage, setPriceImage] = useState(watch("bookingInfo.images"));
    useEffect(() => {
        if (image) {
            setPriceImage(image); // Update priceImage with the new image(s)
        }
    }, [image]);


    return (
        <div className={styles["booking-info-court-form-container"]}>
            <div className={styles["booking-info-court-form-price-range"]}>
                <div className={styles["booking-info-court-form-price-range-field"]}>
                    <label>
                        <span>Thấp nhất (VND): {minPrice}đ</span>
                        <input
                            className="input"
                            placeholder="Vd: 100.000"
                            type="number"
                            // min={0}
                            // max={10000000}
                            {...register("bookingInfo.priceRange.min", validation)}
                        />
                        <FormErrorMessage errors={errors} name={"bookingInfo.priceRange.min"} />
                    </label>
                </div>
                <div className={styles["booking-info-court-form-price-range-field"]}>
                    <label>
                        <span>Cao nhất (VND): {maxPrice}đ</span>
                        <input
                            className="input"
                            type="number"
                            placeholder="Vd: 200.000"
                            // min={0}
                            // max={10000000}
                            {...register("bookingInfo.priceRange.max", validation)}
                        />
                        <FormErrorMessage errors={errors} name={"bookingInfo.priceRange.max"} />
                    </label>
                </div>
            </div>
            <div className={styles["booking-info-court-form-image"]}>
                <label className={styles["court-form-label"]} >Hình ảnh bảng giá:</label>
                <Controller
                    control={control}
                    defaultValue={[priceImage]}
                    rules={{}}
                    name="bookingInfo.images"
                    render={({ field }) => {
                        return <ImageUpload field={field} watch={watch} multiple={false} images={priceImage} setImages={setPriceImage} />;
                    }}
                />
                <FormErrorMessage errors={errors} name={"bookingInfo.image"} />
            </div>
            {/* <div className={styles["booking-info-court-form-detail"]}>
                <label className={styles["booking-info-court-form-detail-title"]}>Giá chi tiết:</label>
                {fields.map((field, index) => (
                    <div className={styles["booking-info-court-form-field"]} key={field.id}>
                        <div className={styles["booking-info-court-form-detail-price"]}>
                            <div className={`${styles["booking-info-court-form-field-input-wrapper"]} ${styles["booking-info-court-form-field-description"]}`}>
                                <label>
                                    <span>Mô tả: </span>
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Vd: Cuối tuần"
                                        {...register(`bookingInfo.detail.${index}.label`, validation)}
                                    />
                                </label>
                                <FormErrorMessage errors={errors} name={`bookingInfo.detail.${index}.label`} />
                            </div>
                            <div className={`${styles["booking-info-court-form-field-input-wrapper"]} ${styles["booking-info-court-form-field-price"]}`}>
                                <label>
                                    <span>Giá: {convertVietNamMoneyFormat(field.value)}đ</span>
                                    <input
                                        className="input"
                                        type="number"
                                        placeholder="Vd: 200.000"
                                        // min={0}
                                        // max={10000000}
                                        {...register(`bookingInfo.detail.${index}.value`, validation)}
                                    />
                                </label>
                                <FormErrorMessage errors={errors} name={`bookingInfo.detail.${index}.value`} />
                            </div>
                        </div>
                        <div className={styles["booking-info-court-form-remove-button"]}>
                            <button className="button dangerous" type="button" onClick={() => remove(index)}>
                                Xóa
                            </button>
                        </div>
                    </div>
                ))}
                <div className={styles["booking-info-court-form-add-button"]}>
                    <button className="button" type="button" onClick={() => append({ label: "", value: "" })}>
                        Thêm giá chi tiết
                    </button>
                </div>
            </div> */}
        </div>
    );
};

export default BookingInfoCourtForm;