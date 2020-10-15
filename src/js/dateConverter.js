export default function dateConverter(dateStr) {
    let date = new Date(Date.parse(dateStr));
    let newDateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    return newDateStr
};