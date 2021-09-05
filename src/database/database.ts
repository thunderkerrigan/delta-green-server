import Mongoose from "mongoose";
import { UserModel } from "./models/users/users.model";
import fs from "fs";
import path from "path";

let database: Mongoose.Connection;
export const connect = () => {
  // add your own uri below
  const credentials = fs.readFileSync(
    path.resolve(__dirname, "../X509-cert-3399936409455469696.pem")
  );
  const uri =
    "mongodb+srv://cluster0.drgxe.mongodb.net/delta-green?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority";
  if (database) return;

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    sslKey: credentials,
    sslCert: credentials,
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
