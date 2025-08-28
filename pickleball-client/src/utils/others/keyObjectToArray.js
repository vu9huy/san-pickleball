const keyObjectToArray = (object) => {
    if (object) {
        return Object.keys(object);
    } else {
        return [];
    }
};

export default keyObjectToArray;