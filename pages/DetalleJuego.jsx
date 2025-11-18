import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import juegosService from "../services/juegosService";
import resenasService from "../services/resenasService";


const DetalleJuego = () => {
  const { id } = useParams();
  const [juego, setJuego] = useState(null);
  const [reseñas, setReseñas] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const j = await juegosService.getJuego(id);
      const r = await resenasService.getResenas(id);

      setJuego(j);
      setReseñas(r);
    };

    cargarDatos();
  }, [id]);

  if (!juego) return <p>Cargando juego...</p>;

  return (
    <main className="detalle-juego">
      <h1>{juego.titulo}</h1>

      <img src={juego.portada} alt={juego.titulo} />
      <p><strong>Género:</strong> {juego.genero}</p>
      <p><strong>Horas jugadas:</strong> {juego.horas}</p>
      <p><strong>Completado:</strong> {juego.completado ? "Sí" : "No"}</p>

      <hr />

      <h2>Reseñas</h2>
      {reseñas.length === 0 && <p>No hay reseñas aún.</p>}

      {reseñas.map((r) => (
        <div key={r._id} className="reseña">
          <p><strong>Puntuación:</strong> {r.puntuacion} ⭐</p>
          <p>{r.comentario}</p>
        </div>
      ))}
    </main>
  );
};

export default DetalleJuego;
