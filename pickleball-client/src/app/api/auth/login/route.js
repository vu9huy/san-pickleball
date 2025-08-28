import { loginFetchingFunc } from "@/api/serverApi/fetchFunc";
import { globalConfig } from "@/config/globalConfig";
import { iso8601ToUnixTime } from "@/utils/time/dateFns";
import { cookies } from "next/headers";

export const POST = async (req) => {

    const cookieConfigs = {
        // httpOnly: true,
        path: "/"
    };

    const loginData = await req.json();
    const loginResponse = await loginFetchingFunc(loginData, cookies);

    const data = loginResponse?.data;
    const tokens = data?.tokens;

    if (tokens) {
        const accessToken = tokens?.accessToken;
        cookies().set({
            name: globalConfig.accessTokenField,
            value: accessToken?.token,
            // set accessToken có thời gian expries max để không cần xử lý trường hợp accessToken không tồn tại trong cookies
            // (nếu để time expries như time expries của accessToken thì sẽ không biết được là không có accessToken hay là accessToken đã hết hạn)
            expires: 2147483647 * 1000, /* max time expries trong cookies */
            ...cookieConfigs
        });

        const refreshToken = tokens?.refreshToken;
        cookies().set({
            name: globalConfig.refreshTokenField,
            value: refreshToken?.token,
            expires: iso8601ToUnixTime(refreshToken?.expires),
            ...cookieConfigs
        });
    }

    const response = Response.json(
        loginResponse.data,
        { status: loginResponse.status }
    );

    return response;
};