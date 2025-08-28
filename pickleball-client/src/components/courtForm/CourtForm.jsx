"use client";

import { Controller, useFieldArray } from "react-hook-form";
import styles from "./CourtForm.module.css";
import ReactSelect from "react-select";
import ImageUpload from "../imageUpload/ImageUpload";
import FormErrorMessage from "../formErrorMessage/FormErrorMessage";
import { reactSelectCustomStyles } from "@/libs/reactSelect/customStyles";
import vietnameseProvincesData from "@/data/provinces/vietnamese_provinces_list.json";
import FeatureCourtForm from "./featureCourtForm/FeatureCourtForm";
import UtilitiesCourtForm from "./utilitiesCourtForm/UtilitiesCourtForm";
import AvailabilityCourtForm from "./availabilityCourtForm/AvailabilityCourtForm";
import BookingInfoCourtForm from "./bookingInfoCourtForm/BookingInfoCourtForm";
import GeolocationCourtForm from "./geolocationCourtForm/GeolocationCourtForm";
import Link from "next/link";
import AmenitiesCourtForm from "./amenitiesCourtForm/AmenitiesCourtForm";
import SocialCourtForm from "./socialCourtForm/SocialCourtForm";

const inputs = [
    {
        id: "court-form-name",
        inputType: "input",
        label: "Tên sân",
        register: "name",
        type: "text",
        placeholder: "Vd: Sân Pickleball Đại Kim",
        validation: {
            required: "Vui lòng nhập trường này"
        }
    },
    {
        id: "court-form-description",
        inputType: "textarea",
        label: "Mô tả",
        register: "description",
        placeholder: "Vd: Sân Pickleball Đại Kim là một trong những sân pickleball hiện đại nhất Hà Nội...",
        validation: {
            required: "Vui lòng nhập trường này"
            // pattern: {
            //     value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            //     message: "Password with at least 8 characters, including at least one letter and one number."
            // }
        }
    },
    {
        id: "court-form-province",
        inputType: "select",
        register: "location.province"
    },
    {
        id: "court-form-district",
        inputType: "select",
        register: "location.district"
    },
    {
        id: "court-form-detail-address",
        inputType: "input",
        type: "text",
        label: "Địa chỉ cụ thể",
        placeholder: "Vd: 100 Trần Phú, Hà Đông, Hà Nội",
        register: "location.address",
        validation: {
            required: "Vui lòng nhập trường này"
            // pattern: {
            //     value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            //     message: "Password with at least 8 characters, including at least one letter and one number."
            // }
        }
    },
    {
        id: "court-form-number-court",
        inputType: "input",
        type: "number",
        label: "Số lượng sân",
        register: "numberOfCourts",
        placeholder: "Vd: 4",
        min: "1",
        max: "20",
        validation: {
            required: "Vui lòng nhập trường này",
            pattern: {
                value: /^(0*[1-9]\d*)$/,
                message: "Nhập số nguyên dương (ví dụ: 2, 4, 8...)"
            }
        }
    },
    {
        id: "court-form-feature",
        inputType: "checkbox",
        label: "Tính năng",
        register: "courtFeature"
    }
];

const MAX_COURT_IMAGES = 10;

// const courtDefault = {
//     "name": "",
//     "description": "",
//     "location": {
//         "address": "",
//         "province": "",
//         "district": ""
//     },
//     "geolocation": {
//         "latitude": null,
//         "longitude": null
//     },
//     "numberOfCourts": null,
//     "feature": {
//         "indoor": false,
//         "canopy": false,
//         "equipmentRentals": false,
//         "freeTrainer": false
//     },
//     "utilities": [],
//     "availability": [
//         {
//             "label": "",
//             "openTime": {
//                 "hours": 8,
//                 "minutes": 0
//             },
//             "closeTime": {
//                 "hours": 23,
//                 "minutes": 0
//             }
//         }
//     ],
//     "bookingInfo": {
//         "priceRange": {},
//         "detail": []
//     },
//     "images": []
// };

const getDistrictFromProvince = (vietnameseProvincesData, provinceValue) => {
    const province = vietnameseProvincesData.find((c) => c.value === provinceValue);
    return province?.districts;
};

