import vietnameseProvincesData from "@/data/provinces/vietnamese_provinces_list.json";

const getProvinceFromSlug = (slug) => {
    const province = vietnameseProvincesData.find(province => province.slug === slug);
    return province;
};

export default getProvinceFromSlug;