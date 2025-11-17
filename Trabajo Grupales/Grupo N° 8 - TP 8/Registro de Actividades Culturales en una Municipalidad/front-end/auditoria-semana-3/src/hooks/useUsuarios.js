import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "../endpoint/endpoints";
import { password } from "../endpoint/endpoints";

export const registrar = async (usuario) => {
  try {
    const { data } = await axios.post(auth.registro, usuario);
    toast.success("Usuario registrado correctamente");
    return data;
  } catch (err) {
    console.log(err);
    const msg = err.response?.data?.message || "Error en el registro";
    toast.error(msg);
    throw err;
  }
};

export const login = async (credenciales) => {
  try {
    const { data } = await axios.post(auth.login, credenciales);
    toast.success("Inicio de sesión exitoso");
    return data; // token + info usuario
  } catch (err) {
    console.log(err);

    const msg = err.response?.data?.message || "Error en el inicio de sesión";
    toast.error(msg);
    throw err;
  }
};

// Enviar email de recuperación
export const recuperarContraseña = async (email) => {
  try {
    const { data } = await axios.post(password.recuperar_contraseña, { email });
    toast.success("Correo enviado con instrucciones de recuperación");
    return data;
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      "Error al enviar el correo de recuperación";
    toast.error(msg);
    throw err;
  }
};

// Resetear contraseña con token
export const resetearContraseña = async (token, nuevaContraseña) => {
  try {
    const { data } = await axios.put(password.resetear_contraseña(token), {
      password: nuevaContraseña,
    });
    toast.success("Contraseña restablecida correctamente");
    return data;
  } catch (err) {
    const msg =
      err.response?.data?.message || "Error al restablecer la contraseña";
    toast.error(msg);
    throw err;
  }
};
