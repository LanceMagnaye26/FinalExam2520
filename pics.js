const request = require('request');
var getImage = (keyword, callback) => {
    request({
        url: `https://pixabay.com/api/?key=7246674-b37ac3e55b379cef1f626&q=${encodeURIComponent(keyword)}&image_type=photo`,
        json: true
    }, (error, response, body) => {
        if (error) {
        	callback('Cannot connect to Pixabay');

        } else if (body.totalHits === 0) {
            callback('Cannot find image');
        } else if (body.totalHits != 0) {
        	callback(undefined, {
        		image: body.hits,
        	});
        }
    });
};

module.exports = {
    getImage
};