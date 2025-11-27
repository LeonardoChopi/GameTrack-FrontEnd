import { BrowserRouter, Routes, Route } from "react-router-dom";
import BibliotecaJuegos from "../pages/BibliotecaJuegos";
import DetalleJuego from "../pages/DetalleJuego";
import EstadisticasPersonales from "../pages/EstadisticasPersonales";

export default function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BibliotecaJuegos />} />
        <Route path="/juego/:id" element={<DetalleJuego />} />
        <Route path="/stats" element={<EstadisticasPersonales />} />
      </Routes>
    </BrowserRouter>
  );
}
