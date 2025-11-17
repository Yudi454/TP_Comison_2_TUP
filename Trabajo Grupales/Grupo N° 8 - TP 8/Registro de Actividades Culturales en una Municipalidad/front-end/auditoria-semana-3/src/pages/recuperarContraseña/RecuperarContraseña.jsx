import React, { useState } from "react";
import { Button, Form, Card, Spinner } from "react-bootstrap";
import { recuperarContraseña } from "../../hooks/useUsuarios";

const RecuperarPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Ingrese un correo");

    try {
      setLoading(true);
      await recuperarContraseña(email);
      setEmail("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <h4 className="mb-3 text-center">Recuperar Contraseña</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" className="w-100" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Enviar enlace"}
        </Button>
      </Form>
    </Card>
  );
}

export default RecuperarPassword