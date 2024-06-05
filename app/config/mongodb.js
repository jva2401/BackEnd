// config/database.js
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://julianvillaalcaraz:7XAQP7sx2qUH0hLq@cluster0.ku5avoo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error(error);
  }
}

export { client, connect };
