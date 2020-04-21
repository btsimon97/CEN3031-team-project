import path from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import aws from 'aws-sdk';
import ejs from 'ejs';
import cors from 'cors';

import listingsRouter from './routes/listingsRouter.js';
import connectDB from './config/mongoDB.js';
import userRouter from './routes/users.js';
import fileRouter from './routes/file-upload.js';
import dotenv from 'dotenv';
import upload from './services/file-upload.js';

// global variables
dotenv.config({ path: './config/config.env' });

// connect to database
connectDB();

// initialize app
const app = express();

app.use(cors()); // allows cross platform resource sharing

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.options('*', cors());

app.use('/api/listings', listingsRouter);
app.use('/api/users', userRouter);
app.use('/', express.static('./client'));
// app.use('/uploads', express.static('uploads'));
app.use('/api/uploads', fileRouter);

// app.use(express.static('./client/public'));
// app.engine('html', ejs.renderFile);

// const S3_BUCKET = process.env.S3_BUCKET;

// aws.config.region = 'us-east-2';

// app.get('/sign-s3', (req, res) => {
//   const s3 = new aws.S3();
//   const fileName = req.query['file-name'];
//   const fileType = req.query['file-type'];
//   const s3Params = {
//     Bucket: S3_BUCKET,
//     Key: fileName,
//     Expires: 60,
//     ContentType: fileType,
//     ACL: 'public-read',
//   };

//   s3.getSignedUrl('putObject', s3Params, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.end();
//     }
//     const returnData = {
//       signedRequest: data,
//       url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
//     };
//     res.write(JSON.stringify(returnData));
//     res.end();
//   });
// });

const dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  // for deployment
  app.use(express.static(path.join('client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT, () => console.log(`App now listening on port ${process.env.PORT}`));
