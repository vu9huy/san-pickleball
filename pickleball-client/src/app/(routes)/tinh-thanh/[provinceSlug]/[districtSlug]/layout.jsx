import DistrictList from "@/components/districtList/DistrictList";
import { getMetadataSpecific } from "@/seo/metadata/metadataGeneral";
import generateDistrictMetadataObj from "@/utils/provinces/generateDistrictMetadataObj";

export async function generateMetadata({ params: { provinceSlug, districtSlug } }) {
    const metadataObj = generateDistrictMetadataObj(provinceSlug, districtSlug);
    return getMetadataSpecific(metadataObj);
}

const ProvinceDetailCourtsLayout = ({ children, params: { provinceSlug } }) => {
    return (
        <div className="page-width">
            <DistrictList provinceSlug={provinceSlug} />
            {children}
        </div>
    );
};
export default ProvinceDetailCourtsLayout;