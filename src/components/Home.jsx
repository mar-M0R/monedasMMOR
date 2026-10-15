import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router";
import { useContext } from 'react';
import { ContextAutor } from '../context/ContextAutor';

export const Home = () => {
  const {autor,setAutor} = useContext(ContextAutor);
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then((response) => {
        if (!response.ok)
          throw new Error('Error en la respuesta del servidor');
        return response.json();
      })
      .then((data) => {
        setCoins(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Typography variant="h4" sx={{  fontWeight: 'bold', textShadow: '0 0 8px #00FF00', letterSpacing: 2, mb: 1 }}>
        CRIPTOMONEDAS
      </Typography>
      <Typography variant="h6" sx={{  fontWeight: 'bold', textShadow: '0 0 8px #00FF00', letterSpacing: 2, mb: 4 }}>
        Desarrollado por: {autor}
      </Typography>

      <Grid container spacing={5}>
        {coins.map((coin) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={coin.id}>
            <Card sx={{ maxWidth: 500, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 1 }}>
              <CardMedia component="img" sx={{ height: 200, objectFit: 'contain', pt: 2 }} image={coin.image} alt={coin.name} />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {coin.name} ({coin.symbol.toUpperCase()})
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                  ${coin.current_price.toLocaleString()} USD
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                  Cap. de Mercado: ${coin.market_cap.toLocaleString()}
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small" variant="contained" color="primary" onClick={() => navigate(`/detail/${coin.id}`)}>
                  Ver detalles
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};