const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Use Redis to store temp and only call if value is over 5 min old
var redis = require('redis');
var redisClient = redis.createClient(process.env.REDIS_URL);

// Check redis
redisClient.on('error', function (err) {
    console.log('Error ' + err);
});
redisClient.get('roomTemp', function(err, reply) {
	// reply is null when the key is missing
	// console.log(reply);
});

// Setup Nest API with credentials
var NestApi = require('nest-api');
var nestApi = new NestApi('email@example.com', 'password');

function tempConvert(celTemp) {
	var fahrTemp = celTemp * 9 / 5 + 32;
	// Round temp for homekit
	return Math.round(fahrTemp);
}


function getDataFromNest() {
	return new Promise(function(resolve, reject) {
		console.log('Promise ran');
		nestApi.login(function(data) {
			nestApi.get(function(data) {
				var remoteSensor = data.kryptonite['UDID'];

				// Gem temp of remote sensor and return value in freedom units
				var currentRemoteTemp = tempConvert(remoteSensor.current_temperature);

				console.log('Currently ' + currentRemoteTemp + ' degrees');

				// Resolve promise and send back temp
				resolve(currentRemoteTemp)
			});
		});
	});
}


app.get('/', (req, res) => res.send('It Works!'))

app.get('/get-temp/', function (req, res) {
	console.log('Checking Temp');
	res.setHeader('Content-Type', 'application/json');

	var remoteTemp

	redisClient.get('temperature', function(err, reply) {
		if ( reply === null) {
			console.log('no temp set - pulling from remote');

			// Run Async func to get data
			var getRemoteTemp = getDataFromNest();

		    getRemoteTemp.then(function(result) {
		        remoteTemp = result;
		        console.log('Remote temp = ' + remoteTemp);

				// Set temp to Redis for store
				redisClient.set('temperature', remoteTemp);
				// Set temp to expire in 5 minutes
				redisClient.expire('temperature', 600);

				// Send response
				res.json({temperature: Number(remoteTemp)})
		    }, function(err) {
		        console.log(err);
		    })


		} else {
			console.log('Temp in redis = ' + reply);
			// Send Reaply
			res.json({temperature: Number(reply)})
		}
	});
});

app.listen(port, () => console.log(`Nest Remote Sensor app listening on port ${port}!`))
