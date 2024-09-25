import mongoose from "mongoose";

import config from "../config";

export default async () => {
  const connection = await mongoose.connect(config.DEV_MONGODB_CONNECTION_URI, {
    autoCreate: true,
  });

  return connection;
};
