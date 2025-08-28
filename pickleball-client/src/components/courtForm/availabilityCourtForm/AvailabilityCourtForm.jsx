import FormErrorMessage from "@/components/formErrorMessage/FormErrorMessage";
import styles from "./AvailabilityCourtForm.module.css";
import TimePickerComp from "@/components/timePicker/TimePickerComp";
import DaysSelectCourtForm from "./daysSelectCourtForm/DaysSelectCourtForm";
import { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";

const AvailabilityCourtForm = ({ Controller, watch, register, control, useFieldArray, errors }) => {

    const { fields, append, remove } = useFieldArray({
        control,
        name: "availability"
    });

    const validation = {
        required: "Vui lòng nhập trường này",
        pattern: {}
    };

    const weekDays = [
        { value: 1, label: "Thứ 2" },
        { value: 2, label: "Thứ 3" },
        { value: 3, label: "Thứ 4" },
        { value: 4, label: "Thứ 5" },
        { value: 5, label: "Thứ 6" },
        { value: 6, label: "Thứ 7" },
        { value: 0, label: "Chủ nhật" }
    ];
    const availability = watch("availability");
    const availabilityDays = availability.flatMap(item => item.days);
    const remainingDays = weekDays.filter(day => !availabilityDays.includes(day.value));

    const [days, setDays] = useState(remainingDays);

    useEffect(() => {
        setDays(remainingDays);
    }, [availabilityDays.length]);

    // const handleSelectedDay = (selected) => {
    //     const selectedValues = new Set(selected.map(item => item.value));
    //     const filteredDays = days.filter(item => !selectedValues.has(item.value));
    //     setDays(filteredDays);
    // }

    const defaultTime = {
        label: "",
        openTime: { hours: 8, minutes: 0 },
        closeTime: { hours: 24, minutes: 0 }
    };


    return (
        <div className={styles["availability-court-form-container"]}>
            {fields.map((field, index) => (
                <div className={styles["availability-court-form-field"]} key={field.id}>
                    <div className={styles["availability-court-form-time-select"]}>
                        <div className={styles["availability-court-form-field-days-select"]}>
                            <label>Ngày áp dụng: </label>
                            <Controller
                                name={`availability.${index}.days`}
                                control={control}
                                rules={{
                                    required: "Vui lòng chọn ngày",
                                    validate: {
                                        checkSelectAllDayInWeek: () => {
                                            // console.log("!days.length", !days.length);
                                            return !days.length || "Chọn thời gian hoạt động cho tất cả ngày trong tuần";
                                        }
                                    }
                                }}
                                render={({ field: childField }) => {
                                    const handleSelectedDay = (selected) => {
                                        const selectedValues = selected.map(item => item.value);
                                        const selectedObjects = new Set(selectedValues);
                                        const filteredDays = days.filter(item => !selectedObjects.has(item.value));
                                        setDays(filteredDays);

                                        childField.onChange(selectedValues);
                                    };
                                    const filteredDays = weekDays.filter(day => childField?.value?.includes(day.value));
                                    return <DaysSelectCourtForm days={days} defaultValue={filteredDays} selectHandler={handleSelectedDay} />;
                                }}
                            />
                            <FormErrorMessage errors={errors} name={`availability.${index}.days`} />
                        </div>
                        <div className={styles["availability-court-form-field-input-wrapper"]}>
                            <label>Hiển thị: </label>
                            <input
                                className="input"
                                placeholder="Vd: Thứ 2 - Thứ 6"
                                {...register(`availability.${index}.label`, validation)}
                            />
                            <FormErrorMessage errors={errors} name={`availability.${index}.label`} />
                        </div>
                        <div className={styles["availability-court-form-field-input-wrapper"]}>
                            <label>Mở cửa: </label>
                            <Controller
                                name={`availability.${index}.openTime`}
                                control={control}
                                // defaultValue={startTimeDefault}
                                render={({ field: childField }) => {
                                    return <TimePickerComp timeDefault={childField.value} field={childField} />;
                                }}
                            />
                            <FormErrorMessage errors={errors} name={`availability.${index}.openTime`} />
                        </div>
                        <div className={styles["availability-court-form-field-input-wrapper"]}>
                            <label>Đóng cửa: </label>
                            <Controller
                                name={`availability.${index}.closeTime`}
                                control={control}
                                // defaultValue={endTimeDefault}
                                render={({ field: childField }) => {
                                    return <TimePickerComp timeDefault={childField.value} field={childField} />;
                                }}
                            />
                            <FormErrorMessage errors={errors} name={`availability.${index}.closeTime`} />
                        </div>
                    </div>
                    <div className={styles["availability-court-form-remove-button"]}>
                        <button className={fields.length <= 1 ? "button disable" : "button dangerous"} type="button" onClick={() => remove(index)}>
                            Xóa
                        </button>
                    </div>
                </div>
            ))}
            <div className={styles["availability-court-form-add-button"]}>
                <button className={days.length ? "button" : "disable button"} type="button" onClick={() => append(defaultTime)}>
                    Thêm thời gian hoạt động
                </button>
                {!days.length ? <p className={"error-message"}>*Đã chọn hết các ngày trong tuần</p> : ""}
            </div>
        </div>
    );
};
export default AvailabilityCourtForm;