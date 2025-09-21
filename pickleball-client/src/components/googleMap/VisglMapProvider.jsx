"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import { GOOGLE_MAP_API_KEY, VIETNAME_REGION_CODE, VIETNAMESE_LANGUAGE_CODE } from "@/constants/VisglMapConstant";
import VisglMap from "./visglMap/VisglMap";
import "./VisglMapProvider.css";
import React, { Suspense } from "react";


const VisglMapContainer = ({ viewState }) => {

    return (
        <div className="visgl-map-provider">
            <APIProvider
                apiKey={GOOGLE_MAP_API_KEY}
                // apiKey={""}
                region={VIETNAME_REGION_CODE}
                language={VIETNAMESE_LANGUAGE_CODE}
            >
                <Suspense>
                    <VisglMap viewState={viewState} />
                </Suspense>
            </APIProvider>
        </div>
    );
};

export default React.memo(VisglMapContainer);
// export default VisglMapContainer;
