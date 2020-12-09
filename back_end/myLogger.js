var fs = require('fs');

let getLogDate = () => {
    let date = new Date();
    let dateStr = date.toLocaleDateString('ru-Ru', { timeZone: 'Europe/Moscow' });
    let timeStr = date.toLocaleTimeString('ru-Ru', { timeZone: 'Europe/Moscow' });
    let milSecs = date.getMilliseconds();
    let fullDateStr = dateStr + ' ' + timeStr + '.' + milSecs;
    alert (fullDateStr);
};

module.exports = function myLogger (logText, logLevel = 'TRACE') {
    console.log(logText);
    let logDate = getLogDate ();
    let logFull = logDate + ' ' + logLevel + ': ' + logText;
    fs.appendFile('../metacorpstat.log', logFull + '/n');
};

// ERROR — приложение в критическом положении, требуется внимание человека для продолжения. Появляется довольно редко, но метко. Я использую его для очень низкоуровневых вещей или для необработанных исключений
// WARN — произошло что-то необычное, выбивающееся из обычного сценария, но приложение умное и восстановило свою работу само. Я использую этот уровень в обрабочиках ошибок.
// INFO — что сейчас происходит
// DEBUG — что сейчас происходит, более подробно
// TRACE — пишем как в твиттер, все что не попадя.