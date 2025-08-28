import vietnameseProvincesList from "@/data/vietnamese_provinces_list.json";

export const searchProvinces = (searchTerm) => {
    if (searchTerm === "") {
        return vietnameseProvincesList;
    }
    if (!vietnameseProvincesList || !searchTerm) {
        return [];
    }
    const result = vietnameseProvincesList.filter(item => item?.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    return result;
};

