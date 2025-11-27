import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JuegosContext } from '../context/JuegosContext.jsx';
import FormularioJuego from '../components/FormularioJuego.jsx';
import FormularioReseña from '../components/FormularioReseña.jsx';
import ListaReseñas from '../components/ListaReseñas.jsx';

const DetalleJuego = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { juegos, eliminarJuego } = useContext(JuegosContext);
  const [juego, setJuego] = useState(null);
  const [mostrarFormJuego, setMostrarFormJuego] = useState(false);
  const [mostrarFormReseña, setMostrarFormReseña] = useState(false);
  const [reseñaEditar, setReseñaEditar] = useState(null);
  const [vistaActual, setVistaActual] = useState('detalles');

  useEffect(() => {
    const juegoEncontrado = juegos.find(j => j._id === id);
    setJuego(juegoEncontrado);
  }, [id, juegos]);

  const handleEliminar = async () => {
    if (window.confirm('¿Estás seguro de eliminar este juego? Se eliminarán también todas sus reseñas.')) {
      try {
        await eliminarJuego(id);
        navigate('/');
      } catch (error) {
        alert('Error al eliminar juego');
      }
    }
  };

  const handleEditarReseña = (reseña) => {
    setReseñaEditar(reseña);
    setMostrarFormReseña(true);
  };

  const cerrarFormReseña = () => {
    setMostrarFormReseña(false);
    setReseñaEditar(null);
  };

  const renderEstrellas = (puntuacion) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < puntuacion ? 'filled' : ''}`} style={{ fontSize: '2rem' }}>
        ★
      </span>
    ));
  };

  if (!juego) {
    return (
      <div className="container" style={{ padding: '3rem 20px', textAlign: 'center' }}>
        <h2>Juego no encontrado</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Volver a la biblioteca
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 20px' }}>
      <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ marginBottom: '1.5rem' }}>
        ← Volver a la biblioteca
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <img 
            src={juego.portada} 
            alt={juego.titulo}
            style={{
              width: '100%',
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)'
            }}
          />
        </div>

        <div>
          <h1 style={{ marginBottom: '1rem' }}>{juego.titulo}</h1>
          
          <div style={{ marginBottom: '1rem' }}>
            {renderEstrellas(juego.puntuacion)}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--surface-light)',
              borderRadius: '20px',
              fontSize: '0.9rem'
            }}>
              🎮 {juego.plataforma}
            </span>
            <span style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--surface-light)',
              borderRadius: '20px',
              fontSize: '0.9rem'
            }}>
              🎯 {juego.genero}
            </span>
            {juego.completado && (
              <span style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--success)',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                ✓ Completado
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            {juego.desarrollador && (
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Desarrollador</p>
                <p style={{ fontWeight: '600' }}>{juego.desarrollador}</p>
              </div>
            )}
            {juego.fechaLanzamiento && (
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Lanzamiento</p>
                <p style={{ fontWeight: '600' }}>
                  {new Date(juego.fechaLanzamiento).toLocaleDateString('es-ES')}
                </p>
              </div>
            )}
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Horas Jugadas</p>
              <p style={{ fontWeight: '600' }}>⏱️ {juego.horasJugadas}h</p>
            </div>
          </div>

          {juego.notas && (
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Notas</p>
              <p style={{ padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '8px' }}>
                {juego.notas}
              </p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-primary" onClick={() => setMostrarFormJuego(true)}>
              ✏️ Editar
            </button>
            <button className="btn btn-danger" onClick={handleEliminar}>
              🗑️ Eliminar
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid var(--surface-light)' }}>
          <button
            onClick={() => setVistaActual('detalles')}
            style={{
              padding: '1rem 2rem',
              background: 'none',
              border: 'none',
              color: vistaActual === 'detalles' ? 'var(--primary-color)' : 'var(--text-secondary)',
              fontWeight: vistaActual === 'detalles' ? '600' : '400',
              fontSize: '1.1rem',
              cursor: 'pointer',
              borderBottom: vistaActual === 'detalles' ? '3px solid var(--primary-color)' : 'none'
            }}
          >
            Detalles
          </button>
          <button
            onClick={() => setVistaActual('resenas')}
            style={{
              padding: '1rem 2rem',
              background: 'none',
              border: 'none',
              color: vistaActual === 'resenas' ? 'var(--primary-color)' : 'var(--text-secondary)',
              fontWeight: vistaActual === 'resenas' ? '600' : '400',
              fontSize: '1.1rem',
              cursor: 'pointer',
              borderBottom: vistaActual === 'resenas' ? '3px solid var(--primary-color)' : 'none'
            }}
          >
            Reseñas
          </button>
        </div>

        {vistaActual === 'resenas' && (
          <>
            <div style={{ marginBottom: '2rem' }}>
              <button className="btn btn-primary" onClick={() => setMostrarFormReseña(true)}>
                ✍️ Escribir Reseña
              </button>
            </div>
            <ListaReseñas juegoId={id} onEditar={handleEditarReseña} />
          </>
        )}
      </div>

      {mostrarFormJuego && (
        <FormularioJuego 
          juegoEditar={juego} 
          onClose={() => setMostrarFormJuego(false)} 
        />
      )}

      {mostrarFormReseña && (
        <FormularioReseña 
          juegoId={id}
          reseñaEditar={reseñaEditar}
          onClose={cerrarFormReseña}
        />
      )}
    </div>
  );
};

export default DetalleJuego;