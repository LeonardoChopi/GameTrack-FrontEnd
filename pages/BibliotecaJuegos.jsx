import { useState, useContext } from 'react';
import { JuegosContext } from '../context/JuegosContext.jsx';
import TarjetaJuego from '../components/TarjetaJuego.jsx';
import FormularioJuego from '../components/FormularioJuego.jsx';

const BibliotecaJuegos = () => {
  const { juegos, loading } = useContext(JuegosContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const juegosFiltrados = juegos.filter(juego => {
    const cumpleFiltro = filtro === 'todos' || 
      (filtro === 'completados' && juego.completado) ||
      (filtro === 'pendientes' && !juego.completado);
    
    const cumpleBusqueda = juego.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      juego.genero.toLowerCase().includes(busqueda.toLowerCase()) ||
      juego.plataforma.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleFiltro && cumpleBusqueda;
  });

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem 20px', textAlign: 'center' }}>
        <h2>Cargando biblioteca...</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>GameTrack</h1>
        <button className="btn btn-primary" onClick={() => setMostrarFormulario(true)}>
          + Agregar Juego
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            flex: '1',
            minWidth: '250px',
            padding: '0.8rem',
            border: '2px solid var(--surface-light)',
            borderRadius: '8px',
            backgroundColor: 'var(--surface)',
            color: 'var(--text-primary)',
            fontSize: '1rem'
          }}
        />
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{
            padding: '0.8rem',
            border: '2px solid var(--surface-light)',
            borderRadius: '8px',
            backgroundColor: 'var(--surface)',
            color: 'var(--text-primary)',
            fontSize: '1rem'
          }}
        >
          <option value="todos">Todos los juegos</option>
          <option value="completados">Completados</option>
          <option value="pendientes">Pendientes</option>
        </select>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Mostrando {juegosFiltrados.length} de {juegos.length} juegos
      </p>

      {juegosFiltrados.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2 style={{ color: 'var(--text-secondary)' }}>
            {juegos.length === 0 
              ? 'No hay juegos en tu biblioteca' 
              : 'No se encontraron juegos con ese criterio'}
          </h2>
          {juegos.length === 0 && (
            <button className="btn btn-primary" onClick={() => setMostrarFormulario(true)} style={{ marginTop: '1rem' }}>
              Agregar tu primer juego
            </button>
          )}
        </div>
      ) : (
        <div className="games-grid">
          {juegosFiltrados.map(juego => (
            <TarjetaJuego key={juego._id} juego={juego} />
          ))}
        </div>
      )}

      {mostrarFormulario && (
        <FormularioJuego onClose={() => setMostrarFormulario(false)} />
      )}
    </div>
  );
};

export default BibliotecaJuegos;