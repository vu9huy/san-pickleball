import FormErrorMessage from "@/components/formErrorMessage/FormErrorMessage";
import styles from "./UtilitiesCourtForm.module.css";

const UtilitiesCourtForm = ({ register, control, useFieldArray, errors }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "utilities"
    });

    const validation = {
        required: "Vui lòng nhập trường này",
        pattern: {}
    };

    return (
        <div className={styles["utilities-court-form-container"]}>
            {fields.map((field, index) => (
                <div className={styles["utilities-court-form-field"]} key={field.id}>
                    <div className={styles["utilities-court-form-input-wrapper"]}>
                        <div className={styles["utilities-court-form-name"]}>
                            <label>Tên tiện ích:</label>
                            <input
                                {...register(`utilities.${index}.name`, validation)}
                                defaultValue={field.name}
                                placeholder="Vd: Bãi đỗ xe"
                                className="input"
                            />
                            <FormErrorMessage errors={errors} name={`utilities.${index}.name`} />
                        </div>
                        <div className={styles["utilities-court-form-description"]}>
                            <label>Mô tả:</label>
                            <input
                                {...register(`utilities.${index}.description`, validation)}
                                defaultValue={field.name}
                                placeholder="Vd: Bãi đỗ xe cho cả ô tô và xe máy"
                                className="input"
                            />
                            <FormErrorMessage errors={errors} name={`utilities.${index}.description`} />
                        </div>
                    </div>
                    <div className={styles["utilities-court-form-remove-button"]}>
                        <button className="button dangerous" type="button" onClick={() => remove(index)}>
                            Xóa
                        </button>
                    </div>
                </div>
            ))}
            <div className={styles["utilities-court-form-add-button"]}>
                <button className="button" type="button" onClick={() => append({ name: "" })}>
                    Thêm tiện ích
                </button>
            </div>
            {/* <button className="button" type="button" onClick={handleSubmit(onSubmit)}>Submit</button> */}
        </div>
    );
};
export default UtilitiesCourtForm;