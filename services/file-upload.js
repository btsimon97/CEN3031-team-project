import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });
const s3 = new aws.S3();

const storage = multerS3({
  s3: s3,
  bucket: 'instrument-app-uploads',
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: 'TESTING_META_DATA!' });
  },
  key(req, file, cb) {
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

aws.config.update({
  secretAccessKey: process.env.AWSAccessKeyId,
  accessKeyId: process.env.AWSSecretKey,
  region: 'us-east-2',
});

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
