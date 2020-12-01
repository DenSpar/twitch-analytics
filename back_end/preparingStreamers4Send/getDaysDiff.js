module.exports = function getDaysDiff (dateStr) {
    let date = new Date(dateStr).getTime();
    let currentDate = new Date().getTime();
    let timeDiff = (currentDate - date) / 1000;
    let daysDiff = Math.floor(timeDiff / 86400);
    return daysDiff
};