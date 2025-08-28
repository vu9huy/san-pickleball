
const checkAdminRoles = (role) => {
    if (role === "admin") return true;
};

const checkOwnerRoles = (role) => {
    if (role === "admin") return true;
    return ["owner"].includes(role);
};

export {
    checkAdminRoles,
    checkOwnerRoles
};