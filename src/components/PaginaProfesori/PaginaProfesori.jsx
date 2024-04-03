import {
  Button,
  Fab,
  Stack,
  Typography,
  Modal,
  Box,
  TextField,
  Alert,
} from "@mui/material";
import React from "react";

import { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//FOLOSIND FUNCTIA ASTA FACEM O INREGISTRARE IN TABEL
function createData(
  id,
  nume,
  prenume,
  dataNasterii,
  materiaPredata,
  email,
  vechimeInvatamant
) {
  return {
    id,
    nume,
    prenume,
    dataNasterii,
    materiaPredata,
    email,
    vechimeInvatamant,
  };
}

//DATELE DIN TABEL, AICI TREBUIE ADUSE DIN BAZA DE DATE
const rows = [
  createData(
    1,
    "Popovici",
    "Ana",
    "1980-05-15",
    "Matematică",
    "popovici.ana@example.com",
    15
  ),
  createData(
    2,
    "Ivanov",
    "Maria",
    "1975-08-20",
    "Limba și literatura română",
    "ivanov.maria@example.com",
    20
  ),
  createData(
    3,
    "Dragoș",
    "Alexandru",
    "1982-12-05",
    "Fizică",
    "dragos.alex@example.com",
    12
  ),
  createData(
    4,
    "Georgescu",
    "Ioana",
    "1978-03-10",
    "Chimie",
    "georgescu.ioana@example.com",
    18
  ),
  createData(
    5,
    "Constantin",
    "Andrei",
    "1985-06-25",
    "Informatică",
    "constantin.andrei@example.com",
    10
  ),
  createData(
    6,
    "Stancu",
    "Elena",
    "1977-09-30",
    "Biologie",
    "stancu.elena@example.com",
    17
  ),
  createData(
    7,
    "Dumitru",
    "Mihai",
    "1984-08-12",
    "Geografie",
    "dumitru.mihai@example.com",
    14
  ),
  createData(
    8,
    "Popescu",
    "Ana-Maria",
    "1979-05-18",
    "Istorie",
    "popescu.ana@example.com",
    19
  ),
  createData(
    9,
    "Mihailov",
    "George",
    "1981-10-03",
    "Educație fizică",
    "mihailov.george@example.com",
    16
  ),
  createData(
    10,
    "Dobrescu",
    "Ioana",
    "1976-06-28",
    "Arte plastice",
    "dobrescu.ioana@example.com",
    22
  ),
  createData(
    11,
    "Andrei",
    "Marius",
    "1983-04-15",
    "Chimie",
    "andrei.marius@example.com",
    13
  ),
  createData(
    12,
    "Popa",
    "Cristina",
    "1977-11-20",
    "Limba engleză",
    "popa.cristina@example.com",
    18
  ),
  createData(
    13,
    "Marinescu",
    "Andreea",
    "1980-08-05",
    "Biologie",
    "marinescu.andreea@example.com",
    16
  ),
  createData(
    14,
    "Radulescu",
    "Vlad",
    "1979-02-10",
    "Matematică",
    "radulescu.vlad@example.com",
    21
  ),
  createData(
    15,
    "Neagu",
    "Mircea",
    "1984-06-25",
    "Fizică",
    "neagu.mircea@example.com",
    10
  ),
  createData(
    16,
    "Gheorghe",
    "Raluca",
    "1976-09-30",
    "Istorie",
    "gheorghe.raluca@example.com",
    19
  ),
  createData(
    17,
    "Stanescu",
    "Bogdan",
    "1981-11-12",
    "Educație muzicală",
    "stanescu.bogdan@example.com",
    15
  ),
  createData(
    18,
    "Popov",
    "Simona",
    "1978-10-03",
    "Informatică",
    "popov.simona@example.com",
    14
  ),
  createData(
    19,
    "Vasilescu",
    "Radu",
    "1983-05-28",
    "Geografie",
    "vasilescu.radu@example.com",
    11
  ),
  createData(
    20,
    "Ionescu",
    "Elena",
    "1975-07-17",
    "Limba și literatura franceză",
    "ionescu.elena@example.com",
    23
  ),
];

function PaginaProfesori() {
  //PT MODALUL DE ADAUGARE DATE ELEV
  const [openAdaugare, setOpenAdaugare] = useState(false);
  const handleOpenAdaugare = () => setOpenAdaugare(true);
  const handleCloseAdaugare = () => {
    setOpenAdaugare(false);
    resetareStari();
  };

  //PT MODALUL DE VALIDARE MODIFICARE(ACOLO UNDE INTRODUCI ID UL SI VEZI DACA EXISTA ELEVUL) - POTI TRECE DE VALIDARE MODIFICARE DOAR DACA INTRODUCI 10 (TEST)
  const [openValidareModificare, setOpenValidareModificare] = useState(false);
  const handleOpenValidareModificare = () => setOpenValidareModificare(true);
  const handleCloseValidareModificare = () => {
    setOpenValidareModificare(false);
    setDateCompletareValidareComplete(true);
  };

  //PT MODALUL DE MODIFICARE DATE ELEV
  const [openModificare, setOpenModificare] = useState(false);
  const handleOpenModificare = () => setOpenModificare(true);
  const handleCloseModificare = () => {
    setOpenModificare(false);
    resetareStari();
  };

  //PT MODALUL DE VALIDARE STERGERE DATE ELEV - POTI TRECE DE STERGERE DACA INTRODUCI 10 (TEST)
  const [openValidareStergere, setOpenValidareStergere] = useState(false);
  const handleOpenValidareStergere = () => setOpenValidareStergere(true);
  const handleCloseValidareStergere = () => {
    setOpenValidareStergere(false);
    resetareStari();
  };

  //DATELE INTRODUSE PT UN ELEV, LE FOLOSESC ATAT LA ADAUGARE CAT SI LA MODIFICARE (ACESTEA SUNT DIFERITE DE STAREA INITIALA DOAR IN TIMPUL ACTIVITATII MODALELOR DE ADAUGARE SI MODIFICARE)
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [dataNasterii, setDataNasterii] = useState("");
  const [materiaPredata, setMateriaPredata] = useState("");
  const [email, setEmail] = useState("");
  const [vechimeInvatamant, setVechimeInvatamant] = useState(0);

  //STARI FOLOSITE PT A ARATA MESAJUL DE EROARE IN FRONTEND (ACELA CA DATELE NU SUNT INTRODUSE OK)
  const [idCautatModificare, SetIdCautatModificare] = useState(null);
  const [idCautatStergere, SetIdCautatStergere] = useState(null);
  const [dateAdaugareComplete, setDateAdaugareComplete] = useState(true);
  const [dateModificareValidareComplete, setDateCompletareValidareComplete] =
    useState(true);
  const [dateModificareComplete, setDateModificareComplete] = useState(true);
  const [dateStergereComplete, setDateStergereComplete] = useState(true);

  const adaugareProfesor = () => {
    let ok = true;
    if (
      nume === "" ||
      prenume === "" ||
      dataNasterii === "" ||
      materiaPredata === "" ||
      email === "" ||
      vechimeInvatamant === 0
    )
      ok = false;
    if (ok) {
      const elev = {
        nume: nume,
        prenume: prenume,
        dataNasterii: dataNasterii,
        materiaPredata: materiaPredata,
        email: email,
        vechimeInvatamant: vechimeInvatamant,
      };
      //AICI TREBUIE TRIMISE DATELE CATRE BACKEND
      handleCloseAdaugare();
      setDateAdaugareComplete(true);
    } else {
      setDateAdaugareComplete(false);
    }
  };

  const modificareProfesor = () => {
    let ok = true;
    if (
      nume === "" ||
      prenume === "" ||
      dataNasterii === "" ||
      materiaPredata === "" ||
      email === "" ||
      vechimeInvatamant === 0
    )
      ok = false;
    if (ok) {
      const elev = {
        nume: nume,
        prenume: prenume,
        dataNasterii: dataNasterii,
        materiaPredata: materiaPredata,
        email: email,
        vechimeInvatamant: vechimeInvatamant,
      };
      //AICI TREBUIE TRIMISE DATELE CATRE BACKEND
      handleCloseModificare();
      setDateModificareComplete(true);
    } else {
      setDateModificareComplete(false);
    }
  };

  const verificareIDcautat = (idCautat) => {
    let raspunsVerificare = true;
    //TREBUIE FACUTA O CERERE CATRE BAZA DE DATE SA VEDEM DACA EXISTA ID-UL CAUTAT
    if (idCautat === "") {
      setDateCompletareValidareComplete(false);
    } else {
      if (idCautat === "10") raspunsVerificare = true;
      else {
        raspunsVerificare = false;
        setDateCompletareValidareComplete(false);
      }

      if (raspunsVerificare) {
        setDateCompletareValidareComplete(true);
        // SetIdCautatModificare(null);
        handleCloseValidareModificare();
        handleOpenModificare();
      } else {
        console.log("Id ul introdus nu exista.");
      }
    }
  };

  const verificareIDstergere = (idCautat) => {
    let raspunsVerificare = true;
    //TREBUIE FACUTA O CERERE CATRE BAZA DE DATE SA VEDEM DACA EXISTA ID-UL CAUTAT
    if (idCautat === "10") {
      setDateStergereComplete(true);
      raspunsVerificare = true;
    } else {
      raspunsVerificare = false;
      setDateStergereComplete(false);
    }

    if (raspunsVerificare) {
      //AICI TREBUIE STEARSA INREGISTRAREA GASITA DIN BAZA DE DATE
      SetIdCautatStergere(null);
      handleCloseValidareStergere();
    } else {
      console.log("ID ul cautat nu exista.");
    }
  };

  const resetareStari = () => {
    setNume("");
    setPrenume("");
    setDataNasterii("");
    setMateriaPredata("");
    setEmail("");
    setVechimeInvatamant(0);

    SetIdCautatModificare(null);
    SetIdCautatStergere(null);

    setDateAdaugareComplete(true);
    setDateModificareComplete(true);
    setDateCompletareValidareComplete(true);
    setDateStergereComplete(true);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Stack
      height={"100vh"}
      direction={"row"}
      justifyContent={"center"}
      bgcolor={"#050836"}
    >
      <Fab
        size="small"
        sx={{ position: "absolute", top: "2rem", left: "4rem" }}
        href="/"
      >
        <ArrowBackIcon />
      </Fab>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={5}
      >
        <Typography fontSize={"20px"} color={"white"} fontWeight={"bold"}>
          PROFESORI
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ height: 500, overflow: "auto" }}
        >
          <Table sx={{ minWidth: 1200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID profesor</TableCell>
                <TableCell align="right">Nume</TableCell>
                <TableCell align="right">Prenume</TableCell>
                <TableCell align="right">Data nașterii</TableCell>
                <TableCell align="right">Materie predata</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Vechime în învățământ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.nume}</TableCell>
                  <TableCell align="right">{row.prenume}</TableCell>
                  <TableCell align="right">{row.dataNasterii}</TableCell>
                  <TableCell align="right">{row.materiaPredata}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.vechimeInvatamant}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction={"row"} spacing={2}>
          <Button
            variant="contained"
            color="success"
            onClick={handleOpenAdaugare}
          >
            Adaugă
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenValidareModificare}
          >
            Modifică
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleOpenValidareStergere()}
          >
            Șterge
          </Button>
        </Stack>
        <Modal
          open={openAdaugare}
          onClose={handleCloseAdaugare}
          id={idCautatModificare}
        >
          <Box sx={style}>
            <Typography
              fontSize={"20px"}
              textAlign={"center"}
              fontWeight={"bold"}
              mb={3}
            >
              Adăugare informații profesor
            </Typography>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={3}
            >
              <TextField
                size="small"
                label={"Nume"}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setNume(event.target.value)}
              />
              <TextField
                size="small"
                label={"Prenume"}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setPrenume(event.target.value)}
              />
              <TextField
                size="small"
                label={"Data nașterii"}
                type="date"
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setDataNasterii(event.target.value)}
              />
              <TextField
                size="small"
                label={"Materia predată"}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setMateriaPredata(event.target.value)}
              />
              <TextField
                size="small"
                label={"Email"}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                size="small"
                label={"Vechime în învățământ"}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                type="number"
                onChange={(event) => setVechimeInvatamant(event.target.value)}
              />
            </Stack>
            <Stack mt={3} flexDirection={"row"} justifyContent={"center"}>
              <Button
                size="small"
                variant="contained"
                sx={{ width: "40ch" }}
                onClick={() => adaugareProfesor()}
              >
                Adaugă
              </Button>
            </Stack>
            {!dateAdaugareComplete && (
              <Stack mt={2} direction={"row"} justifyContent={"center"}>
                <Alert color="error">Datele nu sunt introduse corect.</Alert>
              </Stack>
            )}
          </Box>
        </Modal>
        <Modal
          open={openValidareModificare}
          onClose={handleCloseValidareModificare}
        >
          <Box sx={style}>
            <Typography
              fontSize={"20px"}
              textAlign={"center"}
              fontWeight={"bold"}
              mb={3}
            >
              Modificare informații profesor
            </Typography>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={3}
            >
              <TextField
                size="small"
                label={"ID profesor căutat"}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => SetIdCautatModificare(event.target.value)}
              />
            </Stack>
            <Stack mt={3} flexDirection={"row"} justifyContent={"center"}>
              <Button
                size="small"
                variant="contained"
                sx={{ width: "40ch" }}
                onClick={() => verificareIDcautat(idCautatModificare)}
              >
                Caută
              </Button>
            </Stack>
            {!dateModificareValidareComplete && (
              <Stack mt={2} direction={"row"} justifyContent={"center"}>
                <Alert color="error">Datele nu sunt introduse corect.</Alert>
              </Stack>
            )}
          </Box>
        </Modal>
        <Modal open={openModificare} onClose={handleCloseModificare}>
          <Box sx={style}>
            <Typography
              fontSize={"20px"}
              textAlign={"center"}
              fontWeight={"bold"}
              mb={3}
            >
              Modificare informații profesor cu ID: {idCautatModificare}
            </Typography>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={3}
            >
              <TextField
                size="small"
                label={"Nume"}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setNume(event.target.value)}
              />
              <TextField
                size="small"
                label={"Prenume"}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setPrenume(event.target.value)}
              />
              <TextField
                size="small"
                label={"Data nașterii"}
                type="date"
                onChange={(event) => setDataNasterii(event.target.value)}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                size="small"
                label={"Materie predată"}
                onChange={(event) => setMateriaPredata(event.target.value)}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                size="small"
                label={"Email"}
                sx={{ width: "40ch" }}
                onChange={(event) => setEmail(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                size="small"
                label={"Vechime învățământ"}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                type="number"
                onChange={(event) => setVechimeInvatamant(event.target.value)}
              />
            </Stack>
            <Stack mt={3} flexDirection={"row"} justifyContent={"center"}>
              <Button
                size="small"
                variant="contained"
                sx={{ width: "40ch" }}
                onClick={modificareProfesor}
              >
                Modifică
              </Button>
            </Stack>
            {!dateModificareComplete && (
              <Stack mt={2} direction={"row"} justifyContent={"center"}>
                <Alert color="error">Datele nu sunt introduse corect.</Alert>
              </Stack>
            )}
          </Box>
        </Modal>
        <Modal
          open={openValidareStergere}
          onClose={handleCloseValidareStergere}
        >
          <Box sx={style}>
            <Typography
              fontSize={"20px"}
              textAlign={"center"}
              fontWeight={"bold"}
              mb={3}
            >
              Ștergere informații profesor
            </Typography>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={3}
            >
              <TextField
                size="small"
                label={"ID profesor căutat"}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => SetIdCautatStergere(event.target.value)}
              />
            </Stack>
            <Stack mt={3} flexDirection={"row"} justifyContent={"center"}>
              <Button
                size="small"
                variant="contained"
                sx={{ width: "40ch" }}
                onClick={() => verificareIDstergere(idCautatStergere)}
              >
                Caută
              </Button>
            </Stack>
            {!dateStergereComplete && (
              <Stack mt={2} direction={"row"} justifyContent={"center"}>
                <Alert color="error">Datele nu sunt introduse corect.</Alert>
              </Stack>
            )}
          </Box>
        </Modal>
      </Stack>
    </Stack>
  );
}

export default PaginaProfesori;
