import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config({ path: './config/config.env' });


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      });
  
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
      console.log(`Error: ${err.message}`.red);
      process.exit(1);
    }
  }
  
export default connectDB;