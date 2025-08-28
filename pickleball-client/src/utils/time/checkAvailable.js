const checkAvailable = (availability) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const currentAvailable = availability.find(availability => availability.days.includes(currentDay));
    if (!currentAvailable) return "";
    const openTime = currentAvailable.openTime;
    const closeTime = currentAvailable.closeTime;
    if (openTime.hours - currentHour <= 1 && openTime.hours - currentHour >= 0) return "Sắp mở cửa";
    if (closeTime.hours - currentHour <= 1 && closeTime.hours - currentHour >= 0) return "Sắp đóng cửa";
    if (currentHour >= openTime.hours && currentHour <= closeTime.hours) return "Đang mở cửa";
    if (currentHour < openTime.hours || currentHour > closeTime.hours) return "Đóng cửa";
    return "";
}

export default checkAvailable;