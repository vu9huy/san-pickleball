import Banner from "@/components/banner/Banner";
import styles from "./homepage.module.css";
import { getMetadataGeneral } from "@/seo/metadata/metadataGeneral";
import BlogList from "@/components/blogs/blogList/BlogList";
import blogMetadata from "@/data/blogs/blogMetadata.json";
import guideMetadata from "@/data/guides/guideMetadata.json";
import Link from "next/link";
import GuideList from "@/components/guides/guideList/GuideList";
import TopProvinceCardList from "@/components/topProvinces/topProvinceCardList/TopProvinceCardList";
import Faq from "@/components/faq/Faq";
import homeFaqs from "@/data/faqs/homeFaqs.json";
import FeaturedCourts from "@/components/featuredCourts/FeaturedCourts";

export const metadata = getMetadataGeneral("/");

export default function Home() {
    // const blogList = blogMetadata.slice(0, 4);
    let guideList = [];
    if(guideMetadata?.length){
        // console.log("guideMetadata4433443", guideMetadata);
        guideList = guideMetadata?.slice(0, 4);
    }

    return (
        <div className={styles["home-container"]}>
            <Banner />
            <div className="section page-width">
                <div className="header-label">
                    <h2 className="section-label">
                        Hướng dẫn
                    </h2>
                    <Link href="/huong-dan" className="section-link">
                        Xem tất cả
                    </Link>
                </div>
                <GuideList guideList={guideList} />
            </div>

            <div className="section">
                <FeaturedCourts/>
            </div>
            {/* <div className="section page-width">
                <div className="header-label">
                    <h2 className="section-label">
                        Blogs
                    </h2>
                    <Link href="/blogs" className="section-link">
                        Xem tất cả
                    </Link>
                </div>
                <BlogList blogList={blogList} />
            </div> */}
            <div className="section page-width">
                <div className="header-label">
                    <h2 className="section-label">
                        Top tỉnh/thành
                    </h2>
                </div>
                <TopProvinceCardList />
            </div>
            <div className="section page-width">
                <Faq faqs={homeFaqs} />
            </div>
        </div>
    );

}
