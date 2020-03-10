'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
import * as fs from 'fs';
import mongoose from 'mongoose';
import Listing from './models/ListingModel.js';
import config from './config/config.js';
import async from 'async';

/* Connect to your database */
let listingData;

fs.readFile('listings.json', 'utf8', (err, data) => {
  if (err) throw err
  listingData  = JSON.parse(data);
  listingData.entries.forEach(element => {
    // console.log(element.name);
    const newDoc = new Listing(element);
    newDoc.save().then(console.log("Element saved!"))
  })
});
