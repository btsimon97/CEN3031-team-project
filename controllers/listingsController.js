/* Dependencies */
// import mongoose, { Query } from 'mongoose';
import InstrumentModel from '../models/instrumentModel.js';
// import  {sortBy}   from 'async';

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions refer back to this tutorial 
  https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
  or
  https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d
  

  If you are looking for more understanding of exports and export modules - 
  https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
  or
  https://medium.com/@etherealm/named-export-vs-default-export-in-es6-affb483a0910
 */

/* Create a listing */
export const create = async (req, res) => {
    
    /* Instantiate a Listing */
    /* save the coordinates from the coordinatesController (located in req.results if there is an address property) */
    /* Then save the listing to the database */


    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    // Create a instrument model
    const newInstrument = new InstrumentModel({
        keyterms : req.body.keyterms,
        //img: { data: Buffer, contentType: String}
    });

    // Save Note in the database
    newInstrument.save()
    .then(data => {
        res.send(data);
        res.status(200).send({
            message: "Instrument added!"
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the instrument."
        });
    });
};

/* Show the current listing */
export const read = (req, res) => {
    /* send back the listing as json from the request */
    /* If the listing could _not_ be found, be sure to send back a response in the following format: {error: 'Some message that indicates an error'} */
    InstrumentModel.findById(req.params.listingId)
    .then(instrument => {
        if(!instrument) {
            return res.status(404).send({
                message: "Instrument not found with id " + req.body.id
            });            
        }
        res.send(instrument);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Instrument not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving instrument with id " + req.params.id
        });
    });
};

/* Update a listing - note the order in which this function is called by the router*/
export const update = (req, res) => {
    const instrument = req.instrument;
    
    if(!req.body) {
        return res.status(400).send({
            message: "Instrument content can not be empty"
        });
    }

    /* Replace the listings's properties with the new properties found in req.body */

    InstrumentModel.findByIdAndUpdate(req.params.listingId, {
        keyterms: req.keyterms,
        img: req.img
    }, {new: true})
    .then(instrument => {
        if(!instrument) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.listingId
            });
        }
        res.send(instrument);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Instrument not found with id " + req.params.listingId
            });                
        }
        return res.status(500).send({
            message: "Error updating instrument with id " + req.params.listingId
        });
    });

    /*save the coordinates (located in req.results if there is an address property) */

    /* Save the listing */

};

/* Delete a listing */
export const remove = (req, res) => {
    /* Add your code to remove the listins */
    /* If the listing could _not_ be found, be sure to send back a response in the following format: {error: 'Some message that indicates an error'} */
    if(!req.body) {
        return res.status(400).send({
            message: "Instrument content can not be empty"
        });
    }
    console.log(req.params.listingId)
    InstrumentModel.findByIdAndRemove(req.params.listingId)
    .then(instrument => {
        if(!instrument) {
            return res.status(404).send({
                message: "Instrument not found with id " + req.body.id
            });
        }
        res.send({message: "Instrument deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.body.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete instrument with id " + req.body.id
        });
    });
    console.log("Delete successful!")
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
export const list = (req, res) => {
    /* Add your code. Make sure to send the documents as a JSON response.*/
    InstrumentModel.find({}, (err, data) => {
        console.log(data)
        if (err) throw err
        res.send(data)
    });
};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  HINT: Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
export const listingByID = (req, res, next, id) => {
    InstrumentModel.findById(id, (err, data) => {
        if (err) throw err
        res.send(data)
        next()
    });
};
