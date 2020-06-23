// Get distance in kilometer between two latitude/longitude cordinates
export function getDistance(prevCordinate, newCordinate) {
    const toRadian = (n) => (n * Math.PI) / 180;
    let lat2 = prevCordinate.lat;
    let lon2 = prevCordinate.lon;
    let lat1 = newCordinate.lat;
    let lon1 = newCordinate.lon;
    let R = 6371; // km
    let x1 = lat2 - lat1;
    let dLat = toRadian(x1);
    let x2 = lon2 - lon1;
    let dLon = toRadian(x2);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadian(lat1)) *
            Math.cos(toRadian(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
}

export function msToMin(millis) {
    return millis / 60000;
}

// Convert milliseconds to minutes and seconds
export function minToMinSec(decimalMinutes) {
    let minutes = Math.floor(decimalMinutes);
    let seconds = ((decimalMinutes * 60) % 60).toFixed(0);
    seconds = (seconds < 10 ? '0' : '') + seconds;

    return {
        minutes: minutes,
        seconds: seconds,
    };
}

// Convert meter per seconds to minutes per kilometer
export function mpsToMinutesPerKm(mps) {
    let secPerKilometer = (16.6666667 / mps) * 60;
    let minutes = Math.floor(secPerKilometer / 60);
    let seconds = secPerKilometer % 60;

    // return (
    //     (minutes < 10 ? '0' : '') +
    //     minutes.toFixed(0) +
    //     ':' +
    //     (seconds < 10 ? '0' : '') +
    //     seconds.toFixed(0)
    // );

    minutes = (minutes < 10 ? '0' : '') + minutes.toFixed(0);
    seconds = (seconds < 10 ? '0' : '') + seconds.toFixed(0);

    return {
        minutes: minutes,
        seconds: seconds,
    };
}

// Distance in Meter
// Time in Minutes
export function avgTempo(distance, time) {
    let kilometers = distance / 1000;
    // console.log(kilometers);

    let AVGminPerKm = time / kilometers;

    let minutes = Math.floor(AVGminPerKm);
    let seconds = ((AVGminPerKm * 60) % 60).toFixed(0);
    seconds = (seconds < 10 ? '0' : '') + seconds;

    return {
        minutes: minutes,
        seconds: seconds,
    };
}

// Return string of meter to km prinified
// Distance in Meter
export function meterToKilometer(meter) {
    let kilometers = meter / 1000;
    let completeKilometer = Math.floor(kilometers);
    let kilometerDecimals = kilometers % 1;
    let decimals = Math.round((kilometerDecimals + Number.EPSILON) * 100) / 100;
    let decimalString = decimals.toString().replace('0.', '');

    return (
        (completeKilometer < 10 ? '0' : '') +
        completeKilometer +
        ':' +
        decimalString +
        (decimalString.length < 2 ? '0' : '')
    );
}

export default {
    getDistance,
    msToMin,
    minToMinSec,
    mpsToMinutesPerKm,
    avgTempo,
    meterToKilometer,
};