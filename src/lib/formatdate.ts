
const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
]

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]

export const formatDate = (date: Date): string => {
    const day = days[date.getDay()];
    const dayofmonth = date.getDate();
    const numberSuffix = getNumSuffix(dayofmonth);
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hour = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return `${day} ${dayofmonth}${numberSuffix} ${month} ${year}, ${hour}:${minutes}`
}

export const getNumSuffix = (num: number): string => {
    if(num % 10 === 1) {return "st"}
    if(num % 10 === 2) {return "nd"}
    if(num % 10 === 3) {return "rd"}
    return "th"
}