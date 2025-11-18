import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import juegosService from "../services/juegosService";

const BibliotecaJuegos = () => {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const data = await juegosService.obtenerJuegos();
      setJuegos(data);
    };
    cargar();
  }, []);

  return (
    <main className="pagina">
      <h1 className="titulo-pagina">Biblioteca de Juegos</h1>

      <div className="contenedor-juegos">
        {juegos.map((juego) => (
          <div className="juegoinicio" key={juego._id}>
            <Link to={`/juego/${juego._id}`}>
              <img src={juego.imagen} alt={juego.titulo} />
              <h3>{juego.titulo}</h3>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default BibliotecaJuegos;
