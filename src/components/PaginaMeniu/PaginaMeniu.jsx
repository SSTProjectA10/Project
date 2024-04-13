import React from "react";

import { Typography, Stack, Button } from "@mui/material";

function PaginaMeniu() {
  return (
    <Stack
      height={"100vh"}
      direction={"column"}
      justifyContent={"center"}
      bgcolor={"#050836"}
      spacing={10}
    >
      <Typography fontSize={"30px"} color={"white"} fontWeight={"bold"} textAlign={"center"}>
        PROIECT TSS
      </Typography>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        spacing={3}
        width={"100%"}
        alignItems={"center"}
      >
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{ width: "50ch" }}
          href="/paginaelevi"
        >
          Elevi
        </Button>
        {/* <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{ width: "50ch" }}
          href="/paginaprofesori"
        >
          Profesori
        </Button> */}
        {/* <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{ width: "50ch" }}
          href="/paginamateriiscolare"
        >
          Materii Școlare
        </Button> */}
      </Stack>
    </Stack>
  );
}

export default PaginaMeniu;
