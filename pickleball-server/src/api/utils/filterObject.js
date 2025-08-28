import pick from "./pick.js";

const courtFilter = (queryData) => {
    const pickQueryData = pick(queryData, ["name", "province", "district", "amenities", "surface", "feature", "owner"]);
    const { name, province, district, amenities, surface, feature, owner } = pickQueryData;

    const query = {
        isDeleted: { $ne: true },
        isPaid: { $ne: false }
    }; // Optional: Include this to exclude deleted courts

    const fields = [
        { key: "name", value: name, regex: true },
        { key: "location.province", value: province },
        { key: "location.district", value: district },

        { key: "owner.id", value: owner?.id },

        { key: "amenities", value: amenities, booleanValue: true },
        { key: "feature", value: feature, booleanValue: true },
        { key: "surface", value: surface }
    ];


    fields.forEach(field => {
        if (!field.booleanValue && !field.regex && field.value || field.value === false) {
            query[field.key] = field.value;
        }

        if (field.regex && field.value || field.value === false) {
            query[field.key] = new RegExp(field.value, "i");
        }

        if (field.booleanValue && field.value || field.value === false) {
            Object.keys(field.value).forEach(key => {
                query[`${field.key}.${key}`] = field.value[key] === "true";
            });
        }
    });
    return query;
};

const userFilter = (queryData) => {
    const { name } = queryData;
    const query = {
        isDeleted: { $ne: true }
    }; // Optional: Include this to exclude deleted user

    const fields = [
        { key: "name", value: name, regex: true }
        // { key: "location.province", value: province },
        // { key: "location.district", value: district }
    ];

    fields.forEach(field => {
        if (field.value || field.value === false && field.regex) {
            query[field.key] = new RegExp(field.value, "i");
        }
        if (field.value || field.value === false) {
            query[field.key] = field.value;
        }
    });
    return query;
};

const blogFilter = (queryData) => {
    const { name, tag } = queryData;
    const query = {
        isDeleted: { $ne: true }
    }; // Optional: Include this to exclude deleted blogs

    const fields = [
        { key: "name", value: name, regex: true },
        { key: "tag", value: tag }
    ];

    fields.forEach(field => {
        if (field.value || field.value === false && field.regex) {
            query[field.key] = new RegExp(field.value, "i");
        }
        if (field.value || field.value === false && field.name === "tag") {
            // query[field.key] = field.value;
        }
        if (field.value || field.value === false) {
            query[field.key] = field.value;
        }
    });
    return query;
};

const bookingFilter = (queryData) => {
    const { court, bookingInfo } = queryData;
    if (!court && !bookingInfo) {
        return {};
    }

    const query = {
        isDeleted: { $ne: true }
    };

    const fields = [];

    if (court && court?.id) {
        fields.push({ key: "court.id", value: court.id });
    }

    if (bookingInfo) {
        const bookingDateObj = new Date(bookingInfo?.date);


        // Set the start and end of the day
        const startOfDay = new Date(bookingDateObj.setUTCHours(0, 0, 0, 0));
        const endOfDay = new Date(bookingDateObj.setUTCHours(23, 59, 59, 999));
        const weekDay = startOfDay.getDay();

        if (bookingInfo?.date) {
            fields.push({
                key: "$or",
                value: [
                    {
                        "bookingInfo.date": { "$gte": startOfDay, "$lt": endOfDay }
                    },
                    { "bookingInfo.day": weekDay }
                ]
            });
        }

        // console.log("bookingInfodate766776", bookingInfo?.date);
        console.log("startOfDay344", startOfDay);
        console.log("endOfDay554", endOfDay);
        const test = fields;
        console.log("test545454", test);

        const startTime = bookingInfo?.startTime;
        const endTime = bookingInfo?.endTime;

        if (startTime && endTime) {
            const startTimeInMinutes = Number(startTime.hours) * 60 + Number(startTime.minutes);
            const endTimeInMinutes = Number(endTime.hours) * 60 + Number(endTime.minutes);

            query["$expr"] = {
                $and: [
                    {
                        $gte: [
                            {
                                $add: [
                                    { $multiply: ["$bookingInfo.startTime.hours", 60] },
                                    "$bookingInfo.startTime.minutes"
                                ]
                            },
                            startTimeInMinutes
                        ]
                    },
                    {
                        $lte: [
                            {
                                $add: [
                                    { $multiply: ["$bookingInfo.endTime.hours", 60] },
                                    "$bookingInfo.endTime.minutes"
                                ]
                            },
                            endTimeInMinutes
                        ]
                    }
                ]
            };
        }
    }


    fields.forEach(field => {
        if (field.value || field.value === false && field.regex) {
            query[field.key] = new RegExp(field.value, "i");
        }
        if (field.value || field.value === false) {
            query[field.key] = field.value;
        }
    });

    return query;
};

const provinceFilter = (queryData) => {
    const { name } = queryData;
    const query = {
        isDeleted: { $ne: true }
    }; // Optional: Include this to exclude deleted blogs

    const fields = [
        { key: "name", value: name, regex: true },
    ];

    fields.forEach(field => {
        if (field.value || field.value === false && field.regex) {
            query[field.key] = new RegExp(field.value, "i");
        }
        if (field.value || field.value === false && field.name === "tag") {
            // query[field.key] = field.value;
        }
        if (field.value || field.value === false) {
            query[field.key] = field.value;
        }
    });
    return query;
};

export default {
    courtFilter,
    userFilter,
    blogFilter,
    bookingFilter,
    provinceFilter
};