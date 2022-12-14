import mongoose from 'mongoose';
require('dotenv').config();

export default () => {
  if (process.env.MONGO_URI !== undefined) {
    try {
      mongoose.connect(process.env.MONGO_URI);
      console.log('connected');
    } catch (error) {
      console.log(error);
    }
  }
};
