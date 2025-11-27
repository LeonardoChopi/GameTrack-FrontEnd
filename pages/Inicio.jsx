import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import juegosService from "../services/juegosService";

function Inicio() {
  const [ultimos, setUltimos] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await juegosService.getJuegos();
        setUltimos(data.slice(-4)); // últimos 4
      } catch (err) {
        console.error("Error cargando juegos:", err);
      }
    };

    cargar();
  }, []);

  return (
    <main className="inicio">
      {/* Banner principal */}
      <section className="banner">
        <img
          src="https://i.imgur.com/NzWQ0yL.jpeg"
          alt="Banner GameTrack"
          className="banner-img"
        />
        <h1 className="titulo-principal">Bienvenido a GameTrack</h1>
      </section>

      {/* Últimos agregados */}
      <section className="ultimos">
        <h2>Últimos agregados</h2>

        <div className="lista-juegos">
          {ultimos.map((j) => (
            <Link to={`/juego/${j._id}`} className="juego-card" key={j._id}>
              <img src={j.imagen} alt={j.titulo} />
              <h3>{j.titulo}</h3>
              <p>{j.genero}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Botón Biblioteca */}
      <section className="cta">
        <Link className="btn" to="/biblioteca">
          Ver mi biblioteca
        </Link>
      </section>
    </main>
  );
}

export default Inicio;
