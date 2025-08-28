import keyObjectToArray from "@/utils/others/keyObjectToArray";
import styles from "./AmenitiesCourtForm.module.css";
import { amenitiesLabels } from "@/helpers/courtFeatures";

const AmenitiesCourtForm = ({ register }) => {

    const courtAmenitiesList = keyObjectToArray(amenitiesLabels);

    return (
        <div className={styles["amenities-court-form-container"]}>
            <div className={styles["amenities-court-form-option-wrapper"]}>
                {
                    courtAmenitiesList.map((amenity, index) => {
                        return (
                            <label key={amenity}>
                                <input
                                    type="checkbox"
                                    name={`option${index}`}
                                    {...register(`amenities.${amenity}`)}
                                />
                                <span>{amenitiesLabels[amenity]}</span>
                            </label>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default AmenitiesCourtForm;