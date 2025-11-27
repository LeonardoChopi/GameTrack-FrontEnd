import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <h1>🎮 GameTracker</h1>
        <div>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Biblioteca
          </Link>
          <Link 
            to="/estadisticas" 
            className={location.pathname === '/estadisticas' ? 'active' : ''}
          >
            Estadísticas
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;