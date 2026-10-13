import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const fallbackCoin = location.state?.coin;

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    setErrorMsg("");

    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => {
        if (response.status === 429) {
          throw new Error("Límite de peticiones alcanzado (Rate limit de CoinGecko). Espera unos segundos e intenta de nuevo.");
        }
        if (!response.ok) {
          throw new Error(`Error en el servidor (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        setCoin(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al consultar la API:", err.message);
        setErrorMsg(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const dataToDisplay = coin || fallbackCoin;

  if (errorMsg && !dataToDisplay) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
          {errorMsg}
        </Typography>
        <Button onClick={() => navigate('/')} variant="outlined" color="primary">
          REGRESAR AL INICIO
        </Button>
      </Box>
    );
  }

  if (!dataToDisplay) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          No se encontró información para "{id}"
        </Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }} variant="outlined">
          Regresar al Inicio
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Button variant="outlined" color="primary" onClick={() => navigate('/')} sx={{ mb: 3 }}>
        VOLVER
      </Button>

      <Card sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          <img src={dataToDisplay.image?.large || dataToDisplay.image} lt={dataToDisplay.name} style={{ width: 80, height: 80, filter: 'drop-shadow(0 0 5px #00FF00)' }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {dataToDisplay.name} ({dataToDisplay.symbol?.toUpperCase()})
            </Typography>
            <Typography variant="h5" color="primary" sx={{ mt: 1 }}>
              ${(dataToDisplay.market_data?.current_price?.usd || dataToDisplay.current_price)?.toLocaleString()} USD
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ p: 0 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Ranking de Mercado:</b> #{dataToDisplay.market_cap_rank}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Capitalización de Mercado:</b> ${(dataToDisplay.market_data?.market_cap?.usd || dataToDisplay.market_cap)?.toLocaleString()} USD
          </Typography>
          {dataToDisplay.market_data?.high_24h?.usd && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              <b>Máximo en 24h:</b> ${dataToDisplay.market_data.high_24h.usd.toLocaleString()} USD
            </Typography>
          )}
          {dataToDisplay.market_data?.low_24h?.usd && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              <b>Mínimo en 24h:</b> ${dataToDisplay.market_data.low_24h.usd.toLocaleString()} USD
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};