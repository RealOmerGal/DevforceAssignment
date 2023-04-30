import Form from "./components/Form";
import Table from "./components/Table";
import { theme } from "./theme";
import { Stack, ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction={"column"}>
        <Table />
        <Form />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
