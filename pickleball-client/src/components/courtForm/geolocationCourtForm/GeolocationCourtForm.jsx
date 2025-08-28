import FormErrorMessage from "@/components/formErrorMessage/FormErrorMessage";
import styles from "./GeolocationCourtForm.module.css";
import Link from "next/link";

const GeolocationCourtForm = ({ register, errors }) => {

    const validation = {
        required: "Vui lòng nhập trường này",
        pattern: {}
    };

    return (
        <div className={styles["geoloaction-court-form-container"]}>
            <div className={styles["geoloaction-court-form-input-wrapper"]}>
                <label className={`${styles["geoloaction-court-form-field"]} label`}>
                    <span>Vĩ độ (latitude):</span>
                    <input
                        {...register("geolocation.latitude", validation)}
                        placeholder="Vd: 21.028511"
                        className="input"
                        step={0.0000001}
                        type="number"
                    />
                    <FormErrorMessage errors={errors} name="geolocation.latitude" />
                </label>
                <label className={`${styles["geoloaction-court-form-field"]} label`}>
                    <span>Kinh độ (longitude):</span>
                    <input
                        {...register("geolocation.longitude", validation)}
                        placeholder="Vd: 105.848217"
                        className="input"
                        step={0.0000001}
                        type="number"
                    />
                    <FormErrorMessage errors={errors} name="geolocation.longitude" />
                </label>
            </div>
        </div>
    );
};

export default GeolocationCourtForm;