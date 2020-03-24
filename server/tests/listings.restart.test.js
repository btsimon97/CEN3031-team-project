import {clearAndRefill} from "../JSONToMongo";

describe('Refilling database', () => {
    test('deleting all documents and resetting', async (done) => {
        await clearAndRefill();
        done();
    })
});
