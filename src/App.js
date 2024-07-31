
import LoginPage from "./pages/Login.page";
import Main from "./pages/Main.page";
import CasosEquipo from "./pages/CasosEquipo.page";
import EmpleadosPage from "./pages/Empleados.page";
import UsuariosPage from "./pages/Usuarios.page";
import ClientePage from "./pages/Cliente.page";
import EquipoPage from "./pages/Equipo.page";
import GuiaDevolucionPage from "./pages/GuiaDevolucion.page";
import RefaccionPage from "./pages/Refaccion.page";
import AccionPage from "./pages/Accion.page";
import HoraExtraPage from "./pages/HoraExtra.page";
import NumeroOrdenPage from "./pages/NumeroOrden.page";
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/js/dist/dropdown';
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/inicio" element={<Main />} />
        {/*<Route path="/empleados" element={<EmpleadosPage />} />*/}
        <Route path="/casos_equipo" element={<CasosEquipo />} />
        <Route path="/clientes" element={<ClientePage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/equipo" element={<EquipoPage />}/>
        <Route path="/guia_devolucion" element={<GuiaDevolucionPage />}/>
        <Route path="/refaccion" element={<RefaccionPage />}/>
        <Route path="/accion" element={<AccionPage />}/>
        <Route path="/hora_extra" element={<HoraExtraPage />}/>
        <Route path="/numero_orden" element={<NumeroOrdenPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
