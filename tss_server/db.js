const mongoose = require("mongoose");

const dbURL = "mongodb+srv://tss:IonutRadu@proiecttss.wsltsj2.mongodb.net/?retryWrites=true&w=majority&appName=ProiectTSS";

mongoose.connect(dbURL);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Eroare la conexiunea către MongoDB:"));
db.once("open", () => {
  console.log("Conectat cu succes la baza de date.");
});

const Schema = mongoose.Schema;
const elevSchema = new Schema({
  nume: String,
  prenume: String,
  dataNasterii: String,
  clasa: String,
  email: String,
  mediaGenerala: Number,
  ID: Number,
}, { versionKey: false, collection: "elevi" });

  //versionKey - iti apare nush ce versiune in care s a facut modificarea
  //collection - numele colectiei pt care fac schema

const Colectie = mongoose.connection.collection("elevi");

const Elev = mongoose.model("Elev", elevSchema);

module.exports = { db, Colectie, Elev };
