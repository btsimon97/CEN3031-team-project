import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config/config.js';
import listingsRouter from './routes/listingsRouter.js';
import cors from 'cors'


console.log(config.db.uri);

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
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


if(process.env.NODE_ENV === 'production') //for deployment
{
   app.use(express.static(path.join(__dirname, "client", "build")))

   app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
  
}
app.use('/', express.static('./../../client'));

app.use('/api/listings/', listingsRouter);

app.listen(PORT, () => console.log(`App now listening on port ${PORT}`));
