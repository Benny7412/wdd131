//data
const area = '695,660 km^2';
const population = '30.5 Million';
const capital = 'Austin';
const currency = 'USD';
const languages = 'English, Spanish';
const timeZone = 'CST (UTC -6)';
const callingCode = '+1';
const internetTld = '.us';


document.getElementById('area').textContent = area;
document.getElementById('population').textContent = population;
document.getElementById('currency').textContent = currency;
document.getElementById('capital').textContent = capital;
document.getElementById('languages').textContent = languages;
document.getElementById('time-zone').textContent = timeZone;
document.getElementById('calling-code').textContent = callingCode;
document.getElementById('internet-tld').textContent = internetTld;



//weather
const temperature = 45;
const windSpeed = 14;
const conditions = 'Sunny';
let windChill = 'N/A';

function calculateWindChill(temperature, windSpeed) {
    const windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);
    return windChill.toFixed(0);
}

if (temperature <= 50 && windSpeed > 3) {
    windChill = calculateWindChill(temperature, windSpeed)
}

document.getElementById('temperature').textContent = temperature + '°F';
document.getElementById('conditions').textContent = conditions;
document.getElementById('wind').textContent = windSpeed + 'mph';
document.getElementById('wind-chill').textContent = windChill + '°F';