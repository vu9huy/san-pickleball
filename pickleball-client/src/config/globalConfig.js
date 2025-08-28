// import { baseApiUrl } from "mapbox-gl";

export const globalConfig = {
    //Chia thành từng object theo loại config
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    websiteUrl: `https://${process.env.NEXT_PUBLIC_DOMAIN}`,
    port: process.env.NEXT_PUBLIC_PORT,
    baseApiUrl: process.env.NEXT_PUBLIC_NODE_ENV === "production" ? process.env.NEXT_PUBLIC_PRODUCT_BASE_API_ENDPOINT : process.env.NEXT_PUBLIC_DEV_BASE_API_ENDPOINT,

    userDataField: "PICKLEBALL_USER_ID",
    accessTokenField: "PICKLEBALL_ACCESS_TOKEN",
    refreshTokenField: "PICKLEBALL_REFRESH_TOKEN",
    refreshTokenExpriesDay: process.env.NEXT_PUBLIC_JWT_REFRESH_EXPIRATION_DAYS,

    googleMapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
    googleMapApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,

    googleAppClientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID,
    facebookAppClientId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,

    facebookChatUrl: process.env.NEXT_PUBLIC_FACEBOOK_CHAT_URL,

    primaryColor: "#8ac93d"
};
