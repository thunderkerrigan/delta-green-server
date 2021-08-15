import express from "express";
import fileUpload from "express-fileupload";
// import { router as RealmImporterRouter } from './routes/realmImporter'
import { PORT } from "./config/constants";
import CharacterRouter from "./routes/characters";
import LoginRouter from "./routes/login";
import { connect } from "./database/database";

connect();

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

app.use("/api", CharacterRouter);
app.use("/login", LoginRouter);
