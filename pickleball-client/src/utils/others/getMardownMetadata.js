import fs from "fs";
import matter from "gray-matter";
import readingTime from "./readingTime.js";

export default async function getMardownMetadata (basePath) {
    try {
        const folder = basePath + "/";
        const files = fs.readdirSync(folder);
        // console.log("files434334", files);
        if(!files) return [];
        const markdownPosts = files?.filter(file => file.endsWith(".md"));
        // get the file data
        const posts = markdownPosts?.map((filename) => {
            const fileContents = fs.readFileSync(`${basePath}/${filename}`, "utf8");
            const matterResult = matter(fileContents);
            return {
                title: matterResult.data.title,
                tag: matterResult.data.tag,
                time: matterResult.data.time,
                image: matterResult.data.image,
                description: matterResult.data.description,
                readingTime: readingTime(fileContents),
                slug: filename.replace(".md", "")
            };
        });
        
        return posts?.reverse();
    } catch (error) {
        console.log("getMardownMetadata error", error);
        return [];
    }
}
