import React, { useState } from "react";
import { toast } from "react-toastify";
import MainLogin from "./MainLogin";
import { useNavigate } from "react-router-dom";
import "../../../styles/auth/login.css";
import { login } from "../../../hooks/useUsuarios";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email_usuario: "",
    password_usuario: "",
  });

  const [errors, setErrors] = useState({});

  const MIN_PASS = 6;

  const handleChange = (name, value) => {
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((e) => ({ ...e, [name]: null }));
  };

  const validar = () => {
    const newErr = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email_usuario || !emailRegex.test(form.email_usuario)) {
      newErr.email_usuario = "Email inválido";
    }
    if (!form.password_usuario || form.password_usuario.length < MIN_PASS) {
      newErr.password_usuario = `Contraseña mínimo ${MIN_PASS} caracteres`;
    }
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!validar()) {
      toast.error("Corregí los errores del formulario");
      return;
    }

    try {
      const data = await login({
        mail_usuario: form.email_usuario.trim(),
        password_usuario: form.password_usuario,
      });

      // si tu backend devuelve token aquí lo guardás
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      toast.success("Ingreso exitoso");
      navigate("/"); // descomentar si querés redirigir al home
    } catch (err) {
      // useLogin ya muestra toast con el error
      console.error("login error", err);
    }
  };

  const handleClear = () => {
    setForm({ email_usuario: "", password_usuario: "" });
    setErrors({});
  };

  return (
    <MainLogin
      form={form}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClear={handleClear}
      navigate={navigate}
    />
  );
};

export default Login;
