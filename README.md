# Nest Remote Sensor Hack

This app gets the temperature of the remote sensor. *It's a super hacky work around until Nest releases their official API for this. It might stop working at any time.*


This app is built for a PAAS host like Heroku. You can run this locally by using `node index.js`


## Getting started

First you need to get the UDID of the remote sensor. You can do this by running `node udid.js`. This will log a JSON response of the remote sensors. Grab the UDID and add it to `var remoteSensor = data.kryptonite['UDID'];` in `index.js`


## Use with homebridge

Use the [homebridge-http-temp module](https://www.npmjs.com/package/homebridge-http-temperature) to get the data from this node app.

Here is the config I used:

```
"accessories": [
    {
        "accessory": "HttpTemperature",
        "name": "Another Room's Name",
        "url": "http://192.168.1.210/get-temp",
        "http_method": "GET",
        "field_name": "temperature",
        "update_interval": "600000ms",
		"manufacturer": "Nest",
		"model": "Remote Sensor",
		"units": "F"
    }
]
```
Replace the URL with the hostname or IP this node app.
