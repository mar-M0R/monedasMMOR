import { useState } from "react"
import { Layout } from "./components/Layout"
import { BrowserRouter } from "react-router"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ProviderAutor } from "./context/ProviderAutor";
import { ProviderFavorito } from "./context/ProviderFavorito";

const matrixTheme = createTheme({
  palette: { 
    mode: 'dark', 
    background: { 
      default: '#000000', paper: '#000000', 
    }, 
    text: { 
      primary: '#00FF00', secondary: '#00CC00', 
    }, 
    primary: { 
      main: '#00FF00', 
    }, 
  },
  typography: { fontFamily: '"Courier New", Courier, monospace', },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000', border: '1px solid #00FF00', boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',  transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 0 18px rgba(0, 255, 0, 0.7)', borderColor: '#33FF33',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Courier New", Courier, monospace', fontWeight: 'bold',
        },
        containedPrimary: {
          backgroundColor: '#00FF00', color: '#000000',
          '&:hover': {
            backgroundColor: '#33FF33', boxShadow: '0 0 10px #00FF00',
          },
        },
      },
    },
  },
});

function App() {
    return (
      <ThemeProvider theme={matrixTheme}>
        <ProviderAutor>
          <ProviderFavorito>
            <BrowserRouter>
              <Layout></Layout>
            </BrowserRouter>
          </ProviderFavorito>
        </ProviderAutor>
      </ThemeProvider>
    )
}

export default App