import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const About = () => {
  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Typography variant="h4" sx={{  fontWeight: 'bold', textShadow: '0 0 8px #00FF00', letterSpacing: 2 }}>
          ABOUT PROJECT
        </Typography>
      </Box>

      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Misión del Sistema
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, opacity: 0.9 }}>
            Esta página es una interfaz diseñada para el monitoreo y análisis en tiempo real del mercado de 
            <b> criptomonedas</b>. Conecta directamente con la API pública de <b> CoinGecko</b> para extraer datos
            actualizados sobre precios, capitalizaciones y variaciones del mercado.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};