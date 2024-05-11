const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { Elev } = require("./db");
require('dotenv').config();

let ID = 21;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO: Cu GPT partial, dar sa mor daca mai stiu ce

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000"); 
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); 
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next(); 
  }
});

// Amintire, primul lucru care a mers din proiect
//REQUESTURI
// app.get("/", (req, res) => {
//   res.send("Aaaa");
// });

// TODO: Astea sunt facute de mine functiile de cand le-am curatat

app.get("/resetareBD", (req, res) => {
  Elev.drop();
  const { elevi } = require("./exampleElevs");
  Elev.insertMany(elevi);
  ID = 21;
  res.send("Am resetat baza de date.");
});

app.get("/", async (req, res) => {
  const doc = await Elev.find({}).toArray();
  res.send(doc);
});

app.get("/:id", async (req, res) =>{
  let id = Number(req.params.id);
  const document = await Elev.findOne({ID:id}); 
  if (document === null)
    return res.status(400).json("Not found");
  res.send(document);
})

app.post("/", async (req, res) => {
  let elev = req.body;
  elev.ID = ID
  ID ++;
  if (!elev.nume || !elev.prenume || !elev.dataNasterii || !elev.clasa || !elev.email || !elev.mediaGenerala || !elev.ID)    
    return res.status(400).json("Empty field");
  if (typeof(elev.ID) != "number" )
    return res.status(400).json("Wrong input for number fields");
  const doc = await Elev.insertOne(elev);
  res.send(doc);
});

app.put("/:idCautatModificare", async (req, res) => {
  let id = Number(req.params.idCautatModificare);
  let filter = {ID:id}
  let update = {$set: req.body}
  let doc = await Elev.findOneAndUpdate(filter, update);
  if (doc === null)
    return res.status(400).json("Not found");
  if (typeof(doc.ID) != "number")
    return res.status(400).json("Wrong input for number fields");
  res.send(doc);
});

app.delete("/:idCautat", async(req, res) => {
  let id = Number(req.params.idCautat);
  const filter = {ID: id};
  let doc = await Elev.findOneAndDelete(filter);
  res.send(doc);
});

let PORT = 4000;
app.listen(PORT, (req, res) => {
  console.log(`Serverul a pornit la PORT: ${PORT}.`);
});
