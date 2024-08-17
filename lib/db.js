import mongoose from "mongoose";

export async function connect() {
  try {
      mongoose.connect(process.env.MONGODB_URI)
      const connection = mongoose.connection
      connection.on('connected', () => {
        console.log('MongoDB connected')
      })
      connection.on('error', (error) => {
        console.log('MongoDB not connected' + error);
        process.exit();
      })
  } catch(error) {
      console.log('Something went wrong while connecting to database');
      console.log(error);
  }
}