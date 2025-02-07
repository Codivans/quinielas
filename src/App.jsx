import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Quiniela from "./pages/Quiniela";
import Resultados from "./pages/Resultados";
import { CargarPartidos } from "./pages/CargarPartidos";
import AdminQuiniela from "./pages/AdminQuiniela";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/quiniela" element={<Quiniela />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/up" element={<CargarPartidos />} />
        <Route path="/adminResultados" element={<AdminQuiniela />} />
      </Routes>
    </Router>
  );
}

export default App;
