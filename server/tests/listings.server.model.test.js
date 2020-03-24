// To learn more about the Jest testing framework, please follow the link below! Google is your friend.
//Check out - https://jestjs.io/docs/en/


import mongoose from 'mongoose';
import InstrumentModel from '../models/instrumentModel.js';
import config from '../config/config.js';

let instrument = {
    keyterms: ["knife","sharp", "shiny"]
}, id, db;

describe('Medical Instrument Schema Unit Tests', () => {
    describe('Saving to database', () => {

        beforeAll(async () => {
            db = await mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
            await mongoose.set('useCreateIndex', true);
            await mongoose.set('useFindAndModify', false);
            console.log(`established connection to db at uri: ${config.db.uri}!`);
        });

        afterEach(async () => {
            if (id) {
                await InstrumentModel.deleteOne({_id: id}).exec(() => {
                    id = null;
                });
            }
        });

        afterAll(async () => {
            await mongoose.connection.close();
        });

        test('saves properly when code and name provided', async (done) => {
            await new InstrumentModel({
                keyterms: {Bone_chisel, knife, not_shiny}
            }).save((err, listing) => {
                expect(err).toBeNull();
                id = listing._id;
                expect(id).not.toBeNull();
                expect(keyterms).toBe({Bone_chisel, knife, not_shiny});
                done();
            });
        }, 10000);

        test('throws an error when keyterms not provided', async (done) => {
            await new InstrumentModel({
        
            }).save(err => {
                expect(err).not.toBeNull();
                done();
            });
        });

       

    });
});
