import React from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

/**
 * Props:
 * - form: { nombre_usuario, email_usuario, password_usuario, rol_usuario }
 * - errors: { nombre_usuario?, email_usuario?, password_usuario?, rol_usuario? }
 * - onChange(name, value)
 * - onSubmit(event)
 * - onClear()
 */

const MainRegistro = ({
  form,
  errors = {},
  onChange,
  onSubmit,
  onClear,
  navigate,
}) => {
  return (
    <Row className="justify-content-center registro-row">
      <Col md={8} lg={6}>
        <Card className="registro-card shadow-sm">
          <Card.Body>
            <div className="registro-header">
              <h2 className="registro-title">Registro</h2>
              <p className="registro-subtitle">
                Creá tu cuenta para acceder al sistema
              </p>
            </div>

            <Form onSubmit={onSubmit} noValidate>
              <Form.Group className="mb-3" controlId="nombre_usuario">
                <Form.Label>Nombre y apellido</Form.Label>
                <Form.Control
                  name="nombre_usuario"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  required
                  value={form.nombre_usuario}
                  onChange={(e) => onChange("nombre_usuario", e.target.value)}
                  isInvalid={!!errors.nombre_usuario}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre_usuario}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="email_usuario">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email_usuario"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  required
                  value={form.email_usuario}
                  onChange={(e) => onChange("email_usuario", e.target.value)}
                  isInvalid={!!errors.email_usuario}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email_usuario}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password_usuario">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  name="password_usuario"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  required
                  value={form.password_usuario}
                  onChange={(e) => onChange("password_usuario", e.target.value)}
                  isInvalid={!!errors.password_usuario}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password_usuario}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="rol_usuario">
                <Form.Label>Rol</Form.Label>
                <Form.Select
                  name="rol_usuario"
                  value={form.rol_usuario}
                  onChange={(e) => onChange("rol_usuario", e.target.value)}
                  isInvalid={!!errors.rol_usuario}
                >
                  <option value="empleado">Empleado</option>
                  <option value="asistente">Asistente</option>
                  <option value="admin">Administrador</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.rol_usuario}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="outline-secondary" onClick={onClear}>
                  Limpiar
                </Button>
                <Button variant="primary" type="submit">
                  Registrarme
                </Button>
              </div>
            </Form>
          </Card.Body>

          <Card.Footer className="text-center registro-footer">
            <small>Al registrarte aceptás los términos y condiciones.</small>
          </Card.Footer>
          <Card.Footer className="text-center login-footer">
            <small>
              ¿Ya tienes una cuenta?{" "}
              <a onClick={() => navigate("/login")} >
                Inicia Sesión
              </a>
            </small>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default MainRegistro;
