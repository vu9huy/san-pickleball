// import Card3D from "@/components/card3D/Card3D";
// import styles from "./page.module.css";
// // import BannerCarousel from "@/components/emblaCarousel/bannerCarousel/BannerCarousel";
// // import CourtEmblaCarousel from "@/components/emblaCarousel/courtCarousel/CourtEmblaCarousel";


// export default function HuongDan() {

//     return <div className={`${styles["huong-dan-container"]} page-width`}>
//         Hướng dẫn
//         {/* <Card3D /> */}
//         {/* <BannerCarousel /> */}
//         {/* <CourtEmblaCarousel /> */}
//     </div>;
// }


"use client";

import styles from "./page.module.css";
import guideMetadata from "@/data/guides/guideMetadata.json";
// import BlogSearchBar from "@/components/blogs/blogSearchBar/BlogSearchBar";
import { useState } from "react";
import GuideList from "@/components/guides/guideList/GuideList";
import { useSearchParams } from "next/navigation";
import toSlug from "@/utils/others/toSlug";

const tagsStringToTagsList = (tagsString) => {
    if (!tagsString) return [];
    const tagsList = tagsString.split(", ");
    const tagsListConvert = tagsList.map(tag => toSlug(tag));
    return tagsListConvert;
};

export default function Guides() {
    const searchParams = useSearchParams();
    const tag = searchParams.get("tag");

    const [searchValue, setSearchValue] = useState("");
    const filterData = guideMetadata.filter(val => {
        const tagsList = tagsStringToTagsList(val?.tag);
        const filterTag = !tag ? true : tagsList.includes(tag);
        const handledVal = val?.title?.toLowerCase();
        const filterSearch = handledVal?.includes(searchValue?.toLowerCase());
        return filterSearch && filterTag;
    });

    return (
        <div className={`${styles["guide-container"]} page-width`}>
            <div className="header-label">
                <h1 className="">Hướng dẫn</h1>
                {/* <BlogSearchBar searchValue={searchValue} setSearchValue={setSearchValue} /> */}
            </div>
            <GuideList guideList={filterData} />
        </div>
    );
}