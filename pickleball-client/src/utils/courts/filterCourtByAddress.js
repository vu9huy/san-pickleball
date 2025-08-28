const filterCourtsByAddress = ({ courts, province, district }) => {
    const queryCourts = courts?.filter(court => {
        if (!province?.value && !district?.value) return true;
        if (province?.value && !district?.value) return court?.location?.province === province?.value;
        if (province?.value && district?.value) return court?.location?.province === province?.value && court?.location?.district === district?.value;
    });
    return queryCourts;
};

export default filterCourtsByAddress;
