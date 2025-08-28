import { getMetadataGeneral } from "@/seo/metadata/metadataGeneral";
import { Suspense } from "react";

export const metadata = getMetadataGeneral("huong-dan");

export default function HuongDanLayout({ children }) {
    return (
        <Suspense>
            {children}
        </Suspense>
    );
}