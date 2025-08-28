import Markdown from "markdown-to-jsx";
import React from "react";
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import getMardownMetadata from "@/utils/others/getMardownMetadata";
import guideMetadata from "@/data/guides/guideMetadata.json";
import styles from "./page.module.css";
import "./guideCustomStyle.css";
import { getMetadataSpecific } from "@/seo/metadata/metadataGeneral";

function getPostContent(slug) {
    try {
        const folder = "src/data/guides/";
        const file = folder + `${slug}.md`;
        const content = fs.readFileSync(file, "utf8") || "";
        const matterResult = matter(content);
        return matterResult;
    } catch (error) {
        return null;
    }
}

export async function generateMetadata({ params: { slug } }) {
    if (!guideMetadata?.length) return;
    console.log("guideMetadata4334", guideMetadata);
    const guide = guideMetadata?.find(guide => guide.slug === slug) || {};
    if (!guide) return;
    const images = [guide?.image];
    const metadataObj = {
        title: guide.title,
        description: guide.description,
        images: images,
        path: `/huong-dan/${guide.slug}`
    };
    return getMetadataSpecific(metadataObj);
}

export async function generateStaticParams() {
    const posts = await getMardownMetadata("src/data/guides");
    if(!posts) return [];
    return posts?.map((post) => ({ slug: post.slug }));
}

export default function Guides({ params: { slug } }) {

    const post = getPostContent(slug);
    if (!post) {
        return notFound();
    };

    return (
        <main>
            <article className={`${styles["markdown-container"]} page-width`}>
                <Markdown>{post.content}</Markdown>
            </article>
        </main>
    );
}