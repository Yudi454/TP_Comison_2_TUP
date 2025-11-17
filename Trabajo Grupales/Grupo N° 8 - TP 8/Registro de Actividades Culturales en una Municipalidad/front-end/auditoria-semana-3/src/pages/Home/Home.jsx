import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainHome from "./MainHome";
import "../../styles/home/home.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Define las secciones que mostrar en el home.
  // Si querés pasar un icono, pon icon: <MiIcon /> (debes importar el icono y usarlo aquí).
  const sections = [
    {
      key: "artistas",
      title: "Artistas",
      route: "/artistas",
      subtitle: "Gestionar artistas",
    },
    {
      key: "lugares",
      title: "Lugares",
      route: "/lugares",
      subtitle: "Sedes y capacidad",
    },
    {
      key: "eventos",
      title: "Eventos",
      route: "/eventos",
      subtitle: "Crear y administrar eventos",
    },
    {
      key: "ventas",
      title: "Ventas",
      route: "/ventas",
      subtitle: "Registrar ventas y estadísticas",
    },
  ];

  return <MainHome sections={sections} />;
};

export default Home;
