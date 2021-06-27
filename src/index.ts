import express from "express";
import { Request, Response, Router } from "express";
import fileUpload from "express-fileupload";
// import { router as RealmImporterRouter } from './routes/realmImporter'
import { PORT } from "./config/constants";
import CharacterRouter from "./routes/index";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  fileUpload({
    createParentPath: true,
  })
);
// app.use('/import', RealmImporterRouter)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`server is listening on port ${PORT}`);
});

app.use("/api", CharacterRouter);
