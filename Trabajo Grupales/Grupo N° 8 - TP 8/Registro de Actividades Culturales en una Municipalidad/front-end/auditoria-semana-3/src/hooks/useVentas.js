// src/services/ventas.js
import axios from "axios";
import { toast } from "react-toastify";
import { venta_boletos } from "../endpoint/endpoints";

/**
 * Obtener todas las ventas activas
 * token: opcional
 */
export const getVentas = async (token) => {
  try {
    const config = token ? { headers: { Authorization: token } } : undefined;
    const res = await axios.get(venta_boletos.get_ventas, config);
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Error obteniendo ventas");
    return null;
  }
};

/**
 * Obtener una venta por id_venta_boleto
 * id_venta_boleto: required
 * token: opcional
 */
export const getVenta = async (id_venta_boleto, token) => {
  try {
    const url = venta_boletos.get_one_venta(id_venta_boleto);
    const config = token ? { headers: { Authorization: token } } : undefined;
    const res = await axios.get(url, config);
    return res.data;
  } catch (error) {
    console.log(error);

    toast.error(error.response?.data?.error || "Error obteniendo la venta");
    return null;
  }
};

/**
 * Obtener ventas por id_evento
 * id_evento: required
 * token: opcional
 */
export const getVentasPorEvento = async (id_evento, token) => {
  try {
    const url = venta_boletos.get_venta_evento(id_evento);
    const config = token ? { headers: { Authorization: token } } : undefined;
    const res = await axios.get(url, config);
    
    return res.data;
  } catch (error) {
    console.log(error);
    
    toast.error(
      error.response?.data?.error || "Error obteniendo ventas por evento"
    );
    return null;
  }
};

/**
 * Crear una venta
 * data: { id_evento, id_usuario, cantidad_boletos, metodo_pago }
 * token: opcional
 */
export const createVenta = async (data, token) => {
  try {
    const config = token ? { headers: { Authorization: token } } : undefined;
    const res = await axios.post(venta_boletos.create_venta, data, config);
    toast.success("Venta registrada correctamente");
    return res.data;
  } catch (error) {
    console.log(error);

    const msg =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Error registrando la venta";
    toast.error(msg);
    return null;
  }
};

/**
 * Total de ventas por todos los eventos
 * token: opcional
 */
export const totalVentasPorEventos = async (token) => {
  try {
    const config = token ? { headers: { Authorization: token } } : undefined;
    const res = await axios.get(venta_boletos.get_total_eventos, config);
    console.log(res);
    return res.data;
    
  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data?.error || "Error obteniendo totales por eventos"
    );
    return null;
  }
};

/**
 * Total de ventas para un solo evento
 * id_evento: required
 * token: opcional
 */
export const totalVentasPorEvento = async (id_evento, token) => {
  try {
    const url = venta_boletos.get_total_evento(id_evento);
    const config = token ? { headers: { Authorization: token } } : undefined;
    const res = await axios.get(url, config);
    
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data?.error || "Error obteniendo totales del evento"
    );
    return null;
  }
};
