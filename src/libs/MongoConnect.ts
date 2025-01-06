// import mongoose from "mongoose";

// export const connectMongo = async () => {
//   if (mongoose.connection.readyState === 1) {
//     return mongoose.connection.asPromise();
//   }

//   return mongoose.connect(process.env.MONGODB_URL!);
// };

import mongoose from "mongoose";

const connections: { isConnected?: number } = {};
const connectMongo = async () => {
  if (connections.isConnected) {
    console.log("Using existing connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL!);
    connections.isConnected = db.connections[0].readyState;
    // console.log(db);
    // console.log("MongoDB connected");
  } catch (error: unknown) {
    console.log("Db Connection Error", error);

    process.exit(1);
  }
};

export default connectMongo;
