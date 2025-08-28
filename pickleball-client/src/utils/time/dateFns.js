import { parseISO, getUnixTime, format } from "date-fns";
import vi from "date-fns/locale/vi";

const iso8601ToUnixTime = (time) => {
    const date = parseISO(time);
    const unixTimestamp = getUnixTime(date);
    return unixTimestamp * 1000;
};

const formatDateCustom = (time, formatString) => {
    if (!time) return "";
    const formattedDate = format(time, formatString, { locale: vi });
    return formattedDate;
};

const humanDateToIso8601 = (humanDate) => {
    try {
        if (!humanDate) return "";
        const date = new Date(humanDate);
        const isoString = date?.toISOString();
        return isoString;
    } catch (error) {
        console.log("humanDateToIso8601", humanDateToIso8601);
        return "";
    }
};

export {
    iso8601ToUnixTime,
    formatDateCustom,
    humanDateToIso8601
};