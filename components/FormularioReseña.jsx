import { useState, useContext, useEffect } from 'react';
import { JuegosContext } from '../context/JuegosContext.jsx';

const FormularioReseña = ({ juegoId, reseñaEditar, onClose }) => {
  const { agregarReseña, actualizarReseña } = useContext(JuegosContext);
  const [formData, setFormData] = useState({
    juegoId: juegoId,
    titulo: '',
    contenido: '',
    puntuacion: 5,
    aspectosPositivos: [''],
    aspectosNegativos: ['']
  });

  useEffect(() => {
    if (reseñaEditar) {
      setFormData({
        ...reseñaEditar,
        aspectosPositivos: reseñaEditar.aspectosPositivos.length > 0 ? reseñaEditar.aspectosPositivos : [''],
        aspectosNegativos: reseñaEditar.aspectosNegativos.length > 0 ? reseñaEditar.aspectosNegativos : ['']
      });
    }
  }, [reseñaEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAspectoChange = (tipo, index, value) => {
    setFormData(prev => ({
      ...prev,
      [tipo]: prev[tipo].map((item, i) => i === index ? value : item)
    }));
  };

  const agregarAspecto = (tipo) => {
    setFormData(prev => ({
      ...prev,
      [tipo]: [...prev[tipo], '']
    }));
  };

  const eliminarAspecto = (tipo, index) => {
    setFormData(prev => ({
      ...prev,
      [tipo]: prev[tipo].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datos = {
        ...formData,
        aspectosPositivos: formData.aspectosPositivos.filter(a => a.trim() !== ''),
        aspectosNegativos: formData.aspectosNegativos.filter(a => a.trim() !== '')
      };

      if (reseñaEditar) {
        await actualizarReseña(reseñaEditar._id, datos);
      } else {
        await agregarReseña(datos);
      }
      onClose();
    } catch (error) {
      alert('Error al guardar la reseña: ' + error.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{reseñaEditar ? 'Editar Reseña' : 'Nueva Reseña'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título de la reseña *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Puntuación (1-5) *</label>
            <input
              type="number"
              name="puntuacion"
              value={formData.puntuacion}
              onChange={handleChange}
              min="1"
              max="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Contenido de la reseña *</label>
            <textarea
              name="contenido"
              value={formData.contenido}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Aspectos Positivos</label>
            {formData.aspectosPositivos.map((aspecto, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={aspecto}
                  onChange={(e) => handleAspectoChange('aspectosPositivos', index, e.target.value)}
                  placeholder="Ej: Excelente jugabilidad"
                />
                {formData.aspectosPositivos.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => eliminarAspecto('aspectosPositivos', index)}
                    style={{ padding: '0.5rem' }}
                  >
                    ✗
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => agregarAspecto('aspectosPositivos')}
              style={{ marginTop: '0.5rem' }}
            >
              + Agregar aspecto positivo
            </button>
          </div>

          <div className="form-group">
            <label>Aspectos Negativos</label>
            {formData.aspectosNegativos.map((aspecto, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={aspecto}
                  onChange={(e) => handleAspectoChange('aspectosNegativos', index, e.target.value)}
                  placeholder="Ej: Algunos bugs menores"
                />
                {formData.aspectosNegativos.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => eliminarAspecto('aspectosNegativos', index)}
                    style={{ padding: '0.5rem' }}
                  >
                    ✗
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => agregarAspecto('aspectosNegativos')}
              style={{ marginTop: '0.5rem' }}
            >
              + Agregar aspecto negativo
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary">
              {reseñaEditar ? 'Actualizar' : 'Publicar'}
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

export default FormularioReseña;