const express = require('express');
const request = require('request');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

const image = require('./pics.js');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (request, response) => {
	response.render('index.hbs', {
		title: 'Index'
	})
	
});

app.post('/', (request, response) => {
	image.getImage(encodeURIComponent(request.body.picture), (errorMessage, results) => {
	if (errorMessage) {
		console.log(errorMessage);
	} else {
			response.render('index.hbs', {
			title: 'Index',
			img: results.image[0].webformatURL,
			img2: results.image[1].webformatURL
		})
	}
});
});



app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
});

