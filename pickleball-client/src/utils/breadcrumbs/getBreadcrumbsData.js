import fs from "fs";
import getMardownMetadata from "../others/getMardownMetadata.js";
// import defaultBreadcrumbs from "../../data/breadcrumbs/breadcrumbsDefault.json" assert { type: "json" };
// import provinceBreadcrumbs from "../../data/breadcrumbs/provinceBreadcrumbs.json" assert { type: "json" };
// import provinces from "../../data/provinces/vietnamese_provinces_list.json" assert { type: "json" };
const defaultBreadcrumbs = JSON.parse(
    fs.readFileSync("src/data/breadcrumbs/breadcrumbsDefault.json", "utf8")
);
const provinceBreadcrumbs = JSON.parse(
    fs.readFileSync("src/data/breadcrumbs/provinceBreadcrumbs.json", "utf8")
);
// const provinces = JSON.parse(
//     fs.readFileSync("../../data/provinces/vietnamese_provinces_list.json", "utf8")
// );

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


const getProductBreadcrumbs = async () => {
    try {
        // const response = await fetch("https://www.sanpickleball.xyz/api/v1/courts");
        const response = await fetch("http://localhost:2704/api/v1/courts");
        const data = await response.json();
        const courts = data?.results;
        // const courts = await fetchAllCourts();
        // console.log("courts4334", courts.length);
        const productBreadcrumbs = {};
        courts.forEach(court => {
            productBreadcrumbs[court.slug] = court.name;
        });
        return productBreadcrumbs;
    } catch (error) {
        console.log("getProductBreadcrumbs error", error);
    }
};

const getGuidesBreadcrumbs = async () => {
    try {
        const guideMetadata = await getMardownMetadata("src/data/guides");
        const guidesBreadcrumbs = {};
        guideMetadata.forEach(guide => {
            guidesBreadcrumbs[guide.slug] = guide.title;
        });
        return guidesBreadcrumbs;
    } catch (error) {
        console.log("getGuidesBreadcrumbs error", error);
    }
};

const getBreadcrumsData = async () => {
    try {
        const productsBreadcrumbs = await getProductBreadcrumbs();
        const guidesBreadcrumbs = getGuidesBreadcrumbs();
        const breadcrumbs = {
            ...defaultBreadcrumbs,
            ...guidesBreadcrumbs,
            ...productsBreadcrumbs,
            ...provinceBreadcrumbs
        };
        return breadcrumbs;
    } catch (error) {
        console.log("getBreadcrumsData error", error);
    }
};

export default getBreadcrumsData;