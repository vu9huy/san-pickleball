"use client";

import keyObjectToArray from "@/utils/others/keyObjectToArray";
import styles from "./CourtsFilter.module.css";
import { Controller, useForm } from "react-hook-form";
import { amenitiesLabels, featureLabels, surfaceLabels } from "@/helpers/courtFeatures";
// import DatePickerComp from "../datePicker/DatePickerComp";
// import TimePickerComp from "../timePicker/TimePickerComp";
// import { addDays, subDays } from "date-fns";


const CourtsFilter = ({ handleFilterSubmit, handleDisplayFilter }) => {

    const { register, handleSubmit, control, watch } = useForm();

    return (
        <div className={styles["courts-filter-container"]}>
            <form onSubmit={handleSubmit(handleFilterSubmit)}>
                <div className={styles["courts-filter-wrapper-item"]}>
                    <div className={`${styles["courts-filter-item"]} ${styles["courts-filter-input"]}`}>
                        <label htmlFor="name" className="label">Tên</label>
                        <input className={`${styles["courts-filter-item-input"]} input`} type="text" id="name" {...register("name")} />
                    </div>

                    <div className={`${styles["courts-filter-item"]} ${styles["courts-filter-select"]}`}>
                        <label htmlFor="surface" className="label">Mặt sân</label>
                        <select id="surface" {...register("surface")}>
                            <option value="">Bất kỳ</option>
                            {keyObjectToArray(surfaceLabels).map((surface, index) => {
                                return (
                                    <option key={index} value={surface}>{surfaceLabels[surface]}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className={styles["courts-filter-wrapper-item"]}>
                    <fieldset className={`${styles["courts-filter-item"]} ${styles["courts-filter-checkbox"]}`}>
                        <legend className="label">Tính năng</legend>
                        <div className="checkbox">
                            {keyObjectToArray(featureLabels).map((feature, index) => {
                                return (
                                    <label key={index}>
                                        <input type="checkbox" {...register(`feature.${feature}`)} />
                                        <span>{featureLabels[feature]}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </fieldset>
                    <fieldset className={`${styles["courts-filter-item"]} ${styles["courts-filter-checkbox"]}`}>
                        <legend className="label">Tiện ích</legend>
                        <div className={`${styles["courts-filter-item-checkbox"]} ${styles["checkbox-wrapper"]} checkbox`}>
                            {keyObjectToArray(amenitiesLabels).map((amenitie, index) => {
                                return (
                                    <label key={index}>
                                        <input type="checkbox" {...register(`amenities.${amenitie}`)} />
                                        {amenitiesLabels[amenitie]}
                                    </label>
                                );
                            })}
                        </div>
                    </fieldset>
                </div>


                {/* FILTER BY BOOKING */}
                {/* <div className={`${styles["courts-filter-item"]} ${styles["courts-filter-booking"]}`}>
                    <div className="checkbox">
                        <Controller
                            name={"booking.value"}
                            control={control}
                            render={({ field }) => {
                                return <label className={styles["courts-filter-booking-value-label"]}>
                                    <input
                                        type="checkbox"
                                        onChange={field.onChange}
                                        checked={field?.value?.value}
                                        name=""
                                    />
                                    <span>Lọc theo lịch trống</span>
                                </label>;
                            }}
                        />

                    </div>
                    {watch("booking.value") ?
                        <>
                            <div className="">
                                <label className="label">Ngày</label>
                                <Controller
                                    name={"booking.date"}
                                    control={control}
                                    defaultValue={new Date()}
                                    render={({ field }) => {
                                        return <DatePickerComp
                                            minDate={subDays(new Date(), 0)}
                                            maxDate={addDays(new Date(), 10)}
                                            selectingDate={(value) => field.onChange(value)}
                                        />;
                                    }}
                                />
                            </div>
                            <div className="">
                                <label className="label">Từ</label>
                                <Controller
                                    name={"booking.startTime"}
                                    control={control}
                                    defaultValue={{ hours: 0, minutes: 0 }}
                                    render={({ field }) => {
                                        return <TimePickerComp
                                            timeDefault={{ hours: 0, minutes: 0 }}
                                            field={field} />;
                                    }}
                                />
                                <label className="label">đến</label>
                                <Controller
                                    name={"booking.endTime"}
                                    control={control}
                                    defaultValue={{ hours: 24, minutes: 0 }}
                                    render={({ field }) => {
                                        return <TimePickerComp
                                            timeDefault={{ hours: 24, minutes: 0 }}
                                            field={field} />;
                                    }}
                                />
                            </div>
                        </> : ""}
                </div> */}

                <div className={styles["courts-filter-footer"]}>
                    <button className="button" type="submit">Lọc</button>
                    <div className={styles["court-filter-body-close"]}>
                        <button className="secondary-button" onClick={handleDisplayFilter}>Đóng</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CourtsFilter;
