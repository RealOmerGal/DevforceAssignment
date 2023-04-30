import cors from "cors"
import express, { json } from "express"
import "reflect-metadata"
import { AppDataSource } from "./datasource";
import { router } from "./router";
import { seedServerTypes } from "./seed";
import dotenv from 'dotenv'
import path from "path";
dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "../ui")));
app.use(cors());
app.use(json());
AppDataSource.initialize().then(() => {
    console.log("DB has been initialized");
    seedServerTypes();
}).catch((err) => {
    console.error(err);
})

app.use("/api", router);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Listening on port", PORT)
})
