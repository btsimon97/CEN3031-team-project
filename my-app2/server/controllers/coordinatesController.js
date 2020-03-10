import config from '../config/config.js';
import request from 'request';

export default (req, res, next) => {
    if (req.body.address) {
        // This code replaces all whitespace and commas with the appropriate url-encoded replacement value.
        const addressTemp = req.body.address.toLowerCase().replace(/\s/g, "%20").replace(/,/g, "%2C");

        // Setup your options q and key are provided. Feel free to add others to make the JSON response less verbose and easier to read
        const options = {
            q: addressTemp,
            key: config.openCage.key,
        };

        // The below code makes a GET request to the specified URL.
        request({
            url: 'https://api.opencagedata.com/geocode/v1/json',
            qs: options
        }, async (error, response, body) => {
            // For ideas about response and error processing see https://opencagedata.com/tutorials/geocode-in-nodejs
            
            /* Save the coordinates in req.results -> this information will be accessed by listingsController.js to add the coordinates to the Listing to be saved in the database.
              To access the coordinates, you can JSON.parse(body) and find which attribute(s) store some sort of latitude and longitude coordinate pair.
              Make SURE to store in req.results.
            */
            let arr = JSON.parse(body).results[0].geometry
            req.results = {latitude: arr.lat, longitude: arr.lng}
            next(); 
        });
    } else {
        next();
    }
};  
