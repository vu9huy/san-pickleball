import moment from "moment";

const iso8601ToUnixTime = (isoDate) => {
    const unixTimestamp = moment(isoDate).unix();
    return unixTimestamp;
};

export {
    iso8601ToUnixTime
};