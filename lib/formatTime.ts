export const getOpenHoursToday = (openHours: { [key: string]: string }): string => {
    const daysOfWeek = [
        "sunday", 
        "monday", 
        "tuesday", 
        "wednesday", 
        "thursday", 
        "friday", 
        "saturday"
    ];
    const today = new Date();
    const dayIndex = today.getDay();
    const todayDayName = daysOfWeek[dayIndex];
    const openHoursToday = openHours[todayDayName];

    if (!openHoursToday || openHoursToday === "Closed") {
        return 'Closed today';
    }

    if (openHoursToday === "Open 24 hours") {
        return 'Open 24 hours';
    }

    const timeRanges = openHoursToday.split(',').map(range => range.trim());
    const currentTime = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    let nextOpenTime: string | null = null;
    let isOpen = false;

    for (const range of timeRanges) {

        let openTime, closeTime;

        if (range.includes(' – ')) {
            [openTime, closeTime] = range.split(' – ');
        } else if (range.includes(' - ')) {
            [openTime, closeTime] = range.split(' - ');
        } else {
            continue; // If the range doesn't match expected formats, skip to the next range
        }

        // Convert times to 24-hour format first for comparison
        openTime = convertTo24Hour(openTime.trim());
        closeTime = convertTo24Hour(closeTime.trim());

        if (currentTime >= openTime && currentTime <= closeTime) {
            isOpen = true;
            return `Opens until ${convertTo12Hour(closeTime)}`;
        } else if (currentTime < openTime && (!nextOpenTime || openTime < nextOpenTime)) {
            nextOpenTime = openTime;
        }
    }

    if (isOpen) {
        return `Opens until ${convertTo12Hour(timeRanges[timeRanges.length - 1].split(' - ')[1].trim() || timeRanges[timeRanges.length - 1].split(' – ')[1].trim())}`;
    } else if (nextOpenTime) {
        return `Opens at ${convertTo12Hour(nextOpenTime)}`;
    }

    return 'Closed today';
};

const convertTo24Hour = (time: string): string => {
    let [hour, minute] = time.match(/(\d+):(\d+)/)?.slice(1) ?? [];
    const period = time.match(/AM|PM/i)?.[0].toLowerCase();
    if (period === 'pm' && hour !== '12') {
        hour = (parseInt(hour, 10) + 12).toString();
    } else if (period === 'am' && hour === '12') {
        hour = '00';
    }
    return `${hour}:${minute}`;
};

const convertTo12Hour = (time: string): string => {
    let [hour, minute] = time.split(':');
    const period = parseInt(hour, 10) >= 12 ? 'PM' : 'AM';
    hour = (parseInt(hour, 10) % 12 || 12).toString();
    return `${hour}:${minute} ${period}`;
};    

export const getOpenHoursTextColor = (text:string) => {
    if (text.startsWith('Closed') || text.startsWith('Opens at')) {
        return 'text-red-500';
    } else if (text.startsWith('Opens') || text.startsWith('Open')) {
        return 'text-green-500';
    }
    return 'text-amber-700'
}