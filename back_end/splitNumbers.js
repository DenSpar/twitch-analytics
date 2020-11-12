
module.exports = function (num) {
    if (!num) {return null}
    else {
        return String(num).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/gu, "$1\u202f");
    };
};