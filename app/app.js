// app.js
import express from "express";
import cors from "cors";
import pkg from "body-parser";
import router from "./routes/index.js";
import { connect } from "./config/mongodb.js";
import { collection } from '../app/models/userModels.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';



const { json } = pkg;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Configurar CORS
app.use(cors());

app.use(json());

// Usar rutas definidas en el archivo de rutas
app.use("/api", router);

// Conectar a la base de datos
connect().catch(console.dir);

export default app;
