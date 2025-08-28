import { loadCourtDataset } from "@/data/courts/courts";
import styles from "./page.module.css";
import getProvinceFromSlug from "@/utils/provinces/getProvinceFromSlug";
import getDistrictFromSlug from "@/utils/provinces/getDistrictFromSlug";
import CourtCard from "@/components/courtCard/CourtCard";

const DistrictDetailCourts = async ({ params: { districtSlug, provinceSlug } }) => {
    const province = getProvinceFromSlug(provinceSlug);

    const courts = await loadCourtDataset();

    const provinceCourts = courts?.filter(court => court?.location?.province === province?.value);
    const district = getDistrictFromSlug(province, districtSlug);

    const districtCourts = provinceCourts.filter(court => {
        // if (districtSlug === "tat-ca") return true;
        return court?.location?.district === district?.value;
    });

    return (
        <div className={styles["district-detail-courts-container"]}>
            <h1>Danh sách các sân pickleball ở {district.value} - {province.value}</h1>
            {districtCourts.length ?
                <div className={styles["district-detail-courts-wrapper"]}>
                    {districtCourts.map(court => (
                        <CourtCard court={court} key={court.id} />
                    ))}
                </div>
                : <p className={styles["district-detail-empty-courts"]}>Hiện tại chúng tôi chưa có thông tin về sân pickleball ở {district.value} - {province.value}. Nếu bạn có thồng tin về sân pickleball ở đây, hãy liên hệ với chúng tôi qua <a href="https://www.facebook.com/people/S%C3%A2n-Pickleball/61561925831015/">facebook</a>.</p>}
        </div>
    );
};
export default DistrictDetailCourts;
