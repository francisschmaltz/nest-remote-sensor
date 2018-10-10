# Nest Remote Sensor Hack

This app gets the temperature of the remote sensor.


This app is built for a PAAS host like Heroku. You can run this locally by using `node index.js`


## Getting started

First you need to get the UDID of the remote sensor. You can do this by running `node udid.js`. This will log a JSON response of the remote sensors. Grab the UDID and add it to `var remoteSensor = data.kryptonite['UDID'];` in `index.js`
