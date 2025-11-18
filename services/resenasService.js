const API = "http://localhost:3000/api/resenas";

const resenasService = {
  obtenerResenas: async (juegoId) => {
    const res = await fetch(`${API}/${juegoId}`);
    return await res.json();
  },

  crearResena: async (juegoId, data) => {
    const res = await fetch(`${API}/${juegoId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  }
};

export default resenasService;
