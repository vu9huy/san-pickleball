const checkSocial = (social) => {
    if (social?.facebook || social?.zalo || social?.phone) return true;
}
export default checkSocial;