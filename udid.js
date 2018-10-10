// Setup Nest API with credentials
var NestApi = require('nest-api');
var nestApi = new NestApi('email@example.com', 'password');

// Log the data from nest
nestApi.login(function(data) {
	nestApi.get(function(data) {
		console.log(data.kryptonite);

		// Look for the UDID in this response
		// It'll be something like 11A111AAA11A1111
	});
});
