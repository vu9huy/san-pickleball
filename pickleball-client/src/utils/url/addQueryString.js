const addQueryString = ({ pathname, searchParams, addQueries, removeQueries, isRemoveAll }) => {
    let params = new URLSearchParams(searchParams.toString());
    // Remove all param
    if (isRemoveAll) {
        params = new URLSearchParams();
    }
    // Remove list params
    if (removeQueries && removeQueries.length) {
        removeQueries.forEach(query => {
            params.delete(query);
        });
    }
    // Add queries
    addQueries.forEach(query => {
        params.set(query.name, query.value);
    });
    const searchParamsString = params.toString();
    const path = `${pathname}?${searchParamsString}`;
    return path;
};

export default addQueryString;