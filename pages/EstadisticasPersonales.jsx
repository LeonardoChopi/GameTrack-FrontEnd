import { useContext, useMemo } from 'react';
import { JuegosContext } from '../context/JuegosContext.jsx';

const EstadisticasPersonales = () => {
  const { juegos, reseñas } = useContext(JuegosContext);

  const estadisticas = useMemo(() => {
    const totalJuegos = juegos.length;
    const juegosCompletados = juegos.filter(j => j.completado).length;
    const juegosPendientes = totalJuegos - juegosCompletados;
    const totalHoras = juegos.reduce((acc, j) => acc + (j.horasJugadas || 0), 0);
    const promedioHoras = totalJuegos > 0 ? (totalHoras / totalJuegos).toFixed(1) : 0;
    const totalReseñas = reseñas.length;

    const plataformas = juegos.reduce((acc, j) => {
      acc[j.plataforma] = (acc[j.plataforma] || 0) + 1;
      return acc;
    }, {});

    const generos = juegos.reduce((acc, j) => {
      acc[j.genero] = (acc[j.genero] || 0) + 1;
      return acc;
    }, {});

    const juegoMasJugado = juegos.reduce((max, j) => 
      j.horasJugadas > (max?.horasJugadas || 0) ? j : max
    , null);

    const promedioCalificacion = totalJuegos > 0 
      ? (juegos.reduce((acc, j) => acc + j.puntuacion, 0) / totalJuegos).toFixed(1)
      : 0;

    return {
      totalJuegos,
      juegosCompletados,
      juegosPendientes,
      totalHoras,
      promedioHoras,
      totalReseñas,
      plataformas,
      generos,
      juegoMasJugado,
      promedioCalificacion
    };
  }, [juegos, reseñas]);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{icon}</div>
      <h3 style={{ color: color || 'var(--primary-color)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        {value}
      </h3>
      <p style={{ color: 'var(--text-secondary)' }}>{title}</p>
    </div>
  );

  return (
    <div className="container" style={{ padding: '2rem 20px' }}>
      <h1 style={{ marginBottom: '2rem' }}>📊 Estadísticas Personales</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <StatCard title="Total de Juegos" value={estadisticas.totalJuegos} icon="🎮" />
        <StatCard title="Completados" value={estadisticas.juegosCompletados} icon="✓" color="var(--success)" />
        <StatCard title="Pendientes" value={estadisticas.juegosPendientes} icon="⏳" color="var(--warning)" />
        <StatCard title="Total de Horas" value={estadisticas.totalHoras} icon="⏱️" />
        <StatCard title="Promedio Horas/Juego" value={estadisticas.promedioHoras} icon="📈" />
        <StatCard title="Reseñas Escritas" value={estadisticas.totalReseñas} icon="✍️" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="card">
          <h2 style={{ marginBottom: '1.5rem' }}>🎮 Por Plataforma</h2>
          {Object.entries(estadisticas.plataformas).length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Object.entries(estadisticas.plataformas)
                .sort((a, b) => b[1] - a[1])
                .map(([plataforma, cantidad]) => (
                  <div key={plataforma}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span>{plataforma}</span>
                      <span style={{ fontWeight: '600' }}>{cantidad} juegos</span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '8px', 
                      backgroundColor: 'var(--surface-light)', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${(cantidad / estadisticas.totalJuegos) * 100}%`,
                        height: '100%',
                        backgroundColor: 'var(--primary-color)',
                        transition: 'width 0.3s'
                      }} />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>No hay datos disponibles</p>
          )}
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '1.5rem' }}>🎯 Por Género</h2>
          {Object.entries(estadisticas.generos).length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Object.entries(estadisticas.generos)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([genero, cantidad]) => (
                  <div key={genero}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span>{genero}</span>
                      <span style={{ fontWeight: '600' }}>{cantidad} juegos</span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '8px', 
                      backgroundColor: 'var(--surface-light)', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${(cantidad / estadisticas.totalJuegos) * 100}%`,
                        height: '100%',
                        backgroundColor: 'var(--secondary-color)',
                        transition: 'width 0.3s'
                      }} />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>No hay datos disponibles</p>
          )}
        </div>
      </div>

      {estadisticas.juegoMasJugado && (
        <div className="card">
          <h2 style={{ marginBottom: '1rem' }}>🏆 Juego Más Jugado</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <img 
              src={estadisticas.juegoMasJugado.portada} 
              alt={estadisticas.juegoMasJugado.titulo}
              style={{
                width: '150px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                {estadisticas.juegoMasJugado.titulo}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {estadisticas.juegoMasJugado.plataforma} • {estadisticas.juegoMasJugado.genero}
              </p>
              <p style={{ fontSize: '1.5rem', color: 'var(--primary-color)', fontWeight: '600' }}>
                ⏱️ {estadisticas.juegoMasJugado.horasJugadas} horas jugadas
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>⭐ Calificación Promedio</h2>
        <div style={{ fontSize: '3rem', color: 'var(--star-color)' }}>
          {estadisticas.promedioCalificacion} / 5.0
        </div>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Basado en {estadisticas.totalJuegos} juegos
        </p>
      </div>
    </div>
  );
};

export default EstadisticasPersonales;