
const createQueryString = (queryObj) => {
    const sanitizedQueryObj = Object.fromEntries(
        Object.entries(queryObj).filter(([_, value]) => !!value || value === 0) // Remove undefined and null values
    );
    const urlSearchParamsObj = new URLSearchParams(sanitizedQueryObj);
    const queryString = urlSearchParamsObj.toString();
    return queryString;
};
export default createQueryString;