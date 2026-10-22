import React from 'react'
import { useContext } from 'react';
import { ContextFavorito } from '../context/ContextFavorito';
import { ContextAutor } from '../context/ContextAutor';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router";

export const Favoritos = () => {
    const {favoritos} = useContext(ContextFavorito);
    const {autor} = useContext(ContextAutor);
    const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Typography variant="h4" sx={{  fontWeight: 'bold', textShadow: '0 0 8px #00FF00', letterSpacing: 2, mb: 1 }}>
        FAVORITOS
      </Typography>
      <Typography variant="h6" sx={{  fontWeight: 'bold', textShadow: '0 0 8px #00FF00', letterSpacing: 2, mb: 4 }}>
        Desarrollado por: {autor}
      </Typography>

      <Grid container spacing={5}>
        {favoritos.map((favorito) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={favorito.id}>
            <Card sx={{ maxWidth: 500, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 1 }}>
              <CardMedia component="img" sx={{ height: 200, objectFit: 'contain', pt: 2 }} image={favorito.image} alt={favorito.name} />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {favorito.name} ({favorito.symbol.toUpperCase()})
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                  ${favorito.current_price.toLocaleString()} USD
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                  Cap. de Mercado: ${favorito.market_cap.toLocaleString()}
                </Typography>
              </CardContent>

              <CardActions style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button size="small" variant="contained" color="primary" onClick={() => navigate(`/detail/${favorito.id}`)}>
                  Ver detalles
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}