// src/hooks/useEventos.js
import axios from "axios";
import { toast } from "react-toastify";
import { eventos } from "../endpoint/endpoints";

/**
 * Obtener todos los eventos activos
 * token: opcional (si tu backend lo requiere)
 */
export const getEventos = async (token) => {
  try {
    const config = token ? { headers: { Authorization: token } } : undefined;
    const { data } = await axios.get(eventos.get_eventos, config);
    return data;
  } catch (err) {
    const msg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Error al obtener eventos";
    toast.error(msg);
    throw err;
  }
};

/**
 * Obtener un evento por id
 * id: id_evento
 * token: opcional
 */
export const getOneEvento = async (id, token) => {
  try {
    const url = eventos.get_one_evento(id);
    const config = token ? { headers: { Authorization: token } } : undefined;
    const { data } = await axios.get(url, config);
    return data;
  } catch (err) {
    const msg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Error al obtener evento";
    toast.error(msg);
    throw err;
  }
};

/**
 * Crear evento
 * data: {
 *   nombre_evento,
 *   fecha_inicio_evento,
 *   fecha_fin_evento,
 *   id_lugar,
 *   precio_entrada_evento,
 *   cupo_maximo_evento? (si aplica)
 * }
 * token: opcional
 */
export const createEvento = async (data, token) => {
  try {
    const config = token ? { headers: { Authorization: token } } : undefined;
    const res = await axios.post(eventos.create_evento, data, config);
    toast.success("Evento creado correctamente");
    return res.data;
  } catch (err) {
    const msg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Error al crear evento";
    toast.error(msg);
    throw err;
  }
};

/**
 * updateEvento(id, data, token)
 * id: id_evento
 * data: campos a actualizar (mismos nombres que en controller)
 * token: opcional
 */
export const updateEvento = async (id, data, token) => {
  try {
    const url = eventos.update_evento(id);
    const config = token ? { headers: { Authorization: token } } : undefined;
    const res = await axios.put(url, data, config);
    toast.success("Evento actualizado correctamente");
    return res.data;
  } catch (err) {
    const msg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Error al actualizar evento";
    toast.error(msg);
    throw err;
  }
};

/**
 * deleteEvento(id, token)
 * hace borrado lógico según tu controller
 */
export const deleteEvento = async (id, token) => {
  try {
    const url = eventos.delete_evento(id);
    const config = token ? { headers: { Authorization: token } } : undefined;
    const res = await axios.delete(url, config);
    toast.success("Evento eliminado correctamente");
    return res.data;
  } catch (err) {
    const msg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Error al eliminar evento";
    toast.error(msg);
    throw err;
  }
};

/**
 * agregarArtistaEvento(data, token)
 * data: { id_evento, id_artista, rol_artista_evento? }
 */
export const agregarArtistaEvento = async (data, token) => {
  try {
    const config = token ? { headers: { Authorization: token } } : undefined;
    const res = await axios.post(eventos.agregar_artista, data, config);
    toast.success("Artista agregado al evento");
    return res.data;
  } catch (err) {
    const msg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Error al agregar artista al evento";
    toast.error(msg);
    throw err;
  }
};

/**
 * venderBoleto(data, token)
 * data: { id_evento, id_usuario, cantidad_boletos, metodo_pago }
 */
export const venderBoleto = async (data, token) => {
  try {
    const config = token ? { headers: { Authorization: token } } : undefined;
    const res = await axios.post(eventos.vender_boleto, data, config);
    toast.success("Venta registrada correctamente");
    return res.data;
  } catch (err) {
    const msg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Error al registrar venta";
    toast.error(msg);
    throw err;
  }
};
