/* Dependencies */
// import mongoose, { Query } from 'mongoose';
import Listing from '../models/ListingModel.js';
import coordinates from './coordinatesController.js';
import  sortBy   from 'async';

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
    // Create a Note
    const newlisting = new Listing({
        code: req.body.code,
        name: req.body.name,
        address : req.body.address,
        coordinates : req.results,
        keyterms : req.keyterms
    });

    // Save Note in the database
    newlisting.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

/* Show the current listing */
export const read = (req, res) => {
    /* send back the listing as json from the request */
    /* If the listing could _not_ be found, be sure to send back a response in the following format: {error: 'Some message that indicates an error'} */
    Listing.findById(req.params.listingId)
    .then(listing => {
        if(!listing) {
            return res.status(404).send({
                message: "Listing not found with id " + req.body.id
            });            
        }
        res.send(listing);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.id
        });
    });
};

/* Update a listing - note the order in which this function is called by the router*/
export const update = (req, res) => {
    const listing = req.listing;

    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    /* Replace the listings's properties with the new properties found in req.body */

    Listing.findByIdAndUpdate(req.params.listingId, {
        code: req.body.code || res.body.code,
        name: req.body.name || res.body.name,
        address: req.body.address || res.body.address,
        coordinates : req.results,
        keyterms: req.keyterms
    }, {new: true})
    .then(listing => {
        if(!listing) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.listingId
            });
        }
        res.send(listing);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Listing not found with id " + req.params.listingId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.listingId
        });
    });

    /*save the coordinates (located in req.results if there is an address property) */

    /* Save the listing */

};

/* Delete a listing */
export const remove = (req, res) => {
    /* Add your code to remove the listins */
    /* If the listing could _not_ be found, be sure to send back a response in the following format: {error: 'Some message that indicates an error'} */
    if(req.body.name===null) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    } 
    let myQuery = {code: req.body.code, name: req.body.name, address: req.body.address}
    Listing.findOneAndRemove(myQuery)
    .then(mylisting => {
        // if(!mylisting) {
        //     return res.status(404).send({
        //         message: "mylisting not found with id " + req.params.listingId
        //     });
        // }
        res.send({message: "Listing deleted successfully!"});
    })
    
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
export const list = (req, res) => {
    /* Add your code. Make sure to send the documents as a JSON response.*/
    Listing.find({}, (err, data) => {
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
    Listing.findById(id, (err, data) => {
        if (err) throw err
        res.send(data)
        next()
    });
};
