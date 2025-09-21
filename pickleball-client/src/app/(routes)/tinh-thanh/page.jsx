"use client";

import styles from "./page.module.css";
import vietnameseProvincesData from "@/data/provinces/vietnamese_provinces_list.json";
import courts from "@/data/courts/courts.json";
import ProvinceCard from "@/components/topProvinces/provinceCard/ProvinceCard";
import { useMemo, useState } from "react";
import { useGetAllProvincesFetchingApi } from "@/api/serverApi/callApi";

function mapCourtsToProvinces(provinces, courts) {
    if (!courts) return [];
    const courtsByProvince = courts?.reduce((map, court) => {
        if (!map[court.location.province]) {
            map[court.location.province] = [];
        }
        map[court.location.province].push({
            slug: court.slug,
            numberOfCourts: court.numberOfCourts
        });
        return map;
    }, {});

    return provinces.map(province => ({
        ...province,
        courtsData: courtsByProvince[province.value] || []
    }));
}

const TinhThanh = () => {
    const allProvincesRes = useGetAllProvincesFetchingApi();
    
    // First province is Tất cả tỉnh thành

    const provinces = useMemo(()=>{
        const provinces = allProvincesRes?.data?.data?.results || [];
        provinces.sort((a, b) => b.numberOfCourts - a.numberOfCourts);        
        return provinces;
    },[allProvincesRes])

    const [searchKeyword, setSearchKeyword] = useState("");
    const handleSearch = (e) => {
        setSearchKeyword(e.target.value);
    };
    const filterProvinces = provinces.filter(province => {
        return province.label.toLocaleLowerCase().includes(searchKeyword.toLocaleLowerCase());
    });    

    return (
        <div className={`${styles["tinh-thanh-container"]} page-width`}>
            <div className={styles["tinh-thanh-search"]}>
                <label>Tìm tỉnh/thành</label>
                <input className="input" value={searchKeyword} onChange={handleSearch}></input>
            </div>
            <div className={styles["tinh-thanh-wrapper"]}>
                {filterProvinces.map((provinceData, index) => (
                    <ProvinceCard
                        type="full"
                        key={index}
                        provinceData={provinceData}
                    />
                ))}
            </div>
        </div>
    );
};

export default TinhThanh;