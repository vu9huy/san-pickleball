import { globalConfig } from "@/config/globalConfig";
import { OrganizationJsonLd } from "next-seo";


const OrganizationSchemaComp = () => {

    return (
        <OrganizationJsonLd
            useAppDir={true}
            type="Corporation"
            id="https://sanpickleball.xyz"
            logo="images/logo-fit-96x96.webp"
            name="Sân Pickleball"
            contactPoint={[
                {
                    contactType: "customer service",
                    email: "quan2704vu@gmail.com",
                    areaServed: "VN",
                    availableLanguage: ["Vietnamese"]
                }
            ]}
            url={globalConfig.websiteUrl}
        />
    );
};

export default OrganizationSchemaComp;