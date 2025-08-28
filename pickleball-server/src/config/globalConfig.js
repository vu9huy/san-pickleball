import "dotenv/config";

const envVars = process.env;

const globalConfig = {
    env: envVars.ENVIROMENT,
    port: envVars.PORT,
    domain: envVars.DOMAIN,
    frontendDomain: envVars.FRONTEND_DOMAIN,
    collectionName: envVars.DATABASE_NAME,
    ownerCode: envVars.OWNER_CODE,
    mongodb: {
        url: envVars.MONGODB_URI + envVars.DATABASE_NAME
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
    },
    cloudinary: {
        name: envVars.CLOUDINARY_CLOUD_NAME,
        apiKey: envVars.CLOUDINARY_API_KEY,
        apiSecret: envVars.CLOUDINARY_API_SECRET,
        courtFolderName: "/pickleball/court-images"
    },
    google: {
        oauthClientId: envVars.GOOGLE_OAUTH_CLIENT_ID,
        oauthClientSecret: envVars.GOOGLE_OAUTH_CLIENT_SECRET,
        oauthRefreshToken: envVars.GOOGLE_OAUTH_REFRESH_TOKEN
    },
    email:{
        emailAddress: envVars.EMAIL_ADDRESS,
        emailPassword: envVars.EMAIL_PASSWORD
    },
    token: {
        accessTokenField: "PICKLEBALL_ACCESS_TOKEN",
        refreshTokenField: "PICKLEBALL_REFRESH_TOKEN"
    },
    googleAnalytics: {
        googleAnalyticsPropertyId: envVars.GOOGLE_ANALYTICS_PROPERTY_ID
    }
};
export default globalConfig;