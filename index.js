const DarkSky = require('dark-sky');
const SunCalc = require('suncalc');

class SupplementalLighting {
    constructor(apiKey, lat, lon) {
        this.apiKey = apiKey;
        this.latitude = lat;
        this.longitude = lon;
    }

    async getCurrentLighting() {
        const ds = new DarkSky(this.apiKey);
        let currentLight;
        const forecast = await ds.options({
            latitude: this.latitude,
            longitude: this.longitude,
            language: 'en',
            units: 'us',
        }).get();
        let currentTime = SupplementalLighting.getCurrentTime();
        let sunrise = this.getSunrise();
        let sunset = this.getSunset();
        console.log("Sun rises at: " + sunrise + "\nSun sets at: " + sunset + "\nCurrent Time is: " + currentTime);
        let sunPosition;
        if (currentTime > sunrise && currentTime < sunset) {
            sunPosition = (Math.cos((2 * Math.PI * (currentTime - sunrise)) / (sunset - sunrise) - Math.PI) + 1) / 2;
        } else {
            sunPosition = 0;
        }
        currentLight = (sunPosition - (sunPosition * forecast.currently.cloudCover) * 0.2) * 100;
        console.log("Sun brightness is: " + Math.round(currentLight) + "% of maximum");
        return currentLight;
    }
    getSunrise() {
        let date = new Date();
        let times = SunCalc.getTimes(date, this.latitude, this.longitude);
        return times.sunrise.getHours() + times.sunrise.getMinutes() / 60;
    }
    getSunset() {
        let date = new Date();
        let times = SunCalc.getTimes(date, this.latitude, this.longitude);
        return times.sunset.getHours() + times.sunset.getMinutes() / 60;
    }
    static getCurrentTime() {
        let date = new Date();
        return date.getHours() + date.getMinutes() / 60;
    }
}

module.exports = SupplementalLighting;