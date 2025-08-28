
const compareTimes = ({ startTime, endTime, timeToCompare }) => {
    const startTotalMinutes = startTime.hours * 60 + startTime.minutes;
    const endTotalMinutes = endTime.hours * 60 + endTime.minutes;
    return endTotalMinutes >= startTotalMinutes + timeToCompare * 60;
};
export default compareTimes;