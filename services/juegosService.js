const API = "http://localhost:3000/api/juegos";

const juegosService = {
  obtenerJuegos: async () => {
    const res = await fetch(API);
    return await res.json();
  },

  obtenerJuego: async (id) => {
    const res = await fetch(`${API}/${id}`);
    return await res.json();
  },

  crearJuego: async (data) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  }
};

export default juegosService;
