import Markdown from "markdown-to-jsx";
import React from "react";
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import getMardownMetadata from "@/utils/others/getMardownMetadata";
import styles from "./page.module.css";
import { getMetadataSpecific } from "@/seo/metadata/metadataGeneral";
import blogMetadata from "@/data/blogs/blogMetadata.json";

function getPostContent(slug) {
    try {
        const folder = "src/data/blogs/";
        const file = folder + `${slug}.md`;
        const content = fs.readFileSync(file, "utf8") || "";

        const matterResult = matter(content);
        return matterResult;
    } catch (error) {
        return null;
    }
}

export async function generateMetadata({ params: { slug } }) {
    if (!blogMetadata?.length) return;
    const blog = blogMetadata?.find(blog => blog.slug === slug) || {};
    if (!blog) return;
    const images = [blog?.image];
    const metadataObj = {
        title: blog.title,
        description: blog.description,
        images: images,
        path: `/blogs/${blog.slug}`
    };
    return getMetadataSpecific(metadataObj);
}

export async function generateStaticParams() {
    const posts = await getMardownMetadata("src/data/blogs");
    if(!posts) return [];
    return posts?.map((post) => ({ slug: post.slug }));
}

export default function Blogs({ params }) {
    const slug = params.slug;
    const post = getPostContent(slug);
    if (!post) {
        return notFound();
    };
    return (
        <main className={`${styles["markdown-container"]} page-width`}>
            <article>
                <Markdown>{post.content}</Markdown>
            </article>
        </main>
    );
}