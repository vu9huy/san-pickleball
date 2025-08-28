import getAddressFromSearchParam from "./getAddressFromSearchParam";

const createQueryObject = (searchParams) => {
    const queryObj = {};
    searchParams?.forEach((value, key) => {
        queryObj[key] = value;
    });

    // const queryObj = searchParams;

    const { province, district } = getAddressFromSearchParam(searchParams);

    queryObj["province"] = province.value;
    queryObj["district"] = district.value;
    return queryObj;
};

export default createQueryObject;