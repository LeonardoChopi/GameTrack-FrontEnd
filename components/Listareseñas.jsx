import { useContext } from 'react';
import { JuegosContext } from '../context/JuegosContext.jsx';

const ListaReseñas = ({ juegoId, onEditar }) => {
  const { obtenerReseñasPorJuego, eliminarReseña } = useContext(JuegosContext);
  const reseñas = obtenerReseñasPorJuego(juegoId);

  const renderEstrellas = (puntuacion) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < puntuacion ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta reseña?')) {
      try {
        await eliminarReseña(id);
      } catch (error) {
        alert('Error al eliminar reseña');
      }
    }
  };

  if (reseñas.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
        No hay reseñas aún. ¡Sé el primero en escribir una!
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {reseñas.map(reseña => (
        <div key={reseña._id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ marginBottom: '0.5rem' }}>{reseña.titulo}</h3>
              <div className="stars">
                {renderEstrellas(reseña.puntuacion)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => onEditar(reseña)}
                style={{ padding: '0.4rem 0.8rem' }}
              >
                ✏️
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => handleEliminar(reseña._id)}
                style={{ padding: '0.4rem 0.8rem' }}
              >
                🗑️
              </button>
            </div>
          </div>

          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            {reseña.contenido}
          </p>

          {reseña.aspectosPositivos && reseña.aspectosPositivos.length > 0 && (
            <div style={{ marginBottom: '0.8rem' }}>
              <strong style={{ color: 'var(--success)' }}>✓ Aspectos Positivos:</strong>
              <ul style={{ marginTop: '0.3rem', marginLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                {reseña.aspectosPositivos.map((aspecto, i) => (
                  <li key={i}>{aspecto}</li>
                ))}
              </ul>
            </div>
          )}

          {reseña.aspectosNegativos && reseña.aspectosNegativos.length > 0 && (
            <div>
              <strong style={{ color: 'var(--error)' }}>✗ Aspectos Negativos:</strong>
              <ul style={{ marginTop: '0.3rem', marginLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                {reseña.aspectosNegativos.map((aspecto, i) => (
                  <li key={i}>{aspecto}</li>
                ))}
              </ul>
            </div>
          )}

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
            {new Date(reseña.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListaReseñas;