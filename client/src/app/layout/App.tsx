import Catalog from "../../features/catalog/catalog";
import { Container, CssBaseline, createTheme } from "@mui/material";
import Header from "./header";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";



function App() {

const [darkMode, setDDarkMode] = useState(false);
const paletteType = darkMode ? 'dark' : 'light';

const theme = createTheme({
  palette: {
    mode: paletteType,
    background: {
      default: paletteType === 'light' ? '#eaeaea' : '#121212'
    }
  }
})

function handleThemeChange(){
  setDDarkMode(!darkMode);
}

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>

    </ThemeProvider>
  );
}

export default App;
