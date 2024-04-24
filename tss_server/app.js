const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { Elev } = require("./db");


const PORT = 4000;

let ID = 21;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

//REQUESTURI
// app.get("/", (req, res) => {
//   res.send("Aaaa");
// });

app.get("/resetareBD", (req, res) => {
  Elev.drop();
  const { elevi } = require("./exampleElevs");
  Elev.insertMany(elevi);
  ID = 21;
  res.send("Am resetat baza de date.");
});

app.get("/", async (req, res) => {
  const doc = await Elev.find({}).toArray();
  res.send(doc)
});

app.get("/:id", async (req, res) =>{
  let id = Number(req.params.id);
  const document = await Elev.findOne({ID:id}); 
  res.send(document);
})

app.post("/", async (req, res) => {
  let elev = req.body;
  elev.ID = ID
  ID ++;
  const doc = await Elev.insertOne(elev);
  res.send(doc);
});

app.put("/:idCautatModificare", async (req, res) => {
  let id = Number(req.params.idCautatModificare);
  let filter = {ID:id}
  let update = {$set: req.body}
  let doc = await Elev.findOneAndUpdate(filter, update);
  res.send(doc);
});

app.delete("/:idCautat", async(req, res) => {
  let id = Number(req.params.idCautat)
  const filter = {ID: id};
  let doc = await Elev.findOneAndDelete(filter)
  res.send(doc)
});

app.listen(4000, (req, res) => {
  console.log(`Serverul a pornit la PORT: ${PORT}.`);
});
