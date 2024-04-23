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
import React, { useEffect } from "react";

import { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import axios from "axios";

function PaginaElevi() {
  const url = "http://localhost:4000/"
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
  const [idCautatModificare, SetIdCautatModificare] = useState(1);
  const [idCautatStergere, SetIdCautatStergere] = useState(null);
  const [dateAdaugareComplete, setDateAdaugareComplete] = useState(true);
  const [dateModificareValidareComplete, setDateCompletareValidareComplete] =
    useState(true);
  const [dateModificareComplete, setDateModificareComplete] = useState(true);
  const [dateStergereComplete, setDateStergereComplete] = useState(true);

  const templateElev = {};

  const [elevi, setElevi] = useState([]);
  const [elevCautat, setElevCautat] = useState(templateElev);

  useEffect(() => {
    const urlObtineElevi = "http://localhost:4000/obtineElevi";
    axios
      .get(urlObtineElevi)
      .then((response) => {
        // console.log("Raspunsul de la server: ", response.data);
        const copieElevi = response.data;
        for (var i = 0; i < copieElevi.length - 1; i++)
          for (var j = i + 1; j < copieElevi.length; j++) {
            if (parseInt(copieElevi[i].ID) > parseInt(copieElevi[j].ID)) {
              var aux = copieElevi[i];
              copieElevi[i] = copieElevi[j];
              copieElevi[j] = aux;
              
            }
          }
        setElevi(copieElevi);
      })
      .catch((error) => {
        console.log("Eroare in timpul incarcarii elevilor: ", error);
      });
  }, []);

  useEffect(() => {
    elevi.forEach((elev) => {
      if (idCautatModificare == elev.ID) {
        setElevCautat(elev);
        setNume(elev.nume);
        setPrenume(elev.prenume);
        setClasa(elev.clasa);
        setDataNasterii(elev.dataNasterii);
        setEmail(elev.email);
        setMediaGenerala(elev.mediaGenerala);
      }
    });
  }, [elevCautat, idCautatModificare]);

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
      const pachet = { elev };
      //AICI TREBUIE TRIMISE DATELE CATRE BACKEND
      const urlAdaugareElev = "http://localhost:4000/adaugaElev";
      axios
        .post(urlAdaugareElev, pachet)
        .then((response) => {
          console.log("Raspuns de la server: ", response.data);
        })
        .catch((error) => {
          console.log("Eroare în timpul adăugării elevului.", error);
        });

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
      const pachet = { elev, idCautatModificare };
      //AICI TREBUIE TRIMISE DATELE CATRE BACKEND
      const urlModificareElev = "http://localhost:4000/modificaElev";
      axios
        .put(urlModificareElev, pachet)
        .then((response) => {
          console.log("Raspuns de la server: ", response.data);
        })
        .catch((error) => {
          console.log("Eroare în timpul modificarii elevului.", error);
        });

      //AICI TREBUIE TRIMISE DATELE CATRE BACKEND
      handleCloseModificare();
      setDateModificareComplete(true);
    } else {
      setDateModificareComplete(false);
    }
  };

  const verificareIDcautat = (idCautat) => {
    let raspunsVerificare = false;
    if (idCautat === "") {
      setDateCompletareValidareComplete(false);
    } else {
      elevi.forEach((element) => {
        if (element.ID == idCautat) {
          {
            raspunsVerificare = true;
          }
        }
      });
      if (!raspunsVerificare) setDateCompletareValidareComplete(false);
    }

    if (raspunsVerificare) {
      setDateCompletareValidareComplete(true);
      // SetIdCautatModificare(null);
      handleCloseValidareModificare();
      handleOpenModificare();
    } else {
      console.log("Id ul introdus nu exista.");
    }
  };

  const verificareIDstergere = (idCautat) => {
    axios.delete(`http://localhost:4000/${idCautat}`).then().catch((err)=>{console.log(err)});
    console.log(`http://localhost:4000/${idCautat}`)
    SetIdCautatStergere(null);
    handleCloseValidareStergere();
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
              {elevi.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.ID}
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
                defaultValue={elevCautat.nume}
                onChange={(event) => setNume(event.target.value)}
              />
              <TextField
                size="small"
                label={"Prenume"}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={elevCautat.prenume}
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
                defaultValue={elevCautat.dataNasterii}
              />
              <TextField
                size="small"
                label={"Clasă"}
                onChange={(event) => setClasa(event.target.value)}
                sx={{ width: "40ch" }}
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={elevCautat.clasa}
              />
              <TextField
                size="small"
                label={"Email"}
                sx={{ width: "40ch" }}
                onChange={(event) => setEmail(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={elevCautat.email}
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
                defaultValue={elevCautat.mediaGenerala}
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
