import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";
import mongooseOptions from "./options/mongooseOptions.js";
import router from "./routes/router.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const corsConfig = {
  credentials: true,
  origin: process.env.CLIENT_URL,
  allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"],
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(fileUpload({}));
app.use(cookieParser());
app.use(cors(corsConfig));
app.get("/", (_, res) => res.redirect(process.env.CLIENT_URL));
app.use("/api", router);
app.use(express.static(path.resolve(__dirname, "static")));
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, mongooseOptions);
    app.listen(PORT);
  } catch (e) {
    console.log(e);
  }
};

start();
