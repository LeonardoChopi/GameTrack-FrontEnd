import React from "react";
import "./style.css";

const Juegos = () => {
  return (
    <>
      <header>
        <div className="Logo">
          <a href="index.jsx">
            <img src="img/Logo.png" alt="Logo" />
          </a>
        </div>
        <nav>
          <a href="#">Juegos</a>
          <a href="#">Biblioteca</a>
          <a href="#">Top</a>
          <a href="#">Contacto</a>
        </nav>
        <div className="user">
          <button className="barra" id="menuToggle">
            &#9776;
          </button>
          <a href="#">
            <img src="img/user.svg" alt="User" />
          </a>
        </div>
        <div className="menu-movil" id="menuMovil">
          <nav className="nav-movil">
            <a href="#">Juegos</a>
            <a href="#">Biblioteca</a>
            <a href="#">Top</a>
            <a href="#">Contacto</a>
            <a href="#" className="user-link">
              <img src="img/user.svg" alt="User" />
              Mi Cuenta
            </a>
          </nav>
        </div>
      </header>

      <main>
        <h1>Biblioteca pública de juegos</h1>
        <section className="juegos">
          <div className="card">
            <div className="ImgCard">
              <img
                src="https://i.ytimg.com/vi_webp/l6RRdTFuepk/maxresdefault.webp"
                alt="Juego"
              />
            </div>
            <h2>GTA VI</h2>
            <h3>Rockstar Games</h3>
            <h3>PlayStation 5</h3>
            <p>Juegazo</p>
            <a href="#">Explorar</a>
          </div>
        </section>
      </main>
    </>
  );
};

export default Juegos;
