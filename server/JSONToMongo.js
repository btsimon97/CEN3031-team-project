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
export const clearAndRefill = () => {
    mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
    /*
      Clears the connected database collection of listings
     */
    Listing.deleteMany({}, (err) => {
        if (err) throw err;
    });

    fs.readFile('listings.json', 'utf8', (err, data) => {
        if (err) throw err;
        let listingData = JSON.parse(data);

        async.forEach(listingData.entries, (doc, callback) => {
            Listing.create(doc, (err) => {
                if (err) throw err;
                callback();
            });
        }, () => {
            mongoose.connection.close();
        });

    });
};

