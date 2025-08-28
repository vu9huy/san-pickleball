"use client";

import { ClusteredCourtsMarkers } from "../cluster/ClusteredCourtsMarkers";
import { Map } from "@vis.gl/react-google-maps";
import { getCategories } from "../../../data/courts/courts";
import { useState, useEffect, useMemo } from "react";
import { GOOGLE_MAP_MAP_ID, VIETNAME_BOUND, VIETNAME_CENTER_COORDINATES, COUNTRY_ZOOM } from "@/constants/VisglMapConstant";
import useGetCourtLocations from "@/customHook/useGetCourtLocations";
import useViewMap from "@/customHook/useViewMap";


const VisglMap = ({ viewState }) => {

    const [selectedCategory, setSelectedCategory] = useState(null);

    const { map } = useViewMap({ viewState });

    const {
        allCourts: courts
    } = useGetCourtLocations();

    // get category information for the filter-dropdown
    const categories = useMemo(() => getCategories(courts), [courts]);

    // const filteredCourts = useMemo(() => {
    //     if (!courts) return null;
    //     return courts.filter(court => !selectedCategory || court.category === selectedCategory);
    // }, [courts, selectedCategory]);


    const filteredCourts = (() => {
        if (!courts) return null;
        return courts.filter(court => !selectedCategory || court.category === selectedCategory);
    })();


    return (
        <>
            <Map
                mapId={GOOGLE_MAP_MAP_ID}
                style={{ width: "100%", height: "100%" }}
                defaultCenter={VIETNAME_CENTER_COORDINATES}
                defaultZoom={COUNTRY_ZOOM}
                gestureHandling={"greedy"}
                // gestureHandling={"cooperative"}
                disableDefaultUI={true}
                reuseMaps={true}
                minZoom={5.5}
                // maxZoom={18}
                // restriction={{
                //     latLngBounds: VIETNAME_BOUND,
                //     strictBounds: true
                // }}
            >
                {filteredCourts ?
                    <ClusteredCourtsMarkers map={map} /* courts={filteredCourts} */ courts={courts} categories={categories} setSelectedCategory={setSelectedCategory} /> :
                    ""}
            </Map>
        </>
    );
};


export default VisglMap;
