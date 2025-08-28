import { reactSelectCustomStyles } from "@/libs/reactSelect/customStyles";
import { formatDateCustom } from "@/utils/time/dateFns";
import { Controller } from "react-hook-form";
import styles from "./BookingForm.module.css";
import TimePickerComp from "@/components/timePicker/TimePickerComp";
import timeToBlocks from "@/utils/time/timeToBlocks";
import convertTimeObject from "@/utils/time/convertTimeObject";
import compareTimes from "@/utils/time/compareTimes";
import FormErrorMessage from "@/components/formErrorMessage/FormErrorMessage";
import { useEffect, useState } from "react";
import useCourtNumberOptions from "@/customHook/useCourtNumberOptions";
import ReactSelect from "react-select";
import DatePickerComp from "@/components/datePicker/DatePickerComp";
import { addDays, subDays } from "date-fns";
import getDayOfWeek from "@/utils/time/getDayOfWeek";

const BookingForm = (props) => {

    const {
        selectedBooking,
        selectedDate,
        bookings,
        openingTime,
        closingTime,
        numberOfCourts,
        readOnly,
        // Form props
        register,
        trigger,
        watch,
        errors,
        control
    } = props;

    const selectedDay = selectedDate.getDay();

    const bookingType = [
        { label: "Linh hoạt", value: "flexible" },
        { label: `Cố định (${getDayOfWeek(selectedDay)} hàng tuần)`, value: "fixed_day" }
    ];
    const courtNumber = watch("court.number");
    const filteredBookingByCourtNumber = bookings.filter(booking => booking?.court?.number === courtNumber);
    const excludeTimes = filteredBookingByCourtNumber.reduce((accumulator, booking) => {
        const startTime = booking?.bookingInfo?.startTime;
        const endTime = booking?.bookingInfo?.endTime;
        const blockTimes = timeToBlocks({ startTime, endTime });
        accumulator.push(...blockTimes);
        return accumulator;
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "bookingInfo.startTime") {
                trigger("bookingInfo.endTime");
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, trigger]);

    const {
        courtNumberOptions
    } = useCourtNumberOptions({ numberOfCourts });

    const checkFlexibleBookingType = watch("bookingInfo.type") === "flexible";

    const bookingDisabled = watch("disabled");
    const disabledDates = bookingDisabled.dates;
    // console.log("disabled.dates544554", bookingDisabled);

    return (
        <div className={styles["booking-form-container"]}>
            <h4>Sân {selectedBooking?.court?.number}: {formatDateCustom(selectedDate, "EEEE - dd/MM/yyyy")}</h4>
            <div className={`${styles["booking-form-field"]} ${styles["booking-form-field-style"]}`}>
                <p>Loại lịch:</p>
                <Controller
                    control={control}
                    name="bookingInfo.type"
                    render={({ field }) => {
                        return <ReactSelect
                            isDisabled={readOnly}
                            key={watch("bookingInfo.type")}
                            instanceId="booking-form-type-select"
                            inputId="booking-form-type-select"
                            styles={reactSelectCustomStyles}
                            inputRef={field.ref}
                            placeholder="Chọn loại lịch"
                            options={bookingType}
                            value={bookingType.find((c) => c.value === field.value)}
                            onChange={(val) => field.onChange(val.value)}
                        />;
                    }}
                />
            </div>
            {!selectedBooking?.court?.id ?
                <div className={`${styles["booking-form-field"]} ${styles["booking-form-field-court-select"]}`}>
                    <p>Sân:</p>
                    <Controller
                        control={control}
                        name="court.number"
                        render={({ field }) => {
                            return <ReactSelect
                                isDisabled={readOnly}
                                key={watch("court.number")}
                                instanceId="booking-form-court-number-select"
                                inputId="booking-form-court-number-select"
                                styles={reactSelectCustomStyles}
                                inputRef={field.ref}
                                placeholder="Chọn số sân"
                                options={courtNumberOptions}
                                value={courtNumberOptions.find((c) => c.value === field.value)}
                                onChange={(val) => field.onChange(val.value)}
                            />;
                        }}
                    />
                </div> : ""}


            <div className={`${styles["booking-form-field"]} ${styles["booking-form-field-time"]}`}>
                <p>Thời gian: {`${convertTimeObject(watch("bookingInfo.startTime"))} - ${convertTimeObject(watch("bookingInfo.endTime"))}`}</p>
                <div className={styles["booking-form-time-wrapper"]}>
                    <div className={styles["booking-form-time-detail"]}>
                        <span>Bắt đầu:</span>
                        <Controller
                            name={"bookingInfo.startTime"}
                            control={control}
                            render={({ field }) => {
                                return <TimePickerComp
                                    isDisabled={readOnly}
                                    timeDefault={selectedBooking?.bookingInfo?.startTime}
                                    field={field}
                                    inputRef={field.ref}
                                    minTime={openingTime}
                                    maxTime={closingTime}
                                    excludeTimes={excludeTimes} />;
                            }}
                        />
                    </div>
                    <div className={styles["booking-form-time-detail"]}>
                        <span>Kết thúc:</span>
                        <Controller
                            name={"bookingInfo.endTime"}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    const validate = compareTimes({ startTime: watch("bookingInfo.startTime"), endTime: value, timeToCompare: 1 });
                                    return validate || "Thời gian kết thúc phải lớn hơn thời gian bắt đầu ít nhất một tiếng";
                                }
                            }}
                            render={({ field }) => {
                                return <TimePickerComp
                                    isDisabled={readOnly}
                                    timeDefault={selectedBooking?.bookingInfo?.endTime}
                                    field={field}
                                    inputRef={field.ref}
                                    minTime={openingTime}
                                    maxTime={closingTime}
                                    excludeTimes={excludeTimes} />;
                            }}
                        />
                    </div>
                </div>
                <FormErrorMessage errors={errors} name={"bookingInfo.endTime"} />
            </div>

            <div className={`${styles["booking-form-field"]} ${styles["booking-form-field-disable"]}`}>
                <div className="checkbox">
                    <Controller
                        name={"disabled"}
                        control={control}
                        render={({ field }) => {
                            return <label >
                                <input
                                    type="checkbox"
                                    onChange={(e) => {

                                        if (!e.target.checked) {
                                            field.onChange({
                                                value: e.target.checked,
                                                dates: []
                                            });
                                        }

                                        if (checkFlexibleBookingType && e.target.checked) {
                                            field.onChange({
                                                value: e.target.checked,
                                                dates: [selectedDate]
                                            });
                                        }

                                        if (!checkFlexibleBookingType && e.target.checked) {
                                            field.onChange({
                                                value: e.target.checked,
                                                dates: [selectedDate]
                                            });
                                        }

                                    }}
                                    checked={field?.value?.value}
                                    name=""
                                />
                                {
                                    checkFlexibleBookingType ?
                                        <span>Tạm dừng: <span className={styles["booking-form-disable-date-selected"]}>{formatDateCustom(selectedDate, "EEEE - dd/MM/yyyy")}</span></span> :
                                        <span>Tạm dừng: <span className={styles["booking-form-disable-date-selected"]}>{formatDateCustom(disabledDates[0], "EEEE - dd/MM/yyyy")}</span></span>
                                }
                            </label>;
                        }}
                    />

                </div>
                {!checkFlexibleBookingType && watch("disabled.value") ?
                    <Controller
                        name={"disabled.dates"}
                        control={control}
                        defaultValue={[selectedDate]}
                        render={({ field }) => {
                            return <DatePickerComp
                                defaultDate={disabledDates[0]}
                                minDate={subDays(new Date(), 0)}
                                maxDate={addDays(new Date(), 10)}
                                includeDates={[new Date(), addDays(new Date(), 7)]}
                                selectingDate={(value) => field.onChange([value])}
                            />;
                        }}
                    /> : ""
                }
            </div>

            <div className={`${styles["booking-form-field"]} ${styles["booking-form-field-note"]}`}>
                <label htmlFor="booking-form-note">Ghi chú:</label>
                {/* <input
                    id="booking-form-note"
                    type="text"
                    placeholder="Ghi chú"
                    className={`${styles["booking-form-input"]} input`}
                    {...register("bookingInfo.note")}
                /> */}
                <textarea
                    rows={3}
                    id="booking-form-note"
                    placeholder="Ghi chú"
                    className={`${styles["booking-form-input"]} input`}
                    disabled={readOnly}
                    {...register("bookingInfo.note")}
                />
            </div>
        </div>
    );
};

export default BookingForm;