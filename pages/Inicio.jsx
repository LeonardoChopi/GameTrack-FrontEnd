import { Link } from "react-router-dom";
import LogoImg from "../assets/logo.png"; // Ajustar según tu carpeta

const Inicio = () => {
  return (
    <>
      {/* HEADER */}
      <header>
        <div className="Logo">
          <Link to="/">
            <img src={LogoImg} alt="Logo" />
          </Link>
        </div>

        <nav>
          <Link to="/biblioteca">Biblioteca</Link>
          <Link to="/juegos">Juegos</Link>
        </nav>

        <button className="barra" id="menuToggle">&#9776;</button>

        <div className="menu-movil" id="menuMovil">
          <nav className="nav-movil">
            <Link to="/biblioteca">Biblioteca</Link>
            <Link to="/juegos">Juegos</Link>
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main>
        {/* Carrusel */}
        <section className="imagenes-principales">
          <div className="carruselinicio">
            <div className="imagenes">
              <img
                src="https://i.ytimg.com/vi_webp/l6RRdTFuepk/maxresdefault.webp"
                alt="Imagen principal"
              />
            </div>
          </div>
        </section>

        {/* Últimos Agregados */}
        <section className="ultimosagregados SubTitInicio">
          <h2>Últimos Agregados</h2>
          <div className="contenedor-juegos">
            {[...Array(5)].map((_, i) => (
              <div className="juegoinicio" key={i}>
                <Link to="/biblioteca">
                  <img
                    src="https://i.ytimg.com/vi_webp/l6RRdTFuepk/maxresdefault.webp"
                    alt="Juego"
                  />
                  <h3>Juego {i + 1}</h3>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Más Populares */}
        <section className="maspopulares SubTitInicio">
          <h2>Más Populares</h2>
          <div className="contenedor-juegos">
            {[...Array(5)].map((_, i) => (
              <div className="juegoinicio" key={i}>
                <Link to="/biblioteca">
                  <img
                    src="https://i.ytimg.com/vi_webp/l6RRdTFuepk/maxresdefault.webp"
                    alt="Juego popular"
                  />
                  <h3>Juego Popular {i + 1}</h3>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <p>GameTrack &copy; 2025</p>
      </footer>
    </>
  );
};

export default Inicio;
