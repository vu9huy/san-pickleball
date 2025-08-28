const getDistrictFromSlug = (province, slug) => {
    const districts = province?.districts;
    if (!districts || !districts.length) return null;
    const district = districts.find(district => district.slug === slug);
    return district;
};

export default getDistrictFromSlug;