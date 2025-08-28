import timeMinutesToSlots from "./timeMinutesToSlots";

const timeToBlocks = ({ startTime, endTime }) => {
    if (!startTime && !endTime) return [];
    const startTimeParse = startTime.hours + (startTime.minutes ? 0.5 : 0);
    const endTimeParse = endTime.hours + (endTime.minutes ? 0.5 : 0);

    const timeDifference = endTimeParse - startTimeParse >= 0 ? endTimeParse - startTimeParse : 0;
    const blockNumber = timeDifference / 0.5 || 0;
    const nullList = Array(blockNumber).fill(null);
    const timeList = nullList.map((value, index) => {
        return {
            // hours: startTime.hours + timeMinutesToSlots(startTime.minutes) + index * 0.5,
            hours: Math.floor(startTime.hours + timeMinutesToSlots(startTime.minutes) + index * 0.5) < 24 ? Math.floor(startTime.hours + timeMinutesToSlots(startTime.minutes) + index * 0.5) : Math.floor(startTime.hours + timeMinutesToSlots(startTime.minutes) + index * 0.5 - 24),
            minutes: startTime.minutes + index % 2 * 30 === 30 ? 30 : 0
        };
    });
    return timeList;
};

export default timeToBlocks;