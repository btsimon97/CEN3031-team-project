import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config/config.js';
import listingsRouter from './routes/listingsRouter.js';
import cors from 'cors'

import userRouter from './routes/users.js'

import dotenv from 'dotenv'
dotenv.config();

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
const PORT = process.env.PORT || 5000;

app.use(cors()); // allows cross platform resource sharing

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
   res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
   next();
});
app.options("*", cors());


app.use('/api/listings/', listingsRouter);
app.use('/api/users', userRouter);

let dirname = path.resolve();
if(process.env.NODE_ENV === 'production') //for deployment
{
   app.use(express.static(path.join("client/build")))

   app.get("*", (req, res) => {
      res.sendFile(path.join(dirname, "client", "build", "index.html"));
  });
}

app.use('/', express.static('./client')); 


app.listen(PORT, () => console.log(`App now listening on port ${PORT}`));
