import vietnameseProvincesData from "@/data/provinces/vietnamese_provinces_list.json";

const generateProvinceMetadataObj = (provinceSlug) => {
    const province = vietnameseProvincesData.find(prov => prov.slug === provinceSlug);
    const metadataObj = {
        title: `Danh sách sân pickleball tại ${province.value}`,
        description: `Tổng hợp danh sách các sân pickleball đang hoạt động tại ${province.value}`,
        images: [province.image],
        path: `/tinh-thanh/${province.slug}`
    };
    return metadataObj;
};

export default generateProvinceMetadataObj;