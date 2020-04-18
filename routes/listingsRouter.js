import multer from 'multer';
import express from 'express'; // refers to Express the middleware helper for Node.js
import path from 'path';

import * as listings from '../controllers/listingsController.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // accept file
  } else {
    cb(new Error('invalid file type'), false); // does not accept file
  }
};

const upload = multer({
  storage,
  fileFilter,
});

const listingsRouter = express.Router();
/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.

  Note: the listings variable above and the file it is connected to help you trace
 */
listingsRouter.get('/', listings.list);
listingsRouter.post('/', upload.single('instrumentImage'), listings.create);

/*
  The ':' specifies a URL parameter.
 */
listingsRouter.get('/:id', listings.read);
listingsRouter.put('/:id', listings.update);
listingsRouter.delete('/:id', listings.remove);

export default listingsRouter;
