import { allPermission, allRoles } from "../../config/roles.js";

const checkPermission = (role, permission) => {
    const userRole = allRoles[role];
    const rolePermission = allPermission[userRole];
    const checkResult = rolePermission.includes(permission);
    return checkResult;
};

export default checkPermission;