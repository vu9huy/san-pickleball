import fs from "fs";
import path from "path";
import getMardownMetadata from "../others/getMardownMetadata.js";

async function generateGuideMetadata() {
    const metadata = await getMardownMetadata("src/data/guides");
    const jsonFilePath = path.join(process.cwd(), "src/data/guides/guideMetadata.json");
    fs.writeFileSync(jsonFilePath, JSON.stringify(metadata, null, 2));
}
generateGuideMetadata();