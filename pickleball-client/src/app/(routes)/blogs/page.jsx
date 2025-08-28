"use client";

import styles from "./page.module.css";
import blogMetadata from "@/data/blogs/blogMetadata.json";
import BlogSearchBar from "@/components/blogs/blogSearchBar/BlogSearchBar";
import BlogList from "@/components/blogs/blogList/BlogList";
import { useState } from "react";

export default function Blogs() {

    const [searchValue, setSearchValue] = useState("");
    let filterData = [];

    if(blogMetadata?.length){
        filterData = blogMetadata?.filter(val => {
            const handledVal = val?.title?.toLowerCase();
            return handledVal?.includes(searchValue?.toLowerCase());
        });
    };

    return <div className={`${styles["blog-container"]} page-width`}>
        <div className="header-label">
            <h1 className="">Blogs</h1>
            <BlogSearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
        <BlogList blogList={filterData} />
    </div>;
}
