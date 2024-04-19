const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = 4000;

let ID = 21;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Specifică domeniul tău de origine
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

//CONEXIUNEA LA BAZA DE DATE
const dbURL =
  "mongodb+srv://tss:IonutRadu@proiecttss.wsltsj2.mongodb.net/?retryWrites=true&w=majority&appName=ProiectTSS";

mongoose.connect(dbURL);
db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "Eroare la conexiunea către MongoDB:")
);
db.once("open", () => {
  console.log("Conectat cu succes la baza de date.");
});

//REQUESTURI
app.get("/", (req, res) => {
  res.send("Aaaa");
});

app.get("/resetareBD", (req, res) => {
  const Colectie = mongoose.connection.collection("elevi");
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

  const Schema = mongoose.Schema;
  const elevSchema = new Schema(
    {
      nume: String,
      prenume: String,
      dataNasterii: String,
      clasa: String,
      email: String,
      mediaGenerala: Number,
      ID: Number,
    },
    { versionKey: false, collection: "elevi" }
  );

  //versionKey - iti apare nush ce versiune in care s a facut modificarea
  //collection - numele colectiei pt care fac schema

  const Elev = mongoose.model("Elev", elevSchema);

  // AICI INTRODUC DATELE ALEA DEFAULT

  const elevi = [
    {
      nume: "Popescu",
      prenume: "Ion",
      dataNasterii: "2004-05-15",
      clasa: "12A",
      email: "ion.popescu@example.com",
      mediaGenerala: 9.5,
      ID: 1,
    },
    {
      nume: "Ionescu",
      prenume: "Ana",
      dataNasterii: "2005-02-28",
      clasa: "11B",
      email: "ana.ionescu@example.com",
      mediaGenerala: 9.8,
      ID: 2,
    },
    {
      nume: "Constantinescu",
      prenume: "Mihai",
      dataNasterii: "2004-09-10",
      clasa: "10C",
      email: "mihai.constantinescu@example.com",
      mediaGenerala: 9.2,
      ID: 3,
    },
    {
      nume: "Georgescu",
      prenume: "Maria",
      dataNasterii: "2003-11-20",
      clasa: "12B",
      email: "maria.georgescu@example.com",
      mediaGenerala: 9.6,
      ID: 4, 
    },
    {
      nume: "Popa",
      prenume: "Andrei",
      dataNasterii: "2004-07-18",
      clasa: "11A",
      email: "andrei.popa@example.com",
      mediaGenerala: 9.4,
      ID: 5,
    },
    {
      nume: "Dumitrescu",
      prenume: "Elena",
      dataNasterii: "2005-01-03",
      clasa: "10B",
      email: "elena.dumitrescu@example.com",
      mediaGenerala: 9.7,
      ID: 6,
    },
    {
      nume: "Radulescu",
      prenume: "George",
      dataNasterii: "2004-08-25",
      clasa: "12C",
      email: "george.radulescu@example.com",
      mediaGenerala: 9.3,
      ID: 7,
    },
    {
      nume: "Popescu",
      prenume: "Ioana",
      dataNasterii: "2004-04-12",
      clasa: "11A",
      email: "ioana.popescu@example.com",
      mediaGenerala: 9.8,
      ID: 8, 
    },
    {
      nume: "Stoica",
      prenume: "Andreea",
      dataNasterii: "2005-07-07",
      clasa: "10C",
      email: "andreea.stoica@example.com",
      mediaGenerala: 9.6,
      ID: 9,
    },
    {
      nume: "Gheorghe",
      prenume: "Alexandru",
      dataNasterii: "2004-10-30",
      clasa: "12A",
      email: "alexandru.gheorghe@example.com",
      mediaGenerala: 9.5,
      ID: 10,
    },
    {
      nume: "Dobre",
      prenume: "Ana-Maria",
      dataNasterii: "2003-12-05",
      clasa: "11B",
      email: "ana-maria.dobre@example.com",
      mediaGenerala: 9.9,
      ID: 11,
    },
    {
      nume: "Cristea",
      prenume: "Cristian",
      dataNasterii: "2004-02-18",
      clasa: "10C",
      email: "cristian.cristea@example.com",
      mediaGenerala: 9.7,
      ID: 12, 
    },
    {
      nume: "Gheorghiu",
      prenume: "Alina",
      dataNasterii: "2004-06-23",
      clasa: "12B",
      email: "alina.gheorghiu@example.com",
      mediaGenerala: 9.2,
      ID: 13,
    },
    {
      nume: "Iancu",
      prenume: "Mihai",
      dataNasterii: "2005-03-11",
      clasa: "11A",
      email: "mihai.iancu@example.com",
      mediaGenerala: 9.4,
      ID: 14, 
    },
    {
      nume: "Florescu",
      prenume: "Elena",
      dataNasterii: "2004-09-29",
      clasa: "10B",
      email: "elena.florescu@example.com",
      mediaGenerala: 9.8,
      ID: 15, 
    },
    {
      nume: "Vasilescu",
      prenume: "Andrei",
      dataNasterii: "2003-11-16",
      clasa: "12C",
      email: "andrei.vasilescu@example.com",
      mediaGenerala: 9.6,
      ID: 16, 
    },
    {
      nume: "Dinu",
      prenume: "Cristina",
      dataNasterii: "2004-07-25",
      clasa: "11A",
      email: "cristina.dinu@example.com",
      mediaGenerala: 9.3,
      ID: 17,
    },
    {
      nume: "Stancu",
      prenume: "Alexandru",
      dataNasterii: "2005-01-14",
      clasa: "10C",
      email: "alexandru.stancu@example.com",
      mediaGenerala: 9.7,
      ID: 18, 
    },
    {
      nume: "Ion",
      prenume: "Diana",
      dataNasterii: "2004-08-07",
      clasa: "12B",
      email: "diana.ion@example.com",
      mediaGenerala: 9.5,
      ID: 19, 
    },
    {
      nume: "Stan",
      prenume: "Andrei",
      dataNasterii: "2004-03-22",
      clasa: "11B",
      email: "andrei.stan@example.com",
      mediaGenerala: 9.9,
      ID: 20,
    },
  ];

  elevi.forEach(async (elev) => {
    try {
      const nouElev = new Elev(elev);
      const rezultat = await nouElev.save();
      console.log("Elevul a fost introdus cu succes:", rezultat);
    } catch (err) {
      console.error("Eroare la introducerea elevului:", err);
    }
  });

  delete mongoose.connection.models["Elev"];

  ID = 21;
  res.send("Am resetat baza de date.");
});

