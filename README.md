# Nest Remote Sensor API

This app gets the temperature of the remote sensor. *It's a super hacky work around until Nest releases their official API for this. It might stop working at any time.*


This app is built for a PAAS host like Heroku. You can run this locally by using `node index.js`


## Getting started

First you need to get the UDID of the remote sensor. You can do this by running `node index.js` and visiting `localhost:5000/get-udid`. This will log a JSON response of the remote sensors. Grab the UDID and request to temperature by visiting `localhost:5000/get-temp/UDID`


## Use with homebridge

Use the [homebridge-http-temp module](https://www.npmjs.com/package/homebridge-http-temperature) to get the data from this node app.

Here is the config I used (replace 11A111AAA11A1111 with your UDID):

```
"accessories": [
    {
        "accessory": "HttpTemperature",
        "name": "Another Room's Name",
        "url": "http://192.168.1.210/get-temp/11A111AAA11A1111",
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
