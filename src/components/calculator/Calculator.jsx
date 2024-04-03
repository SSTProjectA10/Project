import { Container, Grid, Stack, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import BackspaceIcon from "@mui/icons-material/Backspace";

function Calculator() {
  const [text, setText] = useState("");
  const [numere, setNumere] = useState([]);

  const [numar, setNumar] = useState("");
  const [rezultat, setRezultat] = useState(0);

  const [semnOperatie, setSemnOperatie] = useState("");  

  useEffect(() => {
    console.log(numar);
    console.log(numere);
    console.log(rezultat);
  }, [numar, numere, rezultat]);

  const construireNumar = (caracter) => {
    if (text.length === 0) {
      if (caracter === "-") {
        setNumar(numar + "-");
        return true;
      }
      if (caracter === "+") {
        return true;
      }
      setNumar(numar + caracter);
    } else {
      const ultimulCaracter = text[text.length - 1];
      if (
        caracter === "+" ||
        caracter === "-" ||
        caracter === "/" ||
        caracter === "*"
      ) {
        setNumere(() => {
          let aux = numere;
          aux.push(numar);
          if (aux.length > 1) {
            if (caracter === "+") 
            {
              setRezultat(rezultat + +numar);
            }
            if (caracter === "-") setRezultat(rezultat - +numar);
            if (caracter === "*") setRezultat(rezultat * +numar);
            if (caracter === "/") setRezultat(rezultat / +numar);
          }
          else {
            if (caracter === "+") setSemnOperatie('+');
            if (caracter === "-") setSemnOperatie('-');
            if (caracter === "*") setSemnOperatie('*');
            if (caracter === "/") setSemnOperatie('/');
            setRezultat(+numar);
          }
          setNumar("");
          return aux;
        });
      } else {
        setNumar(numar + caracter);
      }
    }
  };

  const checkCaracter = (caracter) => {
    if (text.length === 0) {
      if (
        caracter === "*" ||
        caracter === "/" ||
        caracter === "=" ||
        caracter === "+ / -"
      )
        return false;
    } else {
      const caracterAnterior = text[text.length - 1];
      if (
        caracterAnterior === "+" ||
        caracterAnterior === "-" ||
        caracterAnterior === "*" ||
        caracterAnterior === "/"
      )
        if (
          caracter === "+" ||
          caracter === "-" ||
          caracter === "*" ||
          caracter === "/"
        )
          return false;
    }
    return true;
  };

  const handleText = (caracter) => {
    if (checkCaracter(caracter)) {
      construireNumar(caracter);
      setText(text + caracter);
    } else {
      console.log("Eroare");
    }
  };

  return (
    <Stack width={"40ch"} borderRadius={3} bgcolor={"#212121"} p={3}>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Stack
            borderColor={"black"}
            p={2}
            bgcolor={"black"}
            height={"45px"}
            direction={"column"}
            justifyContent={"center"}
          >
            <Typography
              color={"white"}
              textAlign={"left"}
              fontSize={"20px"}
              overflow={"auto"}
            >
              {text}
            </Typography>
          </Stack>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => {
              setText(text.slice(0, -1));
            }}
          >
            <BackspaceIcon />
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
          >
            p2
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
          >
            p3
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText("+")}
          >
            +
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText("1")}
          >
            1
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText("2")}
          >
            2
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText("3")}
          >
            3
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText("-")}
          >
            -
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText("4")}
          >
            4
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText("5")}
          >
            5
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText("6")}
          >
            6
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText("*")}
          >
            *
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText("7")}
          >
            7
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText("8")}
          >
            8
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText("9")}
          >
            9
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText("/")}
          >
            /
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
          >
            + / -
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText("0")}
          >
            0
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText(".")}
          >
            .
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Button
            size="small"
            variant="contained"
            color="warning"
            sx={{ fontFamily: "sans-serif", width: "10ch", height: "5ch" }}
            onClick={() => handleText("=")}
          >
            =
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Calculator;