app.get("/obtineElevi", (req, res) => {
  const Schema = mongoose.Schema;
  const elevSchema = new Schema(
    {
      nume: String,
      prenume: String,
      dataNasterii: String,
      clasa: String,
      email: String,
      mediaGenerala: Number,
      ID: Number,
    },
    { versionKey: false, collection: "elevi" }
  );

  const Elev = mongoose.model("Elev", elevSchema);

  async function importData() {
    try {
      const documents = await Elev.find({}); // Găsește toate documentele din colecție

      // console.log('Documente găsite:', documents);
      res.send(documents);
    } catch (error) {
      console.error("Eroare:", error);
    }
  }
  importData();
  delete mongoose.connection.models["Elev"];
});

app.post("/adaugaElev", (req, res) => {
  let elev = [];
  elev.push(req.body.elev);
  elev[0].ID = ID;
  ID = ID+1;

  const Schema = mongoose.Schema;
  const elevSchema = new Schema(
    {
      nume: String,
      prenume: String,
      dataNasterii: String,
      clasa: String,
      email: String,
      mediaGenerala: Number,
      ID: Number,
    },
    { versionKey: false, collection: "elevi" }
  );

  const Elev = mongoose.model("Elev", elevSchema);

  elev.forEach(async (elev) => {
    try {
      const nouElev = new Elev(elev);
      const rezultat = await nouElev.save();
      console.log("Elevul a fost introdus cu succes:", rezultat);
    } catch (err) {
      console.error("Eroare la introducerea elevului:", err);
    }
  });

  delete mongoose.connection.models["Elev"];

  res.send("Cererea POST a fost procesată cu succes!");
});

app.post("/modificaElev", (req, res) => {
  let elev = [];
  elev.push(req.body.elev);
  elev[0].ID = req.body.idCautatModificare;

  const Schema = mongoose.Schema;
  const elevSchema = new Schema(
    {
      nume: String,
      prenume: String,
      dataNasterii: String,
      clasa: String,
      email: String,
      mediaGenerala: Number,
      ID: Number,
    },
    { versionKey: false, collection: "elevi" }
  );

  const Elev = mongoose.model("Elev", elevSchema);

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

  delete mongoose.connection.models["Elev"];

  res.send("Cererea POST a fost procesată cu succes!");
});

app.listen(4000, (req, res) => {
  console.log(`Serverul a pornit la PORT: ${PORT}.`);
});
