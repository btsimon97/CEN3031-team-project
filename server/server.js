import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config/config.js';
import listingsRouter from './routes/listingsRouter.js';
import getCoordinates from './controllers/coordinatesController.js';

//connect to database
mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    console.log(`Successfully connected to mongoose database.`)
});

//initialize app
const app = express();

//enable request logging for development debugging
app.use(morgan('dev'));

//body parsing middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

/* serve static files - see http://expressjs.com/en/starter/static-files.html */
app.use('/', express.static('./../../client'));

/* The next three middleware are important to the API that we are building */

/* Request Handler for route /api/listings
   TODO: Update the code to meet the required format - app.use('/api/listings', appropriateMiddleWare)
   use the listings router middleware for requests to the api
   check the variables list above
*/
app.use('/api/listings/', listingsRouter);


/* Request Handler for coordinates
   This is a server wrapper around Open Cage Data Geocoding API to get latitude + longitude coordinates from address */
app.post('/api/coordinates', getCoordinates, (req, res) => {
    res.send(req.results);
});


/* Request handler for all other routes
   Sends a response (res) to go to the homepage for all routes not specified */
app.all('/*', (req, res) => {


    /*Add YOUR CODE HERE
       see https://expressjs.com/en/api.html#res.sendFile
       see https://nodejs.org/api/path.html
       The path.resolve() method returns a string and resolves a sequence of paths or path segments into an absolute path.
       If no path segments are passed, path.resolve() will return the absolute path of the current working directory.
    */
    res.sendFile(path.resolve('client', 'index.html'));
});

app.listen(config.port, () => console.log(`App now listening on port ${config.port}`));
