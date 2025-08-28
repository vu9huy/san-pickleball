// const getTopProvince = (courts) => {
//     // Count the occurrences of each province
//     const provinceCount = courts.reduce((count, item) => {
//         const province = item.location.province;
//         count[province] = (count[province] || 0) + 1;
//         return count;
//     }, {});

//     // Sort by occurrences and get the top 5 provinces
//     const top5Provinces = Object.entries(provinceCount)
//         .sort((a, b) => b[1] - a[1])  // Sort by the count, descending
//         .slice(0, 5)                   // Get the top 5
//         .map(([province]) => province); // Get only the province names

//     return top5Provinces;
// };

// use responsive image
// const provinces = [
//     { province: "Hà Nội", locations: 63, courts: 269, games: 710, image: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,w_400/v1728917107/hanoi_mqocgg.jpg" },
//     { province: "Tp. Hồ Chí Minh", locations: 59, courts: 220, games: 390, image: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,w_400/v1728917108/hochiminh_itsrjv.jpg" },
//     { province: "Đà Nẵng", locations: 55, courts: 206, games: 367, image: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,w_400/v1728917107/danang_n9anqk.jpg" },
//     { province: "Hải Phòng", locations: 55, courts: 157, games: 314, image: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,w_400/v1728917108/haiphong_z1rjcl.jpg" },
//     { province: "Quàng Ninh", locations: 53, courts: 142, games: 42, image: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,w_400/v1728917108/quangninh_a8yfoa.jpg" }
// ];

// FAKE GET TOP PROVINCES
const getTopProvince = (courts) => {
    const topProvincesDefault = {
        "Hà Nội": {
            name: "Hà Nội",
            slug: "ha-noi",
            image: "https://cdn.shopify.com/s/files/1/0697/0110/8031/files/Ha_Noi.jpg?width=320"
            // Responsive image
            // image: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,w_400/v1728917107/hanoi_mqocgg.jpg"
        },
        "Hồ Chí Minh": {
            name: "Tp. Hồ Chí Minh",
            slug: "ho-chi-minh",
            image: "https://cdn.shopify.com/s/files/1/0697/0110/8031/files/Ho_Chi_Minh.jpg?width=320"
            // Responsive image
            // image: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,w_400/v1728917108/hochiminh_itsrjv.jpg"
        },
        "Đà Nẵng": {
            name: "Đà Nẵng",
            slug: "da-nang",
            image: "https://cdn.shopify.com/s/files/1/0697/0110/8031/files/Da_Nang.jpg?width=320"
            // Responsive image
            // image: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,w_400/v1728917107/danang_n9anqk.jpg",
        },
        "Hải Phòng": {
            name: "Hải Phòng",
            slug: "hai-phong",
            image: "https://cdn.shopify.com/s/files/1/0697/0110/8031/files/Hai_Phong.jpg?width=320"
            // Responsive image
            //image: https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,w_400/v1728917108/haiphong_z1rjcl.jpg
        },
        "Quảng Ninh": {
            name: "Quảng Ninh",
            slug: "quang-ninh",
            image: "https://cdn.shopify.com/s/files/1/0697/0110/8031/files/Quang_Ninh.jpg?width=320"
            // Responsive image
            //image: "https://res.cloudinary.com/du2azaqnn/image/upload/c_fill,w_400/v1728917108/quangninh_a8yfoa.jpg"
        }
    };
    const listTopProvincesDefault = Object.keys(topProvincesDefault);

    // courts.forEach(court => {
    //     if (listTopProvincesDefault.includes(court.location.province)) {
    //         const locations = (topProvincesDefault[court.location.province]?.locations || 0) + 1;
    //         const courts = (topProvincesDefault[court.location.province]?.courts || 0) + court.numberOfCourts;
    //         topProvincesDefault[court.location.province]["locations"] = locations;
    //         topProvincesDefault[court.location.province]["courts"] = courts;
    //     }
    // });

    const courtsByProvince = courts.reduce((map, court) => {
        if (!map[court.location.province]) {
            map[court.location.province] = [];
        }
        map[court.location.province].push({
            slug: court.slug,
            numberOfCourts: court.numberOfCourts
        });
        return map;
    }, {});

    const topProvinces = listTopProvincesDefault.map(province => ({
        label: province,
        value: province,
        slug: topProvincesDefault[province]?.slug,
        image: topProvincesDefault[province]?.image,
        courtsData: courtsByProvince[province] || []
    }));

    return topProvinces;

};

export default getTopProvince;