import isNumber from "./checkNumber";

const convertSizeOfFileToKb = (size) => {
    if (!isNumber(size)) {
        console.error("Size must be a number");
    };
    const newSize = size / 1000;
    // Round 2 decimal
    return Math.round(newSize * 100) / 100;
};

export default convertSizeOfFileToKb;