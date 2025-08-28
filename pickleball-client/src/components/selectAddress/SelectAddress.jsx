"use client";

import React, { useId } from "react";
import ReactSelect from "react-select";
import styles from "./SelectAddress.module.css";
import vietnameseProvincesData from "@/data/provinces/vietnamese_provinces_list.json";
import { reactSelectCustomStyles } from "@/libs/reactSelect/customStyles";
import { COUNTRY_ZOOM, DISTRICT_ZOOM, PROVINCE_ZOOM, VIETNAME_CENTER_COORDINATES } from "@/constants/VisglMapConstant";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import addQueryString from "@/utils/url/addQueryString";

const SelectAddress = ({ province, /* selectProvince, */ district, /* selectDistrict, */ setProvince, setDistrict, setViewState }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const selectProvince = (provinceSelected) => {
        setProvince(provinceSelected);
        setDistrict("");
        if (!provinceSelected?.geolocation?.latitude && !provinceSelected?.geolocation?.longitude) {
            console.log("Error: Province geolocation not exist");
        }
        const newViewState = {
            lat: provinceSelected.geolocation.latitude,
            lng: provinceSelected?.geolocation?.longitude,
            zoom: PROVINCE_ZOOM
        };
        // select Tất cả các tỉnh/thành
        if (!provinceSelected.value) {
            Object.assign(newViewState, { lat: VIETNAME_CENTER_COORDINATES.lat, lng: VIETNAME_CENTER_COORDINATES.lng, zoom: COUNTRY_ZOOM });
        }

        setViewState(newViewState);

        const addQueries = [
            { name: "province", value: provinceSelected.slug }
        ];
        const path = addQueryString({ pathname, searchParams, addQueries, isRemoveAll: true });
        router.push(path);
    };

    const selectDistrict = (districtSelected) => {
        setDistrict(districtSelected);
        if (!districtSelected?.geolocation?.latitude && !districtSelected?.geolocation?.longitude) {
            console.log("Error: District geolocation not exist");
        }
        const newViewState = {
            lat: districtSelected.geolocation.latitude,
            lng: districtSelected?.geolocation?.longitude,
            zoom: DISTRICT_ZOOM
        };
        // select Tất cả các quận/huyện
        if (!districtSelected?.value) {
            Object.assign(newViewState, { zoom: PROVINCE_ZOOM });
        }

        setViewState(newViewState);

        const addQueries = [
            { name: "district", value: districtSelected.slug }
        ];
        const path = addQueryString({ pathname, searchParams, addQueries });
        router.push(path);
    };

    return (<div className={styles["select-address-container"]}>
        <div className={styles["select-address-provinces"]}>
            <p className={styles["select-address-label"]}>
                <span>Tỉnh/thành: </span>
                <span><b>{province.value}</b></span>
            </p>
            <ReactSelect
                options={vietnameseProvincesData}
                styles={reactSelectCustomStyles}
                instanceId={useId()}
                onChange={(value) => selectProvince(value)}
                value={province}
                placeholder="Chọn tỉnh/thành"
            />
        </div>

        <div className={styles["select-address-district"]}>
            <p className={styles["select-address-label"]}>
                <span>Quận/huyện: </span>
                <span><b>{district?.value}</b></span>
            </p>
            {/* <p className={styles["select-address-note"]}>*Chỉ áp dụng cho Hà Nội và thành phố Hồ Chí Minh</p> */}
            <ReactSelect
                options={province?.districts ? province?.districts : []}
                styles={reactSelectCustomStyles}
                instanceId={useId()}
                onChange={(value) => selectDistrict(value)}
                isDisabled={!province?.districts}
                value={district}
                placeholder="Chọn quận/huyện (cho HN và TP.HCM)"
            />
        </div>

    </div>);
};

export default SelectAddress;
