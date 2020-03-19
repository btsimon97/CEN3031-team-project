'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
import * as fs from 'fs';
import mongoose from 'mongoose';
import InstrumentModel from '../server/models/instrumentModel.js';
import config from './config/config.js';
import async from 'async';

/* Connect to your database */
let instrumentData;
fs.readFile('listings.json', 'utf8', (err, data) => {
  if (err) throw err
  instrumentData  = JSON.parse(data);
  instrumentData.entries.forEach(element => {
    const newInstrment = new InstrumentModel(element);
    newInstrment.save().then(console.log("Element saved!"))
  })
});
