import express from 'express';
import upload from '../services/file-upload.js';
import aws from 'aws-sdk';

const fileRouter = new express.Router();

const singleUpload = upload.single('image');

fileRouter.post('/', function (req, res) {
  console.log(req.file);
  singleUpload(req, res, function (err) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
    }

    return res.json({ imageUrl: req.file.location });
  });
});

export default fileRouter;
