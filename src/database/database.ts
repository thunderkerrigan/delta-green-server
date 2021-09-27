import Mongoose from "mongoose";
import fs from "fs";
import path from "path";

let database: Mongoose.Connection;
export const connect = () => {
  // add your own uri below
  const credentials = fs.readFileSync(
    path.resolve(__dirname, "../X509-cert-3399936409455469696.pem")
  );
  const uri = process.env.MONGO_DATABASE_URL;
  if (database) return;

  Mongoose.connect(uri, {
    key: credentials,
    cert: credentials,
  });

  database = Mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};
export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
