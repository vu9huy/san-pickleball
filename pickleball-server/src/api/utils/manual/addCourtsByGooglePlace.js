import { googlePlaceServices, courtServices } from "../../services/index.js";
import stringToSlugWithRandomString from "../../utils/toSlugWithString.js";


const formatPhoneNumber = (phoneNumber) => {
    const phone = phoneNumber?.replaceAll(" ", "") || "";
    return phone;
}

const getProvine = (address) => {
    const province = address.find(add => {
        return add.types.includes("administrative_area_level_1");
    });
    console.log("province332", province);
    return province.short_name;
}

const getDistrict = (address) => {
    const district = address.find(add => {
        return add.types.includes("administrative_area_level_2");
    });
    console.log("district4554", district);
    return district?.short_name || "";
}

const addCourtsByGooglePlace = async () => {
    const googlePlaces = await googlePlaceServices.getAllGooglePlaces();
    for (const place of googlePlaces) {
        const courtData = {
            name: place.name,
            placeId: place.place_id,
            description: "",
            slug: stringToSlugWithRandomString(place.name),
            owner: {},
            moder: [],
            social: {
                facebook: place?.website?.includes("facebook") ? place.website : "",
                zalo: "",
                phone: place.formatted_phone_number ? formatPhoneNumber(place.formatted_phone_number) : ""
            },
            location: {
                address: place.formatted_address,
                province: getProvine(place.address_components),
                district: getDistrict(place.address_components)
            },
            geolocation: {
                latitude: place.geometry?.location?.lat,
                longitude: place.geometry?.location?.lng,
            },
            numberOfCourts: 0,
            images: [],
            feature: {
                indoor: false,
                outdoor: false,
                lighted: false,
                covered: false
            },
            utilities: [],
            amenities: {
                bar_canteen: false,
                locker_room: false,
                restroom: false,
                trainer: false,
                parking_spaces: false,
                equipment_rental: false,
                equipment_free: false,
                wifi: false,
                spectator_areas: false,
                break_areas: false,
                air_conditioning: false
            },
            surface: "asphalt",
            availability: [],
            bookingInfo: {
                images: [],
                priceRange: {},
                detail: [],
                othersService: []
            },
            isPaid: true,
            views: 0,
            isDeleted: false
        };
        const court = await courtServices.createCourt(courtData);
        console.log("court4343", court.name);
    }
}

export default addCourtsByGooglePlace;