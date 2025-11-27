const API_URL = 'http://localhost:5000/api/resenas';

export const obtenerReseñas = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener reseñas');
  return response.json();
};

export const obtenerReseñasPorJuego = async (juegoId) => {
  const response = await fetch(`${API_URL}/juego/${juegoId}`);
  if (!response.ok) throw new Error('Error al obtener reseñas');
  return response.json();
};

export const obtenerReseñaPorId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Error al obtener reseña');
  return response.json();
};

export const crearReseña = async (datosReseña) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosReseña)
  });
  if (!response.ok) throw new Error('Error al crear reseña');
  return response.json();
};

export const actualizarReseña = async (id, datosReseña) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosReseña)
  });
  if (!response.ok) throw new Error('Error al actualizar reseña');
  return response.json();
};

export const eliminarReseña = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar reseña');
  return response.json();
};