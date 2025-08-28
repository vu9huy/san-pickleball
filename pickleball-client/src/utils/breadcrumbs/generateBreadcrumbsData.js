import fs from "fs";
import path from "path";
import getBreadcrumsData from "./getBreadcrumbsData.js";

const generateBreadcrumbData = async () => {
    try {
        const metadata = await getBreadcrumsData();
        const jsonFilePath = path.join(process.cwd(), "src/data/breadcrumbs/breadcrumbsData.json");
        fs.writeFileSync(jsonFilePath, JSON.stringify(metadata, null, 2));
    } catch (error) {
        console.log("generateBreadcrumbData error", error);
    }
};
generateBreadcrumbData();