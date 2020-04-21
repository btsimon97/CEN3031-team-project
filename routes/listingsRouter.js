import multer from 'multer';
import multerS3 from 'multer-s3';
import express from 'express'; // refers to Express the middleware helper for Node.js
import path from 'path';
import aws from 'aws-sdk';
import * as listings from '../controllers/listingsController.js';

// aws.config.update({
//   secretAccessKey: process.env.AWSAccessKeyId,
//   accessKeyId: process.env.AWSSecretKey,
//   region: 'us-east-2',
// });
// const s3 = new aws.S3();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
//   },
// });
// const storage = multerS3({
//   s3: s3,
//   bucket: 'instrument-app-uploads',
//   metadata(req, file, cb) {
//     cb(null, { ...req.body }); //check
//   },
//   key(req, file, cb) {
//     cb(null, Date.now().toString());
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true); // accept file
//   } else {
//     cb(new Error('invalid file type'), false); // does not accept file
//   }
// };

const listingsRouter = express.Router();
/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.

  Note: the listings variable above and the file it is connected to help you trace
 */
listingsRouter.get('/', listings.list);
listingsRouter.post('/', listings.create);

/*
  The ':' specifies a URL parameter.
 */
listingsRouter.get('/:id', listings.read);
listingsRouter.put('/:id', listings.update);
listingsRouter.delete('/:id', listings.remove);

export default listingsRouter;
