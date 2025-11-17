// src/App.jsx
import AppRoutes from "./router/AppRouter";
import { ToastContainer } from "react-toastify";

// estilos globales
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <AppRoutes />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </BrowserRouter>
    </>
  );
}

export default App;
