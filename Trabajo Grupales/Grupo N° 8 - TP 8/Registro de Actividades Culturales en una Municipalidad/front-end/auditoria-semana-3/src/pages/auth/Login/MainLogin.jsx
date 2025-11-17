import { Row, Col, Card, Form, Button } from "react-bootstrap";

/**
 * Props:
 * - form: { email_usuario, password_usuario }
 * - errors: { email_usuario?, password_usuario? }
 * - onChange(name, value)
 * - onSubmit(event)
 * - onClear()
 */

function MainLogin({
  form,
  errors = {},
  onChange,
  onSubmit,
  onClear,
  navigate,
}) {
  return (
    <Row className="justify-content-center login-row">
      <Col md={8} lg={5}>
        <Card className="login-card shadow-sm">
          <Card.Body>
            <div className="login-header">
              <h2 className="login-title">Iniciar sesión</h2>
              <p className="login-subtitle">
                Ingresá con tu usuario y contraseña
              </p>
            </div>

            <Form onSubmit={onSubmit} noValidate>
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

              <Form.Group className="mb-4" controlId="password_usuario">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  name="password_usuario"
                  type="password"
                  placeholder="Contraseña"
                  required
                  value={form.password_usuario}
                  onChange={(e) => onChange("password_usuario", e.target.value)}
                  isInvalid={!!errors.password_usuario}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password_usuario}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="outline-secondary" onClick={onClear}>
                  Limpiar
                </Button>
                <Button variant="primary" type="submit">
                  Entrar
                </Button>
              </div>
            </Form>
          </Card.Body>
          <Card.Footer className="text-center login-footer">
            <small>
              <a onClick={() => navigate("/recuperarContraseña")}>Recuperar Contraseña</a>
            </small>
          </Card.Footer>
          <Card.Footer className="text-center login-footer">
            <small>
              ¿No tenés cuenta?{" "}
              <a onClick={() => navigate("/register")}>Registrate</a>
            </small>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

export default MainLogin;
