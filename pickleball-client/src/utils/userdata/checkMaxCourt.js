
const checkIsMaxCourt = (user) => {
    const courtsNumber = user.courts.length || 0;
    return courtsNumber >= user.maxCourt;
};
export default checkIsMaxCourt;