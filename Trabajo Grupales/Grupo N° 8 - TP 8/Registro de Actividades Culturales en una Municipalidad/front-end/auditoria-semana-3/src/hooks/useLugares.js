import axios from "axios";
import { toast } from "react-toastify";
import { lugares } from "../endpoint/endpoints";

// Obtener todos
export const getLugares = async (token) => {
  try {
    const res = await axios.get(lugares.get_lugares, {
      headers: { Authorization: token },
    });
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Error obteniendo lugares");
    return null;
  }
};

// Obtener uno
export const getLugar = async (id_lugar, token) => {
  try {
    const res = await axios.get(lugares.get_one_lugar(id_lugar), {
      headers: { Authorization: token },
    });
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Error obteniendo lugar");
    return null;
  }
};

// Crear
export const createLugar = async (data, token) => {
  try {
    const res = await axios.post(lugares.create_lugar, data, {
      headers: { Authorization: token },
    });
    toast.success("Lugar creado correctamente");
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.error || "Error creando lugar");
    return null;
  }
};

// Actualizar
export const updateLugar = async (id_lugar, data, token) => {
  try {
    const res = await axios.put(lugares.update_lugar(id_lugar), data, {
      headers: { Authorization: token },
    });
    toast.success("Lugar actualizado correctamente");
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Error actualizando lugar");
    return null;
  }
};

// Eliminar
export const deleteLugar = async (id_lugar, token) => {
  try {
    const res = await axios.delete(lugares.delete_lugar(id_lugar), {
      headers: { Authorization: token },
    });
    toast.success("Lugar eliminado correctamente");
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Error eliminando lugar");
    return null;
  }
};
