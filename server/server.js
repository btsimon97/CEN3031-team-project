import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config/config.js';
import listingsRouter from './routes/listingsRouter.js';
import cors from 'cors'
import mongodb from 'mongodb'
// import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import fs from 'fs'

import multer from 'multer'


//connect to database
// process.env.MONGODB_URI || 


var MongoClient = mongodb.MongoClient;

var url = process.env.MONGOLAB_URI;

mongoose.connect(url, {useNewUrlParser: true}, (error) => {
   if(!error)
   {
      console.log(`Successfully connected to mongoose database.`)
   } else {     
      console.log('Failed to connect to mongoose database')
   }
})




//initialize app
const app = express();
const PORT = process.env.PORThero;

// app.use(cors())

//enable request logging for development debugging
app.use(morgan('dev'));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
   res.header(
   "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept"
   );
   next();
   });

app.options("*", cors());

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

if(process.env.NODE_ENV === 'production')
{
   app.use(express.static('build'));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
   })
}

app.use('/', express.static('./../../client'));

app.use('/api/listings/', listingsRouter);

app.listen(PORT, () => console.log(`App now listening on port ${PORT}`));
