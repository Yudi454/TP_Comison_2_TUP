import React, { useState, useEffect } from "react";
import MainVentas from "./MainVentas";
import { toast } from "react-toastify";
import {
  getVentas,
  getVenta,
  getVentasPorEvento,
  createVenta,
  totalVentasPorEventos,
  totalVentasPorEvento,
} from "../../hooks/useVentas";

export default function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [ventaBuscada, setVentaBuscada] = useState(null);
  const [ventasEvento, setVentasEvento] = useState([]);
  const [totales, setTotales] = useState([]);
  const [totalesEvento, setTotalesEvento] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState({
    id_evento: "",
    id_usuario: "",
    cantidad_boletos: 1,
    metodo_pago: "",
  });

  const [ventaId, setVentaId] = useState("");
  const [idEvento, setIdEvento] = useState("");

  const token = localStorage.getItem("token") || undefined;

  // Obtener todas las ventas
  const fetchVentas = async () => {
    try {
      setLoading(true);
      const data = await getVentas(token);
      setVentas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener totales por eventos
  const fetchTotales = async () => {
    try {
      const data = await totalVentasPorEventos(token);
      setTotales(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVentas();
    fetchTotales();
  }, []);

  // Crear venta
  const openCreate = () => {
    setCurrent({
      id_evento: "",
      id_usuario: "",
      cantidad_boletos: 1,
      metodo_pago: "",
    });
    setShowModal(true);
  };

  const handleChange = (name, value) => {
    setCurrent((c) => ({ ...c, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createVenta(current, token);
      setShowModal(false);
      fetchVentas();
      fetchTotales();
    } catch (err) {
      console.error(err);
    }
  };

  // Buscar venta por id
  const handleBuscarVenta = async () => {
    if (!ventaId) return toast.error("Ingrese id de venta");
    const data = await getVenta(ventaId, token);
    setVentaBuscada(data);
  };

  // Obtener ventas por evento
  const handleBuscarPorEvento = async () => {
    if (!idEvento) return toast.error("Ingrese id de evento");
    const data = await getVentasPorEvento(idEvento, token);
    console.log(data);
    
    setVentasEvento(data || []);
    const tot = await totalVentasPorEvento(idEvento, token);
    console.log(tot);
    
    setTotalesEvento(tot || null);
  };

  return (
    <MainVentas
      ventas={ventas}
      ventaBuscada={ventaBuscada}
      ventasEvento={ventasEvento}
      totales={totales}
      totalesEvento={totalesEvento}
      loading={loading}
      showModal={showModal}
      onOpenCreate={openCreate}
      onCloseModal={() => setShowModal(false)}
      current={current}
      onChange={handleChange}
      onSubmit={handleSubmit}
      ventaId={ventaId}
      setVentaId={setVentaId}
      idEvento={idEvento}
      setIdEvento={setIdEvento}
      onBuscarVenta={handleBuscarVenta}
      onBuscarPorEvento={handleBuscarPorEvento}
    />
  );
}
