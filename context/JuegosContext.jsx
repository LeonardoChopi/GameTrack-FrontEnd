import { createContext, useState, useEffect } from "react";
import { obtenerJuegos } from "../services/juegosService";

export const JuegosContext = createContext();

export const JuegosProvider = ({ children }) => {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const datos = await obtenerJuegos();
    setJuegos(datos);
  };

  return (
    <JuegosContext.Provider value={{ juegos, setJuegos, cargar }}>
      {children}
    </JuegosContext.Provider>
  );
};
