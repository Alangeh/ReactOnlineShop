import Catalog from "../../features/catalog/catalog";
import { Container, CssBaseline, createTheme } from "@mui/material";
import Header from "./header";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
import { useStoreContext } from "../context/StoreContext";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import agent from "../api/agent";
import { getCookie } from "../util/util";
import LoadingComponent from "./LoadingComponent";



function App() {
const {setBasket} = useStoreContext();
const [loading, setLoading] = useState(true);

useEnhancedEffect(() => {
  const buyerId = getCookie('buyerId');
  if(buyerId) {
    agent.Basket.get()
    .then(basket => setBasket(basket))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  } else {
    setLoading(false);
  }
})

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

if(loading) return <LoadingComponent message="Initailizing component ..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>

    </ThemeProvider>
  );
}

export default App;
