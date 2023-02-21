//function to add hours to date
function addHours(date, hours) {
    date.setHours(date.getHours() + hours);
    return date;
}

const date = new Date()

const config = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
}

addHours(date, 1)
const [month, day, year] = date.toLocaleDateString("en-GB", config).split('/')
const dateToSend = `${year}-${day}-${month}`
const dateToShow = new Date(dateToSend).toUTCString().replace(/(\d\d:.+|\w\w\w, )/g, '')

export { dateToShow, dateToSend }