const SupplementalLighting = require("./index");
require('dotenv').config();

let API_KEY = process.env.DARK_SKY;
let lon = process.env.LONGITUDE;
let lat = process.env.LATITUDE;

test("return instance of supplementallighting class", async () => {
    const sl = new SupplementalLighting(API_KEY, lat, lon);
    expect(sl).toBeInstanceOf(SupplementalLighting);
});

expect.extend({
    toBeWithinRange(received, floor, ceiling) {
        const pass = received >= floor && received <= ceiling;
        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be within range ${floor} - ${ceiling}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be within range ${floor} - ${ceiling}`,
                pass: false,
            };
        }
    },
});
test("return decimal between 0 to 100 when getCurrentLighting() is called", async () => {
    const sl = new SupplementalLighting(API_KEY, lat, lon);
    expect(await sl.getCurrentLighting()).toBeWithinRange(0, 100);
});
test("return sunrise time as decimal", async () => {
    const sl = new SupplementalLighting(API_KEY, lat, lon);
    expect(await sl.getSunrise()).toBeWithinRange(0, 24);
});
test("return sunrise time as decimal", async () => {
    const sl = new SupplementalLighting(API_KEY, lat, lon);
    expect(await sl.getSunset()).toBeWithinRange(0, 24);
});
test("return current time as decimal", async () => {
    const sl = new SupplementalLighting(API_KEY, lat, lon);
    expect(await SupplementalLighting.getCurrentTime()).toBeWithinRange(0, 24);
});