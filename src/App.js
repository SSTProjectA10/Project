import "./App.css";
import Button from "@mui/material/Button";
import Calculator from "./components/calculator/Calculator";
import { Stack } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Stack height={"100vh"} direction={"row"} justifyContent={"center"} alignItems={"center"} bgcolor={"#0a022b"}>
        <Calculator />
      </Stack>
    </div>
  );
}

export default App;
