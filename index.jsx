import React from "react";
import { Link } from 'react-router-dom'
import "./style.css";
import LogoImg from "./img/Logo.png";
import UserSvg from "./img/user.svg";

const Index = () => {
  return (
    <>
      <header>
        <div className="Logo">
          <Link to="/">
            <img src={LogoImg} alt="Logo" />
          </Link>
        </div>
        <nav>
          <Link to="/juegos">Juegos</Link>
          <Link to="/biblioteca">Biblioteca</Link>
          <Link to="/top">Top</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
        <div className="user">
          <button className="barra" id="menuToggle">
            &#9776;
          </button>
          <Link to="#">
            <img src={UserSvg} alt="User" />
          </Link>
        </div>
        <div className="menu-movil" id="menuMovil">
          <nav className="nav-movil">
            <a href="#">Juegos</a>
            <a href="#">Biblioteca</a>
            <a href="#">Top</a>
            <a href="#">Contacto</a>
              <Link to="#" className="user-link">
              <img src={UserSvg} alt="User" />
              Mi Cuenta
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="imagenes-principales">
          <div className="carruselinicio">
            <div className="imagenes">
              <img
                src="https://i.ytimg.com/vi_webp/l6RRdTFuepk/maxresdefault.webp"
                alt=""
              />
            </div>
          </div>
        </section>

        <section className="ultimosagregados SubTitInicio">
          <h2>Últimos Agregados</h2>
          <div className="contenedor-juegos">
            {[...Array(5)].map((_, i) => (
              <div className="juegoinicio" key={i}>
                <a href="#">
                  <img
                    src="https://i.ytimg.com/vi_webp/l6RRdTFuepk/maxresdefault.webp"
                    alt=""
                  />
                  <h3>GTA VI</h3>
                </a>
              </div>
            ))}
            <div className="juegoinicio">
              <div className="masjuegos">
                <a href="#">
                  <img
                    src="https://i.ytimg.com/vi_webp/l6RRdTFuepk/maxresdefault.webp"
                    alt=""
                  />
                  <h3>Más juegos</h3>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="maspopulares SubTitInicio">
          <h2>Más populares</h2>
          <div className="contenedor-juegos">
            {[...Array(5)].map((_, i) => (
              <div className="juegoinicio" key={i}>
                <a href="#">
                  <img
                    src="https://i.ytimg.com/vi_webp/l6RRdTFuepk/maxresdefault.webp"
                    alt=""
                  />
                  <h3>GTA VI</h3>
                </a>
              </div>
            ))}
            <div className="juegoinicio">
              <div className="masjuegos">
                <a href="#">
                  <img
                    src="https://i.ytimg.com/vi_webp/l6RRdTFuepk/maxresdefault.webp"
                    alt=""
                  />
                  <h3>Más juegos</h3>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>GameTrack &copy; 2025</p>
      </footer>
    </>
  );
};

export default Index;
