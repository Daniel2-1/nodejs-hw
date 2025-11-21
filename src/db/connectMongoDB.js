import mongoose from 'mongoose';

// export const connectMongoDB = async () => {
//   try {
//     const mongoUrl = process.env.MONGO_URL;
//     await mongoose.connect(mongoUrl);
//     console.log('✅ MongoDB connection established successfully');
//   } catch (error) {
//     console.error('❌ Failed to connect to MongoDB:', error.message);
//     process.exit(1);
//   }
// };

export const connectMongoDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URL;
    await mongoose.connect(mongoURL);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};
