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
  clasa,
  email,
  mediaGenerala
) {
  return { id, nume, prenume, dataNasterii, clasa, email, mediaGenerala };
}

//DATELE DIN TABEL, AICI TREBUIE ADUSE DIN BAZA DE DATE
const rows = [
  createData(
    1,
    "Popescu",
    "Ion",
    "15-04-2005",
    "Clasa 9A",
    "popescu.ion@example.com",
    8.5
  ),
  createData(
    2,
    "Ionescu",
    "Maria",
    "20-07-2006",
    "Clasa 10B",
    "ionescu.maria@example.com",
    9.2
  ),
  createData(
    3,
    "Dragomir",
    "Alexandru",
    "05-12-2004",
    "Clasa 11C",
    "dragomir.alex@example.com",
    7.8
  ),
  createData(
    4,
    "Georgescu",
    "Ana",
    "10-03-2005",
    "Clasa 12D",
    "georgescu.ana@example.com",
    8.9
  ),
  createData(
    5,
    "Constantinescu",
    "Andrei",
    "25-06-2006",
    "Clasa 9A",
    "const.andrei@example.com",
    7.4
  ),
  createData(
    6,
    "Stanciu",
    "Elena",
    "30-09-2004",
    "Clasa 10B",
    "stanciu.elena@example.com",
    9.6
  ),
  createData(
    7,
    "Dumitrescu",
    "Mihai",
    "12-08-2005",
    "Clasa 11C",
    "dumitrescu.mihai@example.com",
    6.8
  ),
  createData(
    8,
    "Popa",
    "Ana-Maria",
    "18-05-2006",
    "Clasa 12D",
    "popa.ana@example.com",
    8.3
  ),
  createData(
    9,
    "Mihai",
    "George",
    "03-10-2004",
    "Clasa 9A",
    "mihai.george@example.com",
    7.1
  ),
  createData(
    10,
    "Dobre",
    "Ioana",
    "28-06-2005",
    "Clasa 10B",
    "dobre.ioana@example.com",
    9.8
  ),
  createData(
    11,
    "Gheorghe",
    "Andreea",
    "14-01-2006",
    "Clasa 11C",
    "gheorghe.andreea@example.com",
    8.7
  ),
  createData(
    12,
    "Stan",
    "Daniel",
    "22-04-2004",
    "Clasa 12D",
    "stan.daniel@example.com",
    7.9
  ),
  createData(
    13,
    "Cristea",
    "Raluca",
    "07-11-2005",
    "Clasa 9A",
    "cristea.raluca@example.com",
    9.4
  ),
  createData(
    14,
    "Iancu",
    "Cristian",
    "19-03-2006",
    "Clasa 10B",
    "iancu.cristian@example.com",
    6.5
  ),
  createData(
    15,
    "Pop",
    "Alina",
    "26-07-2004",
    "Clasa 11C",
    "pop.alina@example.com",
    8.1
  ),
  createData(
    16,
    "Florescu",
    "Radu",
    "11-12-2005",
    "Clasa 12D",
    "florescu.radu@example.com",
    7.6
  ),
  createData(
    17,
    "Munteanu",
    "Diana",
    "05-02-2006",
    "Clasa 9A",
    "munteanu.diana@example.com",
    9.1
  ),
  createData(
    18,
    "Dumitru",
    "Catalin",
    "18-09-2004",
    "Clasa 10B",
    "dumitru.catalin@example.com",
    8.2
  ),
  createData(
    19,
    "Balan",
    "Simona",
    "30-05-2005",
    "Clasa 11C",
    "balan.simona@example.com",
    7.7
  ),
  createData(
    20,
    "Ivan",
    "Victor",
    "17-11-2006",
    "Clasa 12D",
    "ivan.victor@example.com",
    9.3
  ),
];

function PaginaElevi() {
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
  const [clasa, setClasa] = useState("");
  const [email, setEmail] = useState("");
  const [mediaGenerala, setMediaGenerala] = useState(0);

  //STARI FOLOSITE PT A ARATA MESAJUL DE EROARE IN FRONTEND (ACELA CA DATELE NU SUNT INTRODUSE OK)
  const [idCautatModificare, SetIdCautatModificare] = useState(null);
  const [idCautatStergere, SetIdCautatStergere] = useState(null);
  const [dateAdaugareComplete, setDateAdaugareComplete] = useState(true);
  const [dateModificareValidareComplete, setDateCompletareValidareComplete] =
    useState(true);
  const [dateModificareComplete, setDateModificareComplete] = useState(true);
  const [dateStergereComplete, setDateStergereComplete] = useState(true);

  const adaugareElev = () => {
    let ok = true;
    if (
      nume === "" ||
      prenume === "" ||
      dataNasterii === "" ||
      clasa === "" ||
      email === "" ||
      mediaGenerala === 0
    )
      ok = false;
    if (ok) {
      const elev = {
        nume: nume,
        prenume: prenume,
        dataNasterii: dataNasterii,
        clasa: clasa,
        email: email,
        mediaGenerala: mediaGenerala,
      };
      //AICI TREBUIE TRIMISE DATELE CATRE BACKEND
      handleCloseAdaugare();
      setDateAdaugareComplete(true);
    } else {
      setDateAdaugareComplete(false);
    }
  };

  const modificareElev = () => {
    let ok = true;
    if (
      nume === "" ||
      prenume === "" ||
      dataNasterii === "" ||
      clasa === "" ||
      email === "" ||
      mediaGenerala === 0
    )
      ok = false;
    if (ok) {
      const elev = {
        nume: nume,
        prenume: prenume,
        dataNasterii: dataNasterii,
        clasa: clasa,
        email: email,
        mediaGenerala: mediaGenerala,
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
    setClasa("");
    setEmail("");
    setMediaGenerala(0);

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
          ELEVI
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ height: 500, overflow: "auto" }}
        >
          <Table sx={{ minWidth: 1200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID elev</TableCell>
                <TableCell align="right">Nume</TableCell>
                <TableCell align="right">Prenume</TableCell>
                <TableCell align="right">Data nașterii</TableCell>
                <TableCell align="right">Clasă</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Media generală</TableCell>
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
                  <TableCell align="right">{row.clasa}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.mediaGenerala}</TableCell>
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
              Adăugare informații elev
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
                label={"Clasă"}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setClasa(event.target.value)}
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
                label={"Media generală"}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                type="number"
                onChange={(event) => setMediaGenerala(event.target.value)}
              />
            </Stack>
            <Stack mt={3} flexDirection={"row"} justifyContent={"center"}>
              <Button
                size="small"
                variant="contained"
                sx={{ width: "40ch" }}
                onClick={() => adaugareElev()}
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
              Modificare informații elev
            </Typography>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={3}
            >
              <TextField
                size="small"
                label={"ID elev căutat"}
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
              Modificare informații elev cu ID: {idCautatModificare}
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
                label={"Clasă"}
                onChange={(event) => setClasa(event.target.value)}
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
                label={"Media generală"}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                type="number"
                onChange={(event) => setMediaGenerala(event.target.value)}
              />
            </Stack>
            <Stack mt={3} flexDirection={"row"} justifyContent={"center"}>
              <Button
                size="small"
                variant="contained"
                sx={{ width: "40ch" }}
                onClick={modificareElev}
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
              Ștergere informații elev
            </Typography>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={3}
            >
              <TextField
                size="small"
                label={"ID elev căutat"}
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

export default PaginaElevi;
