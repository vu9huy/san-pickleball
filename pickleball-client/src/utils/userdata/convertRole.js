
const roles = {
    "admin": "Quản trị viên",
    "owner": "Chủ sân",
    "user": "Người dùng"
};

const convertRole = (role) => {
    return roles[role] || "";
};
export default convertRole;