const convertTimeObject = (time) => {
    if (!time || (!time.hours && time.hours != 0) || (!time.minutes && time.minutes != 0)) return "00:00";
    const paddedHours = String(time.hours).padStart(2, "0");
    const paddedMinutes = String(time.minutes).padStart(2, "0");
    return `${paddedHours}:${paddedMinutes}`;
};

export default convertTimeObject;