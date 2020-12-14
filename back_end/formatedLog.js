module.exports = function formatedLog (logText, logLevel = 'TRACE') {
    console.log(
        new Date().toLocaleString('ru-Ru', { timeZone: 'Europe/Moscow' }),
        logLevel,
        logText
    );
};

// ERROR — приложение в критическом положении
// WARN — произошло что-то необычное, выбивающееся из обычного сценария, но приложение продолжает работать
// INFO — что сейчас происходит
// DEBUG — что сейчас происходит, более подробно
// TRACE — пишем как в твиттер, все что не попадя 