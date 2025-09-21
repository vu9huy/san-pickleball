import { getMetadataGeneral } from "@/seo/metadata/metadataGeneral";

export const metadata = getMetadataGeneral("huong-dan");

export default function TimNguoiChoiLayout({ children }) {
    return (
        <>
            {children}
        </>
    );
}