import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Card, Spinner } from "react-bootstrap";
import { resetearContraseña } from "../../hooks/useUsuarios";

const ResetearPassword = () => {
  const { token } = useParams(); // token viene de la URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword)
      return alert("Complete todos los campos");
    if (password !== confirmPassword)
      return alert("Las contraseñas no coinciden");

    try {
      setLoading(true);
      await resetearContraseña(token, password);
      setPassword("");
      setConfirmPassword("");
      navigate("/login"); // redirige al login después del cambio
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <h4 className="mb-3 text-center">Restablecer Contraseña</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nueva contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repita la contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" className="w-100" disabled={loading}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Restablecer contraseña"
          )}
        </Button>
      </Form>
    </Card>
  );
}

export default ResetearPassword