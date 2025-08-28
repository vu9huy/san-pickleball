const allRoles = {
    user: "USER",
    admin: "ADMIN",
    owner: "OWNER",
    trainer: "TRAINER"
};

const allPermission = {
    USER: ["manageUsers", "managePartnerLookings", "manageMarkets", "manageBookings"],
    ADMIN: ["manageUsers", "manageCourts", "manageCourses", "manageBookings", "manageBlogs", "manageTopics", "manageTags", "manageMarkets", "managePartnerLookings"],
    OWNER: ["manageUsers", "managePartnerLookings", "manageCourts", "manageBookings"],
    TRAINER: ["manageUsers", "manageCourses"]
};

const roles = Object.keys(allRoles);
// const roleRights = new Map(Object.entries(allRoles));

export {
    roles,
    // roleRights,
    allRoles,
    allPermission
};
