import { useState, useContext, useEffect } from 'react';
import { JuegosContext } from '../context/JuegosContext.jsx';

const FormularioJuego = ({ juegoEditar, onClose }) => {
  const { agregarJuego, actualizarJuego } = useContext(JuegosContext);
  const [formData, setFormData] = useState({
    titulo: '',
    portada: '',
    plataforma: '',
    genero: '',
    fechaLanzamiento: '',
    puntuacion: 0,
    horasJugadas: 0,
    completado: false,
    desarrollador: '',
    notas: ''
  });

  useEffect(() => {
    if (juegoEditar) {
      setFormData({
        ...juegoEditar,
        fechaLanzamiento: juegoEditar.fechaLanzamiento ? 
          new Date(juegoEditar.fechaLanzamiento).toISOString().split('T')[0] : ''
      });
    }
  }, [juegoEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (juegoEditar) {
        await actualizarJuego(juegoEditar._id, formData);
      } else {
        await agregarJuego(formData);
      }
      onClose();
    } catch (error) {
      alert('Error al guardar el juego: ' + error.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{juegoEditar ? 'Editar Juego' : 'Agregar Nuevo Juego'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>URL de Portada</label>
            <input
              type="url"
              name="portada"
              value={formData.portada}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="form-group">
            <label>Plataforma *</label>
            <select name="plataforma" value={formData.plataforma} onChange={handleChange} required>
              <option value="">Seleccionar...</option>
              <option value="PC">PC</option>
              <option value="PlayStation 5">PlayStation 5</option>
              <option value="Xbox Series X/S">Xbox Series X/S</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>

          <div className="form-group">
            <label>Género *</label>
            <input
              type="text"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              placeholder="Ej: Acción, RPG, Estrategia"
              required
            />
          </div>

          <div className="form-group">
            <label>Fecha de Lanzamiento</label>
            <input
              type="date"
              name="fechaLanzamiento"
              value={formData.fechaLanzamiento}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Desarrollador</label>
            <input
              type="text"
              name="desarrollador"
              value={formData.desarrollador}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Puntuación (0-5)</label>
            <input
              type="number"
              name="puntuacion"
              value={formData.puntuacion}
              onChange={handleChange}
              min="0"
              max="5"
              step="1"
            />
          </div>

          <div className="form-group">
            <label>Horas Jugadas</label>
            <input
              type="number"
              name="horasJugadas"
              value={formData.horasJugadas}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                name="completado"
                checked={formData.completado}
                onChange={handleChange}
                style={{ width: 'auto' }}
              />
              Completado
            </label>
          </div>

          <div className="form-group">
            <label>Notas</label>
            <textarea
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary">
              {juegoEditar ? 'Actualizar' : 'Agregar'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioJuego;