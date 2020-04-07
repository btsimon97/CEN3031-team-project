'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
import * as fs from 'fs';
import mongoose from 'mongoose';
import InstrumentModel from './models/instrumentModel.js';
import dotenv from 'dotenv';


dotenv.config({ path: './config/config.env' });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("Mongoose connected!")
});

let listingData;

fs.readFile('./listings.json', 'utf8', (err, data) => {
  if (err) throw err
  listingData  = JSON.parse(data);
  listingData.entries.forEach(element => {
    // console.log(element.name);
    const newDoc = new InstrumentModel(element);
    newDoc.save().then(console.log("Element saved!"))
  })
});



