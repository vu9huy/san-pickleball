import { globalConfig } from "@/config/globalConfig";
import { SiteLinksSearchBoxJsonLd } from "next-seo";

const SiteLinksSearchBoxSchemaComp = ({ }) => {
    const sitenameSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Sân Pickleball",
        "alternateName": "Tìm sân Pickleball",
        "url": "https://sanpickleball.xyz",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `https://${globalConfig.domain}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };

    return (
        // <SiteLinksSearchBoxJsonLd
        //     useAppDir={true}
        //     url={globalConfig.websiteUrl}
        //     potentialActions={[
        //         {
        //             target: `https://${globalConfig.domain}/search?q`,
        //             queryInput: "search_term_string"
        //         }
        //     ]}
        // />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(sitenameSchema) }}
        />
    );
};

export default SiteLinksSearchBoxSchemaComp;