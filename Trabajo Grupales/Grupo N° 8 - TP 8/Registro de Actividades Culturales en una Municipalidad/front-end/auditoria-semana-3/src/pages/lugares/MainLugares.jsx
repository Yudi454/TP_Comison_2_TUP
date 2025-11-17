import React from "react";
import { Table, Button, Modal, Form, Row, Col, Spinner } from "react-bootstrap";

const MainLugares = ({
  lugares = [],
  lugarBuscado,
  loading = false,
  showModal,
  modalMode,
  current,
  onChange,
  onSubmit,
  onOpenCreate,
  onCloseModal,
  lugarId,
  setLugarId,
  onBuscarLugar,
  onDelete,
  onOpenEdit,
}) => {
  return (
    <div className="lugares-page">
      <Row className="mb-3 align-items-center">
        <Col>
          <h3>Lugares</h3>
        </Col>
        <Col className="text-end">
          <Button onClick={onOpenCreate}>Crear Lugar</Button>
        </Col>
      </Row>

      {/* Buscar lugar */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Buscar por ID de lugar"
            value={lugarId}
            onChange={(e) => setLugarId(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button onClick={onBuscarLugar}>Buscar</Button>
        </Col>
      </Row>

      {lugarBuscado && (
        <Table bordered hover responsive className="mb-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Dirección</th>
              <th>Contacto Nombre</th>
              <th>Contacto Teléfono</th>
              <th>Contacto Email</th>
              <th>Equipamiento</th>
              <th>Capacidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{lugarBuscado.id_lugar}</td>
              <td>{lugarBuscado.nombre_lugar}</td>
              <td>{lugarBuscado.tipo_lugar || "-"}</td>
              <td>{lugarBuscado.direccion_lugar || "-"}</td>
              <td>{lugarBuscado.contacto_nombre_lugar || "-"}</td>
              <td>{lugarBuscado.contacto_telefono_lugar || "-"}</td>
              <td>{lugarBuscado.contacto_email_lugar || "-"}</td>
              <td>{lugarBuscado.equipamiento_lugar || "-"}</td>
              <td>{lugarBuscado.capacidad_maxima_lugar || "-"}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => onOpenEdit(lugarBuscado.id_lugar)}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => onDelete(lugarBuscado.id_lugar)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      )}

      {/* Todos los lugares */}
      <h5>Todos los lugares</h5>
      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table bordered hover responsive className="mb-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Dirección</th>
              <th>Contacto Nombre</th>
              <th>Contacto Teléfono</th>
              <th>Contacto Email</th>
              <th>Equipamiento</th>
              <th>Capacidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lugares.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center">
                  No hay lugares
                </td>
              </tr>
            ) : (
              lugares.map((l) => (
                <tr key={l.id_lugar}>
                  <td>{l.id_lugar}</td>
                  <td>{l.nombre_lugar}</td>
                  <td>{l.tipo_lugar || "-"}</td>
                  <td>{l.direccion_lugar || "-"}</td>
                  <td>{l.contacto_nombre_lugar || "-"}</td>
                  <td>{l.contacto_telefono_lugar || "-"}</td>
                  <td>{l.contacto_email_lugar || "-"}</td>
                  <td>{l.equipamiento_lugar || "-"}</td>
                  <td>{l.capacidad_maxima_lugar || "-"}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-2"
                      onClick={() => onOpenEdit(l.id_lugar)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => onDelete(l.id_lugar)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Modal crear/editar */}
      <Modal show={showModal} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "create" ? "Crear Lugar" : "Editar Lugar"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={current.nombre_lugar || ""}
                onChange={(e) => onChange("nombre_lugar", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                value={current.tipo_lugar || ""}
                onChange={(e) => onChange("tipo_lugar", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                value={current.direccion_lugar || ""}
                onChange={(e) => onChange("direccion_lugar", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contacto Nombre</Form.Label>
              <Form.Control
                type="text"
                value={current.contacto_nombre_lugar || ""}
                onChange={(e) =>
                  onChange("contacto_nombre_lugar", e.target.value)
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contacto Teléfono</Form.Label>
              <Form.Control
                type="text"
                value={current.contacto_telefono_lugar || ""}
                onChange={(e) =>
                  onChange("contacto_telefono_lugar", e.target.value)
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contacto Email</Form.Label>
              <Form.Control
                type="email"
                value={current.contacto_email_lugar || ""}
                onChange={(e) =>
                  onChange("contacto_email_lugar", e.target.value)
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Equipamiento</Form.Label>
              <Form.Control
                type="text"
                value={current.equipamiento_lugar || ""}
                onChange={(e) => onChange("equipamiento_lugar", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Capacidad máxima</Form.Label>
              <Form.Control
                type="number"
                value={current.capacidad_maxima_lugar || ""}
                onChange={(e) =>
                  onChange("capacidad_maxima_lugar", e.target.value)
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            {modalMode === "create" ? "Crear" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MainLugares;
