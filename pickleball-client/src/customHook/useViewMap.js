import { useMap } from "@vis.gl/react-google-maps";
import useSelectAddress from "./useSelectAddress";
import { VIETNAME_CENTER_COORDINATES, COUNTRY_ZOOM, PROVINCE_ZOOM, DISTRICT_ZOOM } from "@/constants/VisglMapConstant";
import { useEffect } from "react";

const convertCurrentView = ({ viewState, VIETNAME_CENTER_COORDINATES, province, district }) => {
    if (district?.value) {
        return {
            lat: district?.geolocation?.latitude,
            lng: district.geolocation.longitude
        };
    };
    if (province?.value) {
        return {
            lat: province?.geolocation?.latitude,
            lng: province?.geolocation?.longitude
        };
    };
    if (viewState?.lat && viewState?.lng) {
        return viewState;
    };
    return VIETNAME_CENTER_COORDINATES;
};

const convertCurrentZoom = ({ viewState, province, district, COUNTRY_ZOOM, PROVINCE_ZOOM, DISTRICT_ZOOM }) => {
    if (district.value) {
        return DISTRICT_ZOOM;
    }
    if (province.value) {
        return PROVINCE_ZOOM;
    }
    if (viewState?.zoom && viewState?.zoom != 0) {
        return viewState?.zoom;
    }
    return COUNTRY_ZOOM;
};

const useViewMap = ({ viewState }) => {
    const {
        province,
        district
    } = useSelectAddress();

    const map = useMap();

    const currentView = convertCurrentView({ viewState, VIETNAME_CENTER_COORDINATES, province, district });
    const currentZoom = convertCurrentZoom({ viewState, province, district, COUNTRY_ZOOM, PROVINCE_ZOOM, DISTRICT_ZOOM });

    useEffect(() => {
        // console.log("dffdfdfd", province);

        if (!map) return;
        map.setCenter(currentView);
        map.setZoom(currentZoom);
    }, [map, currentView.lat, currentView.lng, currentZoom, province.value, district.value]);

    return { map };
};

export default useViewMap;