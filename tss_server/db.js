const { MongoClient } = require("mongodb");

const dbURL = "mongodb+srv://tss:IonutRadu@proiecttss.wsltsj2.mongodb.net/?retryWrites=true&w=majority&appName=ProiectTSS";

const client = new MongoClient(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();

const db = client.db(); // Get the default database

const Elev = db.collection("Elev"); // Get the elevi collection

module.exports = { Elev };
