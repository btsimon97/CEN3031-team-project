/* This file is your server listingsRouter. 
   Trace the dependencies so you understand which files are connected and how data is passed between them
   For each route, make note of the sequence of requests called for each

*/

import * as listings from '../controllers/listingsController.js';
import getCoordinates from '../controllers/coordinatesController.js';
import express from 'express'; //refers to Express the middleware helper for Node.js
const listingsRouter = express.Router();
/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 
  Note: the listings variable above and the file it is connected to help you trace
 */
listingsRouter.get('/', listings.list);
listingsRouter.post('/', getCoordinates, listings.create);

/*
  The ':' specifies a URL parameter. 
 */
listingsRouter.get('/:listingId', listings.read);
listingsRouter.put('/:listingId', getCoordinates, listings.update);
listingsRouter.delete('/:listingId', listings.remove);

export default listingsRouter;
