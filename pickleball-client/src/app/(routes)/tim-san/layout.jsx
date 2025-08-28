import { getMetadataGeneral } from "@/seo/metadata/metadataGeneral";
import { Suspense } from "react";

export const metadata = getMetadataGeneral("tim-san");

export default function TimSanLayout({ children }) {
    return (
        <>
            <Suspense>
                {children}
            </Suspense>
        </>
    );
}