import { useState } from "react"
import { Layout } from "./components/Layout"
import { BrowserRouter } from "react-router"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const matrixTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#000000', // Fondo totalmente negro para superficies
    },
    text: {
      primary: '#00FF00',
      secondary: '#00CC00',
    },
    primary: {
      main: '#00FF00',
    },
  },
  typography: {
    fontFamily: '"Courier New", Courier, monospace',
  },
  components: {
    // Estilos personalizados para las Tarjetas
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          border: '1px solid #00FF00', // Borde verde
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)', // Resplandor verde neón
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 0 18px rgba(0, 255, 0, 0.7)', // Mayor resplandor al pasar el cursor
            borderColor: '#33FF33',
          },
        },
      },
    },
    // Estilos personalizados para los Botones
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Courier New", Courier, monospace',
          fontWeight: 'bold',
        },
        containedPrimary: {
          backgroundColor: '#00FF00',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#33FF33',
            boxShadow: '0 0 10px #00FF00',
          },
        },
      },
    },
  },
});

function App() {
    return (
      <ThemeProvider theme={matrixTheme}>
        <BrowserRouter>
          <Layout></Layout>
        </BrowserRouter>
        
      </ThemeProvider>
      
    )
}

export default App