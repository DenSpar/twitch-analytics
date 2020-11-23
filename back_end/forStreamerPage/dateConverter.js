module.exports = function dateConverter (dateStr) {
    if (dateStr === '') {return ''};
    let date = new Date(Date.parse(dateStr));
    let newDateStr = date.toLocaleDateString('ru-Ru', { timeZone: 'Europe/Moscow' }) + ' ' + date.toLocaleTimeString('ru-Ru', { timeZone: 'Europe/Moscow' });
    return newDateStr
};