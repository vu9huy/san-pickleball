"use client";

import ArticleSchemaComp from "@/components/structuredDataComp/ArticleSchemaComp";
import BreadcrumbSchemaComp from "@/components/structuredDataComp/BreadcrumbSchemaComp";
import { globalConfig } from "@/config/globalConfig";
import guideMetadata from "@/data/guides/guideMetadata.json";
import { humanDateToIso8601 } from "@/utils/time/dateFns";

export default function GuidesLayout({ children, params: { slug } }) {
    let guide = []
    if(guideMetadata?.length){
        guide = guideMetadata.find(guide => guide.slug === slug) || {};
    }

    const listElements = [
        {
            position: 2,
            name: "Tìm sân",
            item: `https://${globalConfig.domain}/huong-dan`
        },
        {
            position: 3,
            name: guide.title,
            item: `https://${globalConfig.domain}/huong-dan/${guide.slug}`
        }
    ];

    const guideData = {
        url: `https://${globalConfig.domain}/huong-dan/${guide.slug}`,
        title: guide.title,
        description: guide.description,
        images: [guide.image],
        datePublished: humanDateToIso8601(guide.time),
        dateModified: humanDateToIso8601(guide.dateModified) || humanDateToIso8601(guide.time)
    };

    return (
        <>
            <BreadcrumbSchemaComp listElements={listElements} />
            <ArticleSchemaComp blogData={guideData} />
            {children}
        </>
    );
}
