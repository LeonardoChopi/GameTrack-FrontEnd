import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import BibliotecaJuegos from './pages/BibliotecaJuegos'
import DetalleJuego from './pages/DetalleJuego'
import EstadisticasPersonales from './pages/EstadisticasPersonales'


function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Inicio />} />
<Route path="/biblioteca" element={<BibliotecaJuegos />} />
<Route path="/juego/:id" element={<DetalleJuego />} />
<Route path="/estadisticas" element={<EstadisticasPersonales />} />
</Routes>
</BrowserRouter>
)
}


export default App