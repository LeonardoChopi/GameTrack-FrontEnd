import { useEffect, useState } from "react";
import juegosService from "../services/juegosService";

const EstadisticasPersonales = () => {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const data = await juegosService.getJuegos();
      setJuegos(data);
    };
    cargar();
  }, []);

  const total = juegos.length;
  const completados = juegos.filter(j => j.completado).length;
  const horas = juegos.reduce((acc, j) => acc + (j.horas || 0), 0);

  return (
    <main className="estadisticas">
      <h1>Estadísticas Personales</h1>

      <div className="estadistica-box">
        <h3>Total de Juegos</h3>
        <p>{total}</p>
      </div>

      <div className="estadistica-box">
        <h3>Completados</h3>
        <p>{completados}</p>
      </div>

      <div className="estadistica-box">
        <h3>Horas Totales Jugadas</h3>
        <p>{horas}</p>
      </div>
    </main>
  );
};

export default EstadisticasPersonales;
