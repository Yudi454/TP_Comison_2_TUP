import React, { useState } from "react";
import { registrar } from "../../../hooks/useUsuarios";
import { toast } from "react-toastify";
import MainRegistro from "./MainRegister";
import "../../../styles/auth/register.css";

import { useNavigate } from "react-router-dom"; // descomentar si querés redirigir

const Registro = () => {
  const navigate = useNavigate(); // opcional

  const [form, setForm] = useState({
    nombre_usuario: "",
    email_usuario: "",
    password_usuario: "",
    rol_usuario: "empleado",
  });

  const [errors, setErrors] = useState({});

  const MIN_NOMBRE = 3;
  const MAX_NOMBRE = 100;
  const MIN_PASS = 6;
  const MAX_PASS = 255;

  const handleChange = (name, value) => {
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((e) => ({ ...e, [name]: null }));
  };

  const validar = () => {
    const newErr = {};
    if (
      !form.nombre_usuario ||
      form.nombre_usuario.trim().length < MIN_NOMBRE
    ) {
      newErr.nombre_usuario = `Nombre mínimo ${MIN_NOMBRE} caracteres`;
    } else if (form.nombre_usuario.length > MAX_NOMBRE) {
      newErr.nombre_usuario = `Nombre máximo ${MAX_NOMBRE} caracteres`;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email_usuario || !emailRegex.test(form.email_usuario)) {
      newErr.email_usuario = "Email inválido";
    }

    if (!form.password_usuario || form.password_usuario.length < MIN_PASS) {
      newErr.password_usuario = `Contraseña mínimo ${MIN_PASS} caracteres`;
    } else if (form.password_usuario.length > MAX_PASS) {
      newErr.password_usuario = `Contraseña máximo ${MAX_PASS} caracteres`;
    }

    if (!form.rol_usuario) {
      newErr.rol_usuario = "Seleccioná un rol";
    }

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleClear = () => {
    setForm({
      nombre_usuario: "",
      email_usuario: "",
      password_usuario: "",
      rol_usuario: "empleado",
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!validar()) {
      toast.error("Corregí los errores del formulario");
      return;
    }

    try {
      await registrar({
        nombre_usuario: form.nombre_usuario.trim(),
        mail_usuario: form.email_usuario.trim(),
        password_usuario: form.password_usuario,
        rol_usuario: form.rol_usuario,
      });

      toast.success("Registro exitoso");
      handleClear();
      navigate("/login"); // descomentar si querés redirigir al login
    } catch (err) {
      // registrar ya muestra toast de error; opcional: mapear errores por campo si backend los devuelve
      if (err.response?.data?.errors) {
        // ejemplo de mapping si el backend devuelve errores por campo
        const backendErrors = {};
        err.response.data.errors.forEach((it) => {
          if (it.param) backendErrors[it.param] = it.msg;
        });
        setErrors((prev) => ({ ...prev, ...backendErrors }));
      }
    }
  };

  return (
    <MainRegistro
      form={form}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClear={handleClear}
      navigate={navigate}
    />
  );
};
export default Registro;