const CourtForm = (props) => {
    const {
        register,
        formState: { errors },
        setValue,
        control,
        watch,
        images,
        setImages
    } = props;

    const districts = getDistrictFromProvince(vietnameseProvincesData, watch("location.province"));

    return (
        <div className={styles["court-form-container"]}>
            {inputs.map(input => {
                if (input.inputType === "select" && input.id === "court-form-province") {
                    return (<div className={`${styles["court-form-field"]} ${styles[input.id]}`} key={input.id}>
                        <label className={styles["court-form-label"]} htmlFor={"court-form-select-province"}>Tỉnh/thành:</label>
                        <Controller
                            control={control}
                            defaultValue={""}
                            rules={{ required: "Vui lòng nhập trường này" }}
                            name="location.province"
                            render={({ field }) => {
                                return <ReactSelect
                                    instanceId="court-form-select-province"
                                    inputId="court-form-select-province"
                                    styles={reactSelectCustomStyles}
                                    inputRef={field.ref}
                                    placeholder="Chọn tỉnh/thành"
                                    options={vietnameseProvincesData}
                                    value={vietnameseProvincesData.find((c) => c.value === field.value)}
                                    // value={field.value}
                                    onChange={(val) => {
                                        setValue("location.district", null);
                                        field.onChange(val.value);
                                    }}
                                />;
                            }}
                        />
                        <FormErrorMessage errors={errors} name={"location.province"} />
                    </div>);
                }
                if (input.inputType === "select" && input.id === "court-form-district") {
                    return (<div className={`${styles["court-form-field"]} ${styles[input.id]}`} key={input.id}>
                        <label className={styles["court-form-label"]} htmlFor={"court-form-select-district"}>Quận/huyện:</label>
                        <Controller
                            control={control}
                            defaultValue={""}
                            rules={{ required: "Vui lòng nhập trường này" }}
                            name="location.district"
                            render={({ field }) => {
                                return <ReactSelect
                                    key={watch("location.province")}
                                    instanceId="court-form-select-district"
                                    inputId="court-form-select-district"
                                    styles={reactSelectCustomStyles}
                                    inputRef={field.ref}
                                    placeholder="Chọn quận/huyện (cho HN và TP.HCM)"
                                    isDisabled={!districts}
                                    options={districts}
                                    value={districts?.find((district) => district.value === field.value)}
                                    onChange={(val) => field.onChange(val.value)}
                                />;
                            }}
                        />
                        <FormErrorMessage errors={errors} name={"location.districts"} />
                    </div>);
                }
                <div className={`${styles["court-form-field"]}`}>
                    <label className={styles["court-form-label"]} >Vị trí địa lý (<Link className={`${styles["geoloaction-court-form-link"]} link`} href={"/huong-dan/lay-kinh-do-vi-do"}>Hướng dẫn lấy Vị trí địa lý trên google</Link>):</label>
                    <GeolocationCourtForm
                        register={register}
                        errors={errors}
                    />
                </div>;
                if (input.inputType === "checkbox") {
                    return <div key={input.id} className={`${styles["court-form-field"]}`}>
                        <label className={styles["court-form-label"]} >Tính năng:</label>
                        <FeatureCourtForm register={register} />
                    </div>;
                }
                return (<div className={`${styles["court-form-field"]} ${styles[input.id]}`} key={input.id}>
                    <label className={styles["court-form-label"]} htmlFor={input.id}>{input.label}:</label>
                    {input.inputType === "input" ?
                        <input
                            id={input.id}
                            type={input.type}
                            placeholder={input.placeholder}
                            max={input.max ? input.max : ""}
                            min={input.min ? input.min : ""}
                            className={`${styles["court-form-input"]} input`}
                            {...register(input.register, input.validation)}
                        /> : ""
                    }
                    {input.inputType === "textarea" ?
                        <textarea
                            id={input.id}
                            // value={}
                            rows={5}
                            placeholder={input.placeholder}
                            className={`${styles["court-form-textarea"]} ${styles[input.id]} input`}
                            {...register(input.register, input.validation)}
                        /> : ""
                    }
                    <FormErrorMessage errors={errors} name={input.register} />
                </div>);
            })}
            <div className={`${styles["court-form-field"]}`}>
                <label className={styles["court-form-label"]} >Liên hệ:</label>
                <SocialCourtForm
                    register={register}
                    control={control}
                    errors={errors}
                    useFieldArray={useFieldArray} />
            </div>
            <div className={`${styles["court-form-field"]}`}>
                <label className={styles["court-form-label"]} >Tiện ích:</label>
                <AmenitiesCourtForm
                    register={register}
                    control={control}
                    errors={errors}
                    useFieldArray={useFieldArray} />
            </div>
            <div className={`${styles["court-form-field"]}`}>
                <label className={styles["court-form-label"]} >Dịch vụ khác:</label>
                <UtilitiesCourtForm
                    register={register}
                    control={control}
                    errors={errors}
                    useFieldArray={useFieldArray}
                />
            </div>
            <div className={`${styles["court-form-field"]}`}>
                <label className={styles["court-form-label"]} >Thời gian hoạt động:</label>
                <AvailabilityCourtForm
                    Controller={Controller}
                    register={register}
                    control={control}
                    errors={errors}
                    watch={watch}
                    useFieldArray={useFieldArray}
                />
            </div>
            <div className={`${styles["court-form-field"]}`}>
                <label className={styles["court-form-label"]} >Giá:</label>
                <BookingInfoCourtForm
                    register={register}
                    control={control}
                    errors={errors}
                    watch={watch}
                    useFieldArray={useFieldArray}
                />
            </div>
            <div className={`${styles["court-form-field"]}`}>
                <label className={styles["court-form-label"]} >Hình ảnh sân:</label>
                <Controller
                    control={control}
                    defaultValue={images}
                    rules={{
                        // validate: {
                        //     checkImagesMin: () => images.length !== 0 || "Chọn ít nhất một ảnh"
                        // }
                    }}
                    name="images"
                    render={({ field }) => {
                        return <ImageUpload field={field} multiple={true} images={images} setImages={setImages} maxFiles={MAX_COURT_IMAGES} />;
                    }}
                />
                <FormErrorMessage errors={errors} name={"images"} />
            </div>
        </div>
    );
};

export default CourtForm;