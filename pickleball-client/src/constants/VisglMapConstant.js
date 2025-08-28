import { globalConfig } from "@/config/globalConfig";

export const GOOGLE_MAP_MAP_ID = globalConfig.googleMapId;
export const GOOGLE_MAP_API_KEY = globalConfig.googleMapApiKey;
export const VIETNAME_REGION_CODE = "VN";
export const VIETNAMESE_LANGUAGE_CODE = "vi";
export const VIETNAME_BOUND = {
    north: 28,
    south: 4.5,
    east: 127,
    west: 84
};
export const VIETNAME_CENTER_COORDINATES = { lat: 17.040599244762088, lng: 106.79101417303454 };
export const COUNTRY_ZOOM = 5.5;
export const PROVINCE_ZOOM = 10.2;
export const DISTRICT_ZOOM = 12.5;
export const COURT_ZOOM = 17;
// 0.002 để zoom vào infowindow thay vì marker, nếu không cộng thì sẽ zoom vào marker và infowindow sẽ bị che mất
export const LAT_ZOOM_INFOWINDOW = 0.002;