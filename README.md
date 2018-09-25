# Supplemental Lighting
### About
A simple Node.js library to calculate the current sunlight for use in supplemental lighting projects.
### Usage
```
const supplementallighting = new SupplementalLighting(process.env.DARK_SKY, process.env.LATITUDE, process.env.LONGITUDE);
console.log(await supplementallighting.getCurrentLighting()); // returns sunlight amount on a scale from 0/100.
```