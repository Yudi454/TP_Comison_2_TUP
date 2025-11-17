import { Routes, Route } from "react-router-dom";

// Páginas principales (listas)

import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login/Login";
import Registro from "../pages/auth/Registro/Register";
import Artistas from "../pages/artistas/Artistas";
import Lugares from "../pages/lugares/Lugares";
import Eventos from "../pages/eventos/Eventos";
import Ventas from "../pages/ventas/ventas";
import RecuperarPassword from "../pages/recuperarContraseña/RecuperarContraseña";
import ResetearPassword from "../pages/recuperarContraseña/CambiarContraseña";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Registro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/artistas" element={<Artistas />} />
      <Route path="/lugares" element={<Lugares />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/ventas" element={<Ventas />} />
      <Route path="/recuperarContrasena" element={<RecuperarPassword />} />
      <Route path="/resetearCotrasena/:token" element={<ResetearPassword />} />
    </Routes>
  );
}

export default AppRoutes;
