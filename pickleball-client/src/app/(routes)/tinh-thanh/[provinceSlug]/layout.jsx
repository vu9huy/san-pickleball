import { getMetadataSpecific } from "@/seo/metadata/metadataGeneral";
import generateProvinceMetadataObj from "@/utils/provinces/generateProvinceMetadataObj";

export async function generateMetadata({ params: { provinceSlug } }) {
    const metadataObj = generateProvinceMetadataObj(provinceSlug);
    return getMetadataSpecific(metadataObj);
}

const ProvinceDetailCourtsLayout = ({ children }) => {
    return <>{children}</>;
};
export default ProvinceDetailCourtsLayout;