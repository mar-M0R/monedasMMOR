import React from 'react'
import { useState } from 'react'
import { ContextFavorito } from './ContextFavorito'
import { useEffect } from 'react'

export const ProviderFavorito = ({children}) => {
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

    const [favoritos, setFavoritos] = useState([]);
      
    const like = (id) => {
        const favorito = favoritos.find((favorito)=>(favorito.id==id));
            if (!favorito) {
            // agregar a favoritos
            const coin = coins.find((coin)=>(coin.id==id));
            const copyFavorito = [...favoritos, coin];
            setFavoritos(copyFavorito);
            } 
            else {
            // quitar de favoritos
            const copyFavorito = favoritos.filter((favorito) => favorito.id != id);
            setFavoritos(copyFavorito);
            }
    }

    useEffect(() => {
        console.log(favoritos);
    }, [favoritos]);

  return (
    <ContextFavorito.Provider value={{coins, favoritos, like}}>
        {children}
    </ContextFavorito.Provider>
  )
}