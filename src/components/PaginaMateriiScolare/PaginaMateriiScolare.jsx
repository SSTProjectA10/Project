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
    numeMaterie,
    profesor,
    clasa,
    salaDeClasa,
    oreSaptamana
  ) {
    return {
      id,
      numeMaterie,
      profesor,
      clasa,
      salaDeClasa,
      oreSaptamana,
    };
  }
  
  //DATELE DIN TABEL, AICI TREBUIE ADUSE DIN BAZA DE DATE
  const rows = [
    createData(1, "Matematică", "Popovici Ana", "Clasa a IX-a A", "Sala 101", 5),
    createData(2, "Limba română", "Ivanov Maria", "Clasa a X-a B", "Sala 102", 4),
    createData(3, "Fizică", "Dragoș Alexandru", "Clasa a XI-a C", "Sala 103", 3),
    createData(4, "Chimie", "Georgescu Ioana", "Clasa a XII-a D", "Sala 104", 2),
    createData(5, "Informatică", "Constantin Andrei", "Clasa a IX-a A", "Sala 105", 4),
    createData(6, "Biologie", "Stancu Elena", "Clasa a X-a B", "Sala 106", 3),
    createData(7, "Geografie", "Dumitru Mihai", "Clasa a XI-a C", "Sala 107", 2),
    createData(8, "Istorie", "Popescu Ana-Maria", "Clasa a XII-a D", "Sala 108", 3),
    createData(9, "Educație fizică", "Mihailov George", "Clasa a IX-a A", "Sala 109", 2),
    createData(10, "Arte plastice", "Dobrescu Ioana", "Clasa a X-a B", "Sala 110", 1)
  ];
  
  
  function PaginaMateriiScolare() {
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
    const [numeMaterie, setNumeMaterie] = useState("");
    const [profesor, setProfesor] = useState("");
    const [clasa, setClasa] = useState("");
    const [salaDeClasa, setSalaDeClasa] = useState("");
    const [oreSaptamana, setOreSaptamana] = useState(0);
  
    //STARI FOLOSITE PT A ARATA MESAJUL DE EROARE IN FRONTEND (ACELA CA DATELE NU SUNT INTRODUSE OK)
    const [idCautatModificare, SetIdCautatModificare] = useState(null);
    const [idCautatStergere, SetIdCautatStergere] = useState(null);
    const [dateAdaugareComplete, setDateAdaugareComplete] = useState(true);
    const [dateModificareValidareComplete, setDateCompletareValidareComplete] =
      useState(true);
    const [dateModificareComplete, setDateModificareComplete] = useState(true);
    const [dateStergereComplete, setDateStergereComplete] = useState(true);
  
    const adaugareMaterie = () => {
      let ok = true;
      if (
        numeMaterie === "" ||
        profesor === "" ||
        clasa === "" ||
        salaDeClasa === "" ||
        oreSaptamana === 0
      )
        ok = false;
      if (ok) {
        const elev = {
          numeMaterie: numeMaterie,
          profesor: profesor,
          clasa: clasa,
          salaDeClasa: salaDeClasa,
          oreSaptamana: oreSaptamana,
        };
        //AICI TREBUIE TRIMISE DATELE CATRE BACKEND
        handleCloseAdaugare();
        setDateAdaugareComplete(true);
      } else {
        setDateAdaugareComplete(false);
      }
    };
  
    const modificareMaterie = () => {
      let ok = true;
      if (
        numeMaterie === "" ||
        profesor === "" ||
        clasa === "" ||
        salaDeClasa === "" ||
        oreSaptamana === 0
      )
        ok = false;
      if (ok) {
        const elev = {
          numeMaterie: numeMaterie,
          profesor: profesor,
          clasa: clasa,
          salaDeClasa: salaDeClasa,
          oreSaptamana: oreSaptamana,
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
      setNumeMaterie("");
      setProfesor("");
      setClasa("");
      setSalaDeClasa("");
      setOreSaptamana(0);
  
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
            MATERII ȘCOLARE
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ height: 500, overflow: "auto" }}
          >
            <Table sx={{ minWidth: 1200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID materie</TableCell>
                  <TableCell align="right">Nume materie</TableCell>
                  <TableCell align="right">Profesor</TableCell>
                  <TableCell align="right">Clasă</TableCell>
                  <TableCell align="right">Sală de clasă</TableCell>
                  <TableCell align="right">Ore săptămână</TableCell>
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
                    <TableCell align="right">{row.numeMaterie}</TableCell>
                    <TableCell align="right">{row.profesor}</TableCell>
                    <TableCell align="right">{row.clasa}</TableCell>
                    <TableCell align="right">{row.salaDeClasa}</TableCell>
                    <TableCell align="right">{row.oreSaptamana}</TableCell>
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
                Adăugare informații materie
              </Typography>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={3}
              >
                <TextField
                  size="small"
                  label={"Nume materie"}
                  sx={{ width: "40ch" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => setNumeMaterie(event.target.value)}
                />
                <TextField
                  size="small"
                  label={"Profesor"}
                  sx={{ width: "40ch" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => setProfesor(event.target.value)}
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
                  label={"Sală de clasă"}
                  sx={{ width: "40ch" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => setSalaDeClasa(event.target.value)}
                />
                <TextField
                  size="small"
                  label={"Ore pe săptămână"}
                  sx={{ width: "40ch" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="number"
                  onChange={(event) => setOreSaptamana(event.target.value)}
                />
              </Stack>
              <Stack mt={3} flexDirection={"row"} justifyContent={"center"}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ width: "40ch" }}
                  onClick={() => adaugareMaterie()}
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
                Modificare informații materie
              </Typography>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={3}
              >
                <TextField
                  size="small"
                  label={"ID materie căutată"}
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
                Modificare informații materie cu ID: {idCautatModificare}
              </Typography>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={3}
              >
                <TextField
                  size="small"
                  label={"Nume materie"}
                  sx={{ width: "40ch" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => setNumeMaterie(event.target.value)}
                />
                <TextField
                  size="small"
                  label={"Profesor"}
                  sx={{ width: "40ch" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => setProfesor(event.target.value)}
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
                  label={"Sală de clasă"}
                  sx={{ width: "40ch" }}
                  onChange={(event) => setSalaDeClasa(event.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  size="small"
                  label={"Ore săptămână"}
                  sx={{ width: "40ch" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="number"
                  onChange={(event) => setOreSaptamana(event.target.value)}
                />
              </Stack>
              <Stack mt={3} flexDirection={"row"} justifyContent={"center"}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ width: "40ch" }}
                  onClick={modificareMaterie}
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
                  label={"ID materie căutată"}
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
  
  export default PaginaMateriiScolare;
  