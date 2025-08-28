
const useCourtNumberOptions = ({ numberOfCourts, hasDefaultCourtNumber }) => {
    const courtNumberList = Array.from(Array(numberOfCourts).keys());
    const courtNumberOptions = courtNumberList?.map((_, index) => {
        return {
            label: `Sân ${index + 1}`,
            value: index + 1
        };
    });
    const defaultCourtNumber = { label: "Tất cả sân", value: 0 };
    if (hasDefaultCourtNumber) {
        courtNumberOptions.unshift(defaultCourtNumber);
    }
    return { courtNumberOptions };
};
export default useCourtNumberOptions;
