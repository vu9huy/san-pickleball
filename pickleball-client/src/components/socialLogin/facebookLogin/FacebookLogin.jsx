"use client";

import { globalConfig } from "@/config/globalConfig";
import React from "react";
import FacebookLogin from "react-facebook-login";

const FacebookLoginComp = () => {
    const handleFacebookCallback = (response) => {
        if (response?.status === "unknown") {
            console.error("Sorry!", "Something went wrong with facebook Login.");
            return;
        }
        console.log("response", response);
    };
    return (
        <FacebookLogin
            buttonStyle={{ padding: "6px" }}
            appId={globalConfig.facebookAppClientId} // we need to get this from facebook developer console by setting the app.
            autoLoad={false}
            scope={"public_profile"}
            fields={"name,picture"}
            callback={handleFacebookCallback}
        />
    );
};
export default FacebookLoginComp;