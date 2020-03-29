import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config/config.js';
import listingsRouter from './routes/listingsRouter.js';
import cors from 'cors'
// import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import fs from 'fs'

import multer from 'multer'


//connect to database
mongoose.connect(config.db.uri, {useNewUrlParser: true}, (error) => {
   if(!error)
   {
      console.log(`Successfully connected to mongoose database.`)
   } else {     
      console.log('Failed to connect to mongoose database')
   }
})




//initialize app
const app = express();

app.use(cors())

//enable request logging for development debugging
app.use(morgan('dev'));


// const upload = multer({ storage: storage });
	
//https://medium.com/@colinrlly/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed

// const storage = multer.diskStorage({
//    destination: function (req, res, cb) {
//        cb(null, 'uploads/')
//    }
// });

// Router.route('/img_data')
// .post(upload.single('file'), function(req, res) {
//     var new_img = new img;
//     new_img.img.data = fs.readFileSync(req.file.path)
//     new_img.img.contentType = 'image/jpeg';
//     new_img.save();
//     res.json({ message: 'New image added to the db!' });
// })

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

app.listen(config.port, () => console.log(`App now listening on port ${config.port}`));
