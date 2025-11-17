// src/hooks/useArtistas.js
import axios from "axios";
import { toast } from "react-toastify";
import { artistas } from "../endpoint/endpoints";

/**
 * getArtistas()
 * - no recibe params
 * - token opcional (si tu backend lo requiere, pasalo)
 */
export const getArtistas = async (token) => {
  try {
    const config = token ? { headers: { Authorization: token } } : undefined;
    const { data } = await axios.get(artistas.get_artistas, config);
    return data;
  } catch (err) {
    const msg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Error al obtener artistas";
    toast.error(msg);
    throw err;
  }
};

/**
 * getOneArtista(id)
 * - id: id_artista
 * - token opcional
 */
export const getOneArtista = async (id, token) => {
  try {
    const url = artistas.get_one_artista(id);
    const config = token ? { headers: { Authorization: token } } : undefined;
    const { data } = await axios.get(url, config);
    return data;
  } catch (err) {
    const msg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Error al obtener artista";
    toast.error(msg);
    throw err;
  }
};

/**
 * getArtistaEvento(id_evento)
 * - id_evento: id del evento
 * - token opcional
 */
export const getArtistaEvento = async (id_evento, token) => {
  try {
    const url = artistas.get_artista_evento(id_evento);
    const config = token ? { headers: { Authorization: token } } : undefined;
    const { data } = await axios.get(url, config);
    return data;
  } catch (err) {
    console.log(err);
    
    const msg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Error al obtener artistas del evento";
    toast.error(msg);
    throw err;
  }
};

/**
 * createArtista(data, token)
 * - data: objeto con los campos del artista (body)
 * - token requerido (si tu backend lo exige)
 */
export const createArtista = async (data, token) => {
  try {
    const config = token ? { headers: { Authorization: token } } : undefined;
    const res = await axios.post(artistas.create_artista, data, config);
    toast.success("Artista creado correctamente");
    return res.data;
  } catch (err) {
    console.log(err);
    
    const msg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Error al crear artista";
    toast.error(msg);
    throw err;
  }
};

/**
 * updateArtista(id, data, token)
 * - id: id_artista
 * - data: body con campos a actualizar
 * - token requerido (si backend lo exige)
 */
export const updateArtista = async (id, data, token) => {
  try {
    const url = artistas.update_artista(id);
    const config = token ? { headers: { Authorization: token } } : undefined;
    const res = await axios.put(url, data, config);
    toast.success("Artista actualizado correctamente");
    return res.data;
  } catch (err) {
    const msg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Error al actualizar artista";
    toast.error(msg);
    throw err;
  }
};

/**
 * deleteArtista(id, token)
 * - id: id_artista
 * - token requerido (si backend lo exige)
 * (hace borrado lógico según tu controller)
 */
export const deleteArtista = async (id, token) => {
  try {
    const url = artistas.delete_artista(id);
    const config = token ? { headers: { Authorization: token } } : undefined;
    const res = await axios.delete(url, config);
    toast.success("Artista eliminado correctamente");
    return res.data;
  } catch (err) {
    const msg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Error al eliminar artista";
    toast.error(msg);
    throw err;
  }
};
