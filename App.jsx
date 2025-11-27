import Rutas from "./router/router";
import { JuegosProvider } from "./context/JuegosContext";
import "./styles/global.css";

export default function App() {
  return (
    <JuegosProvider>
      <Rutas />
    </JuegosProvider>
  );
}
