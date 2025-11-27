const API = "http://localhost:4000/api/juegos";

export const obtenerJuegos = async () => {
  const res = await fetch(API);
  return res.json();
};

export const crearJuego = async (data) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
