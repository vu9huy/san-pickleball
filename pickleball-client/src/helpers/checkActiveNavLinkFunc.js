const checkActiveNavLinkFunc = ({ linkPath, pathname }) => {
    if (!linkPath || !pathname) return false;
    if (linkPath === pathname) return true;
    if (linkPath !== "/" && pathname.includes(linkPath)) return true;
    return false;
};
export default checkActiveNavLinkFunc;