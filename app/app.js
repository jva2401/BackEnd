// app.js
import express from "express";
import cors from "cors";
import pkg from "body-parser";
import router from "./routes/index.js";
import { connect } from "./config/mongodb.js";
import { collection } from '../app/models/userModels.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

async function rehashPasswords() {
  const users = await collection.find({}).toArray();

  for (const user of users) {
    if (typeof user.password === 'string' && !user.password.startsWith('$2b$')) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await collection.updateOne(
        { _id: user._id },
        { $set: { password: hashedPassword } }
      );
      console.log(`Updated password for user: ${user.user}`);
    }
  }
}

rehashPasswords().catch(console.dir);

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
