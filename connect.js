import mongoose from "mongoose";

const connectToMongoDb = async (url) => {
  return mongoose.connect(url);
};

export default connectToMongoDb;
