import ArticleSchemaComp from "@/components/structuredDataComp/ArticleSchemaComp";
import BreadcrumbSchemaComp from "@/components/structuredDataComp/BreadcrumbSchemaComp";
import { globalConfig } from "@/config/globalConfig";
import blogMetadata from "@/data/blogs/blogMetadata.json";
import { humanDateToIso8601 } from "@/utils/time/dateFns";

export default async function BlogsLayout({ children, params: { slug } }) {
    const blog = blogMetadata.find(blog => blog.slug === slug) || {};

    const listElements = [
        {
            position: 2,
            name: "Tìm sân",
            item: `https://${globalConfig.domain}/blogs`
        },
        {
            position: 3,
            name: blog.title,
            item: `https://${globalConfig.domain}/blogs/${blog.slug}`
        }
    ];

    const blogData = {
        url: `https://${globalConfig.domain}/blogs/${blog.slug}`,
        title: blog.title,
        description: blog.description,
        images: [blog.image],
        datePublished: humanDateToIso8601(blog.time),
        dateModified: humanDateToIso8601(blog.dateModified) || humanDateToIso8601(blog.time)
    };

    return (
        <>
            <BreadcrumbSchemaComp listElements={listElements} />
            <ArticleSchemaComp blogData={blogData} />
            {children}
        </>
    );
}
