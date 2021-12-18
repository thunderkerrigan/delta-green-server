import express from "express";
import fileUpload from "express-fileupload";
import { PORT } from "./config/constants";
import CharacterRouter from "./routes/characters";
import LoginRouter from "./routes/login";
import { connect } from "./database/database";
import "./DocumentSocket";
import { initializeApp, cert } from "firebase-admin/app";

connect();
const serviceAccount = require("../service-account-file.json");
const credential = cert(serviceAccount);
const defaultApp = initializeApp({
  credential,
  databaseURL:
    "https://delta-green-toolbox-default-rtdb.europe-west1.firebasedatabase.app",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  next();
});

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server is listening on port ${PORT}`);
});

app.use("/api/v1/character", CharacterRouter);
app.use("/login", LoginRouter);
