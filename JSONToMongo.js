'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
import * as fs from 'fs';
import mongoose from 'mongoose';
import InstrumentModel from './models/instrumentModel.js';
import config from './config/config.js';


/* Connect to your database using mongoose */
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/
let uri = config.db.uri

mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.dropCollection('test/listings')

connection.once('open', () => {
  console.log("Mongoose connected!")
});


/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */
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



