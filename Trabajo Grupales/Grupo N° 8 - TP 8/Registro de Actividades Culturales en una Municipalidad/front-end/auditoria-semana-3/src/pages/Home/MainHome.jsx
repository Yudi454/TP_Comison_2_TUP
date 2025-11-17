import { Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * Props:
 * - sections: [{ key, title, subtitle, route, icon? }]
 *
 * Si `icon` existe y es un elemento React, se muestra encima del título.
 * Si no, se muestra un recuadro sencillo con el título y subtítulo.
 */
function MainHome({ sections = [] }) {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h2 className="home-title">Panel de administración</h2>

      <Row className="g-3 mt-3">
        {sections.map((s) => (
          <Col key={s.key} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="home-card h-100"
              role="button"
              tabIndex={0}
              onClick={() => navigate(s.route)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate(s.route);
              }}
            >
              <Card.Body className="d-flex flex-column align-items-start">
                <div className="home-card-icon">
                  {s.icon ? (
                    // si pasaron un elemento/icono, lo renderizamos
                    s.icon
                  ) : (
                    // fallback: primera letra en un círculo
                    <div className="home-card-fallback">
                      {typeof s.title === "string"
                        ? s.title.charAt(0).toUpperCase()
                        : "·"}
                    </div>
                  )}
                </div>

                <div className="mt-3 w-100">
                  <Card.Title className="mb-1 home-card-title">
                    {s.title}
                  </Card.Title>
                  {s.subtitle && (
                    <Card.Text className="home-card-subtitle">
                      {s.subtitle}
                    </Card.Text>
                  )}
                </div>

                <div className="mt-auto w-100 text-end">
                  <small className="text-muted">Ir →</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MainHome;
