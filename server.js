import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import listingsRouter from './routes/listingsRouter.js';
import cors from 'cors'
import  connectDB from './config/mongoDB.js';
import userRouter from './routes/users.js'
import dotenv from 'dotenv';

//global variables
dotenv.config({ path: './config/config.env' });


//connect to database
connectDB();

//initialize app
const app = express();

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


app.use('/api/listings', listingsRouter);
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


app.listen(process.env.PORT, () => console.log(`App now listening on port ${process.env.PORT}`));
