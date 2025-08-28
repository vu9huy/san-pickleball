import filterCourtsByAddress from "@/utils/courts/filterCourtByAddress";

const filterCourts = ({ courts, province, district }) => {
    const queryCourts = filterCourtsByAddress({ courts, province, district });
    return queryCourts;
};
export default filterCourts;