// To learn more about the Jest testing framework, please follow the link below! Google is your friend.
//Check out - https://jestjs.io/docs/en/


import mongoose from 'mongoose';
import Listing from '../models/ListingModel.js';
import config from '../config/config.js';
import {clearAndRefill} from "../JSONToMongo";

let listing = {
    code: "LBWEST",
    name: "Library West",
    coordinates: {
        latitude: 29.6508246,
        longitude: -82.3417565
    },
    address: "1545 W University Ave, Gainesville, FL 32603, United States"
}, id, db;

describe('Listing Schema Unit Tests', () => {
    describe('Saving to database', () => {

        beforeAll(async () => {
            db = await mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
            await mongoose.set('useCreateIndex', true);
            await mongoose.set('useFindAndModify', false);
            console.log(`established connection to db at uri: ${config.db.uri}!`);
        });

        afterEach(async () => {
            if (id) {
                await Listing.deleteOne({_id: id}).exec(() => {
                    id = null;
                });
            }
        });

        afterAll(async () => {
            await mongoose.connection.close();
        });

        test('saves properly when code and name provided', async (done) => {
            await new Listing({
                name: listing.name,
                code: listing.code
            }).save((err, listing) => {
                expect(err).toBeNull();
                id = listing._id;
                expect(id).not.toBeNull();
                expect(listing.name).toBe('Library West');
                done();
            });
        }, 10000);

        test('saves properly when all three properties provided', async (done) => {
            await new Listing(listing).save((err, listing) => {
                expect(err).toBeNull();
                id = listing._id;
                expect(id).not.toBeNull();
                done();
            });
        });

        test('throws an error when name not provided', async (done) => {
            await new Listing({
                code: listing.code
            }).save(err => {
                expect(err).not.toBeNull();
                done();
            });
        });

        test('throws an error when code not provided', async (done) => {
            await new Listing({
                name: listing.name
            }).save((err) => {
                expect(err).not.toBeNull();
                done();
            })
        });

    });
});
