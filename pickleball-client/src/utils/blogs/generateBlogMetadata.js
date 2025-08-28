import fs from "fs";
import path from "path";
import getMardownMetadata from "../others/getMardownMetadata.js";

function generateBlogMetadata() {
    try {
        const metadata = getMardownMetadata("src/data/blogs");
        const jsonFilePath = path.join(process.cwd(), "src/data/blogs/blogMetadata.json");
        fs.writeFileSync(jsonFilePath, JSON.stringify(metadata, null, 2));
    } catch (error) {
        console.log("generateBlogMetadata error", error);
    }
}
generateBlogMetadata();