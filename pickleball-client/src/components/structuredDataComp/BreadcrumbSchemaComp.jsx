import { globalConfig } from "@/config/globalConfig";
import { BreadcrumbJsonLd } from "next-seo";

export default function BreadcrumbSchemaComp({ listElements }) {

    return (
        <BreadcrumbJsonLd
            useAppDir={true}
            itemListElements={[
                {
                    position: 1,
                    name: "Home",
                    item: globalConfig.websiteUrl
                },
                ...listElements
            ]}
        />
    );
}