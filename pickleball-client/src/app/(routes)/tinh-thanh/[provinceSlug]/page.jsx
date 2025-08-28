import getProvinceFromSlug from "@/utils/provinces/getProvinceFromSlug";
import styles from "./page.module.css";
import { loadCourtDataset } from "@/data/courts/courts";
import CourtCard from "@/components/courtCard/CourtCard";
import DistrictList from "@/components/districtList/DistrictList";
import useGetCourtsByProvince from "@/customHook/useGetCourtsByProvince";

const ProvinceDetailCourts = async ({ params: { provinceSlug } }) => {

    const province = getProvinceFromSlug(provinceSlug);
    // const courts = useGetCourtsByProvince({ provinceSlug });

    // console.log("courtsewewwe", courts);

    return (
        <div className={`${styles["province-detail-courts-container"]} page-width`}>
            <DistrictList provinceSlug={provinceSlug} />
            <h1>Danh sách các sân pickleball ở {province.value}</h1>
            <div className={styles["province-detail-courts-wrapper"]}>
                {/* {provinceCourts.map(court => (
                    <CourtCard court={court} key={court.id} />
                ))} */}
            </div>
        </div>
    );
};

export default ProvinceDetailCourts;