import InstrumentModel from '../models/instrumentModel.js';

// const storage =

// const upload = multer({ dest: 'uploads/' });

export const create = async (req, res) => {
  try {
    console.log(req);
    const instruments = await InstrumentModel.create({
      name: req.body.name,
      keyterms: req.body.keyterms,
      description: req.body.description,
      instrumentImage: req.body.instrumentImage,
    });

    return res.status(200).json({
      success: true,
      count: instruments.length,
      data: instruments,
      filePath: req.body.instrumentImage,
      // fileName: req.file.originalname,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: 'Server Error',
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
      data: instruments.find,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// CHECK ME
export const update = async (req, res) => {
  console.log('Updating');
  console.log(req.params.id);
  try {
    let update = {
      keyterms: req.body.keyterms,
      instrumentImage: req.body.instrumentImage
    };
    const instruments = await InstrumentModel.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      count: instruments.length,
      data: instruments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const instruments = await InstrumentModel.findByIdAndRemove(req.params.id);
    return res.status(200).json({
      success: true,
      count: instruments.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

export const list = async (req, res) => {
  try {
    const instruments = await InstrumentModel.find();
    return res.status(200).json({
      success: true,
      count: instruments.length,
      data: instruments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

export const listingByID = async (req, res, next, id) => {
  try {
    const instruments = await InstrumentModel.findById(id);
    return res.status(200).json({
      success: true,
      count: instruments.length,
      data: instruments.find((x) => x._id == id),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
