// next-sitemap.config.js
import fs from "fs";
// import guideMetadata from "./src/data/guides/guideMetadata.json" assert { type: "json" };
// import provincesData from "./src/data/provinces/vietnamese_provinces_list.json" assert { type: "json" };
const guideMetadata = JSON.parse(
    fs.readFileSync("./src/data/guides/guideMetadata.json", "utf8")
);
const provincesData = JSON.parse(
    fs.readFileSync("./src/data/provinces/vietnamese_provinces_list.json", "utf8")
);

const checkPath = (path) => {
    const chunk = path.split("/");
    // Homepage
    if (path === "/") return 1;
    if (path.includes("icon.ico")) return 0.3;
    if (chunk.length === 2) return 0.7;
    if (chunk.length === 3) return 0.5;
    if (chunk.length >= 4) return 0.3;
    return 0.3;
};

export default {
    siteUrl: "https://www.sanpickleball.xyz", // Replace with your actual site URL
    generateRobotsTxt: true, // Generate robots.txt file
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/search?", "/admin/", "/login/", "/404/", "/dang-nhap/", "/dang-ky/", "/email-verified/"]
            }
            // {
            //   userAgent: 'test-bot',
            //   allow: ['/path', '/path-2'],
            // },
            // {
            //   userAgent: 'black-listed-bot',
            //   disallow: ['/sub-path-1', '/path-2'],
            // },
        ]
    },
    // Exclude specific routes from the sitemap
    generateIndexSitemap: false,
    exclude: ["/secret-page"],
    // Add dynamic paths to the sitemap
    additionalPaths: async (config) => {
        try {
            const dynamicPaths = await getDynamicPaths();
            let pathList = [];
            for (let i = 0; i < dynamicPaths.length; i++) {
                const path = await config.transform(config, dynamicPaths[i]);
                pathList.push(path);
            }
            return pathList;
        } catch (error) {
            console.log("43434343", error);
        }
    },
    transform: async (config, path) => {
        const check = checkPath(path);
        return {
            loc: path,
            changefreq: "weekly",
            priority: check,
            lastmod: new Date().toISOString()
        };
    }
};

async function fetchAllCourts() {
    const baseUrl = 'https://www.sanpickleball.xyz/api/v1/courts';
    // const baseUrl = 'http://localhost:2704/api/v1/courts';
    let page = 1;
    const limit = 10;
    let totalPages = 1;
    let allCourts = [];

    while (page <= totalPages) {
        try {
            const response = await fetch(`${baseUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();

            if (data.results && Array.isArray(data.results)) {
                allCourts = allCourts.concat(data.results);
            }

            totalPages = data.totalPages;
            page++;
        } catch (error) {
            console.error('Error fetching courts:', error);
            break;
        }
    }

    return allCourts;
}

// Mock function to illustrate fetching dynamic paths from your data source
async function getDynamicPaths() {
    // Fetch paths dynamically from your database, CMS, or API
    // Example:
    // const allProduct = await fetch("https://fakestoreapi.com/products").then((res) => res.json());
    // const response = await fetch(`https://www.sanpickleball.xyz/api/v1/courts`);
    // const data = await response.json();
    // const courts = data?.results;
    const courts = await fetchAllCourts();
    const courtPaths = courts.map(court => `/tim-san/${court.slug}`);
    const guidesPath = guideMetadata.map(guide => `/huong-dan/${guide.slug}`);
    const provincesPath = provincesData.map(province => `/tinh-thanh/${province.slug}`);
    const districtsPath = [];
    provincesData.forEach(province => {
        if (!province.districts) return;
        districtsPath.push(...province.districts.map(district => `/tinh-thanh/${province.slug}/${district.slug}`));
    });

    const dynamicPaths = [
        // "/dynamic-page1",
        // "/dynamic-page2",
        // "/product/test-1",
        // "/product/test-2",
        // "/product/test-3",
        ...courtPaths,
        ...guidesPath,
        ...provincesPath,
        ...districtsPath
        // Add more dynamic paths as needed
    ];
    return dynamicPaths;
}
