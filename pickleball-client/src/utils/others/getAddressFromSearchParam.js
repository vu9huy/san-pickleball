import vietnameseProvincesData from "@/data/provinces/vietnamese_provinces_list.json";

const getAddressFromSearchParam = (searchParams) => {
    const provinceParamSlug = searchParams.get("province") || "";
    // const provinceParamSlug = searchParams["province"] || "";
    const provinceObj = vietnameseProvincesData.find(province => province.slug === provinceParamSlug) || "";
    const districtParamSlug = searchParams.get("district") || "";
    // const districtParamSlug = searchParams["district"] || "";
    const districtObj = provinceObj?.districts?.find(district => district.slug === districtParamSlug) || "";
    return {
        province: provinceObj,
        district: districtObj
    };
};

export default getAddressFromSearchParam;