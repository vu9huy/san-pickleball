import { getMetadataGeneral } from "@/seo/metadata/metadataGeneral";

export const metadata = getMetadataGeneral("tinh-thanh");

const TinhThanhLayout = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
};
export default TinhThanhLayout;