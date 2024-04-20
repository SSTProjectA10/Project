const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { db, Colectie, Elev } = require("./db");


const PORT = 4000;

let ID = 21;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000"); // Specifică domeniul tău de origine
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Specifică metodele HTTP permise
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Specifică antetele permise
  if (req.method === "OPTIONS") {
    res.sendStatus(200); // Răspunde cu OK pentru cererile preflight (OPTIONS)
  } else {
    next(); // Treci la următorul middleware
  }
});

//REQUESTURI
app.get("/", (req, res) => {
  res.send("Aaaa");
});

app.get("/resetareBD", (req, res) => {
  Colectie.drop((err, rezultat) => {
    if (err) {
      console.error("Eroare la ștergerea colecției elevi:", err);
    } else {
      if (rezultat) {
        console.log("Colecția a fost ștearsă cu succes:", rezultat);
      } else {
        console.log("Colecția nu există în baza de date.");
      }
    }
  });

  // AICI INTRODUC DATELE ALEA DEFAULT
  const { elevi } = require("./exampleElevs")

  elevi.forEach(async (elev) => {
    try {
      const nouElev = new Elev(elev);
      const rezultat = await nouElev.save();
      console.log("Elevul a fost introdus cu succes:", rezultat);
    } catch (err) {
      console.error("Eroare la introducerea elevului:", err);
    }
  });

  ID = 21;
  res.send("Am resetat baza de date.");
});

app.get("/obtineElevi", (req, res) => {

  async function importData() {
    try {
      const documents = await Elev.find({}); 
      res.send(documents);
    } catch (error) {
      console.error("Eroare:", error);
    }
  }
  importData();
});

app.post("/adaugaElev", (req, res) => {
  let elev = [];
  elev.push(req.body.elev);
  elev[0].ID = ID;
  ID = ID+1;

  elev.forEach(async (elev) => {
    try {
      const nouElev = new Elev(elev);
      const rezultat = await nouElev.save();
      console.log("Elevul a fost introdus cu succes:", rezultat);
    } catch (err) {
      console.error("Eroare la introducerea elevului:", err);
    }
  });

  res.send("Cererea POST a fost procesată cu succes!");
});

app.post("/modificaElev", (req, res) => {
  let elev = [];
  elev.push(req.body.elev);
  elev[0].ID = req.body.idCautatModificare;

  try {
    const rezultat = Elev.deleteOne({ ID: elev.ID });
  }
  catch (err) {
    console.error("Eroare la stergerea inregistrarii modificare elev:", err);
  }

  elev.forEach(async (elev) => {
    try {
      const nouElev = new Elev(elev);
      const rezultat = await nouElev.save();
      console.log("Elevul a fost introdus cu succes:", rezultat);
    } catch (err) {
      console.error("Eroare la introducerea elevului:", err);
    }
  });

  res.send("Cererea POST a fost procesată cu succes!");
});

app.listen(4000, (req, res) => {
  console.log(`Serverul a pornit la PORT: ${PORT}.`);
});
