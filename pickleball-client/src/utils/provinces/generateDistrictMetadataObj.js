import vietnameseProvincesData from "@/data/provinces/vietnamese_provinces_list.json";

const generateDistrictMetadataObj = (provinceSlug, districtSlug) => {
    const province = vietnameseProvincesData.find(prov => prov.slug === provinceSlug);
    const districts = province.districts;
    const district = districts.find(distr => distr.slug === districtSlug);
    const metadataObj = {
        title: `Danh sách sân pickleball tại ${district.value}, ${province.value}`,
        description: `Tổng hợp danh sách các sân pickleball đang hoạt động tại ${district.value}, ${province.value}`,
        images: [province.image],
        path: `/tinh-thanh/${province.slug}/${district.value}`
    };
    return metadataObj;
};
export default generateDistrictMetadataObj;