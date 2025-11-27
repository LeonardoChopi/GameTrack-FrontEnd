import { useNavigate } from 'react-router-dom';

const TarjetaJuego = ({ juego }) => {
  const navigate = useNavigate();

  const renderEstrellas = (puntuacion) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < puntuacion ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="card" onClick={() => navigate(`/juego/${juego._id}`)} style={{ cursor: 'pointer' }}>
      <img 
        src={juego.portada} 
        alt={juego.titulo}
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}
      />
      <h3 style={{ marginBottom: '0.5rem' }}>{juego.titulo}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
        {juego.plataforma} • {juego.genero}
      </p>
      <div className="stars" style={{ marginBottom: '0.5rem' }}>
        {renderEstrellas(juego.puntuacion)}
      </div>
      {juego.completado && (
        <span style={{
          display: 'inline-block',
          padding: '0.3rem 0.8rem',
          backgroundColor: 'var(--success)',
          color: 'white',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: '600'
        }}>
          ✓ Completado
        </span>
      )}
      {juego.horasJugadas > 0 && (
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          ⏱️ {juego.horasJugadas} horas jugadas
        </p>
      )}
    </div>
  );
};

export default TarjetaJuego;