import keyObjectToArray from "@/utils/others/keyObjectToArray";
import styles from "./FeatureCourtForm.module.css";
import { featureLabels } from "@/helpers/courtFeatures";

const FeatureCourtForm = ({ register }) => {

    const courtFeatureList = keyObjectToArray(featureLabels);

    return (
        <div className={styles["feature-court-form-container"]}>
            <div className={styles["feature-court-form-option-wrapper"]}>
                {
                    courtFeatureList.map((feature, index) => {
                        return (
                            <label key={feature}>
                                <input
                                    type="checkbox"
                                    name={`option${index}`}
                                    {...register(`feature.${feature}`)}
                                />
                                <span>{featureLabels[feature]}</span>
                            </label>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default FeatureCourtForm;