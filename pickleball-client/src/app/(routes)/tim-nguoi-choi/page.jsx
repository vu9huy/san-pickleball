"use client"

import AuthRequired from "@/components/locationProvider/AuthRequired";
import styles from "./page.module.css";
import LocationProvider from "@/components/locationProvider/LocationProvider";
// import SelectLocation from "@/components/mapLocationProvider/MapLocationProvider";
import UserLocationMap from "@/components/userLocations/UserLocationMap";
import useUserData from "@/customHook/useUserData";

// export async function generateMetadata() {
//     return {
//         title: product.title,
//         description: product.body
//     };
// }

export default function TimNguoiChoi() {
    const { userData, userDataLoading, userDataRefesh } = useUserData();

    console.log("userDataLoading323223", userDataLoading);
    

    if(!userData && !userDataLoading) return <AuthRequired/>;

    return <div className={`${styles["tim-nguoi-choi-container"]} page-width`}>
        <LocationProvider 
            userData={userData} 
            userDataLoading={userDataLoading}
            userDataRefesh={userDataRefesh}
        />
        {userData?.location?.coordinates ?
        <UserLocationMap userData={userData}/> : ""}
        
    </div>;
}
