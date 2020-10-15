export default function videoTimeConverter(length) {
    let hours = 0;
    let mins = 0;
    if (length > 3599) {
        hours = Math.floor(length / 3600);
        length = length % 3600;
    };
    if (length > 59) {
        mins = Math.floor(length / 60);
        if (mins < 10 ) {mins = "0" + mins};
        length = length % 60;
    } else {mins = "0" + mins};
    let secs = length; 
    if (secs < 10) {secs = "0" + secs};
    return (hours + ":" + mins + ":" + secs)
};