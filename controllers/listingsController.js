/* Dependencies */
// import mongoose, { Query } from 'mongoose';
import InstrumentModel from "../models/instrumentModel.js";
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
export const create = (req, res) => {
    try {
        console.log(req.body)
        const instruments = InstrumentModel.create(req.body, );
        return res.status(200).json({
        success: true,
        count: instruments.length,
        data: instruments
      });
    } catch (err) {
        console.log(err)
      return res.status(500).json({
        success: false,
        error: "Server Error"
      });
    }
};

/* Show the current listing */
export const read = async (req, res) => {
    try {
        const instruments = await InstrumentModel.findById(req.params.id);
        return res.status(200).json({
          success: true,
          count: instruments.length,
          data: instruments.find
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          error: "Server Error"
        });
      }
};

//FIX ME
export const update = async (req, res) => {
  try {
    console.log(req.params.id)
    let update = {
      keyterms: req.body.keyterms,
    };
    const instruments = await InstrumentModel.findByIdAndUpdate(req.params.id, update, {new: true});
    return res.status(200).json({
      success: true,
      count: instruments.length
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

export const remove = async (req, res) => {
  try {
    const instruments = await InstrumentModel.findByIdAndRemove(
      req.params.id
    );
    return res.status(200).json({
      success: true,
      count: instruments.length
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

export const list = async (req, res) => {
  try {
    const instruments = await InstrumentModel.find();
    return res.status(200).json({
      success: true,
      count: instruments.length,
      data: instruments
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

export const listingByID = async (req, res, next, id) => {
  try {
    const instruments = await InstrumentModel.findById(id);
    return res.status(200).json({
      success: true,
      count: instruments.length,
      data: instruments.find(x => x._id == id)
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};
