"use client";

import styles from "./TopProvinceCardList.module.css";
import { useGetTopProvincesFetchingApi } from "@/api/serverApi/callApi";
import ProvinceCard from "../provinceCard/ProvinceCard";

const TopProvinceCardList = () => {
    const topProvincesRes = useGetTopProvincesFetchingApi();
    const topProvinces = topProvincesRes?.data?.data || [];

    // if (isPending) return (<>
    //     {[...Array(3)].map((_, index) => (
    //         //   <Skeleton key={index} height={50} width={300} />
    //         "Loading"
    //     ))}
    // </>);
    if(!topProvinces || !topProvinces?.length) return "";

    return (
        <div className={`${styles["province-card-list-wrapper"]} custom-scroll-bar`}>
            <div className={styles["province-card-list"]}>
                {topProvinces?.map((provinceData, index) => (
                    <ProvinceCard
                        type="top"
                        key={index}
                        provinceData={provinceData}
                    />
                ))}
            </div>
        </div>
    );
};

export default TopProvinceCardList;