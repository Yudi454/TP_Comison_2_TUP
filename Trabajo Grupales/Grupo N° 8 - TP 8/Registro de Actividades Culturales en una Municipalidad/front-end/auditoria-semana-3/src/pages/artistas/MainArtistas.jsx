import React from "react";
import { Table, Button, Modal, Form, Row, Col, Spinner } from "react-bootstrap";

export default function MainArtistas({
  artistas = [],
  artistaBuscado,
  artistasEvento = [],
  loading = false,
  showModal,
  modalMode,
  current,
  onChange,
  onSubmit,
  onOpenCreate,
  onCloseModal,
  artistaId,
  setArtistaId,
  idEvento,
  setIdEvento,
  onBuscarArtista,
  onBuscarPorEvento,
  onDelete,
  onOpenEdit,
}) {
  return (
    <div className="artistas-page">
      <Row className="mb-3 align-items-center">
        <Col>
          <h3>Artistas</h3>
        </Col>
        <Col className="text-end">
          <Button onClick={onOpenCreate}>Crear Artista</Button>
        </Col>
      </Row>

      {/* Buscar artista */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Buscar por ID de artista"
            value={artistaId}
            onChange={(e) => setArtistaId(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button onClick={onBuscarArtista}>Buscar</Button>
        </Col>
      </Row>

      {artistaBuscado && (
        <Table bordered hover responsive className="mb-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo Arte</th>
              <th>Biografía</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{artistaBuscado.id_artista}</td>
              <td>{artistaBuscado.nombre_artista}</td>
              <td>{artistaBuscado.tipo_arte_artista || "-"}</td>
              <td>{artistaBuscado.biografia_artista || "-"}</td>
              <td>{artistaBuscado.email_artista || "-"}</td>
              <td>{artistaBuscado.telefono_artista || "-"}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => onOpenEdit(artistaBuscado.id_artista)}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => onDelete(artistaBuscado.id_artista)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      )}

      {/* Todos los artistas */}
      <h5>Todos los artistas</h5>
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
              <th>Tipo Arte</th>
              <th>Biografía</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {artistas.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No hay artistas
                </td>
              </tr>
            ) : (
              artistas.map((a) => (
                <tr key={a.id_artista}>
                  <td>{a.id_artista}</td>
                  <td>{a.nombre_artista}</td>
                  <td>{a.tipo_arte_artista || "-"}</td>
                  <td>{a.biografia_artista || "-"}</td>
                  <td>{a.email_artista || "-"}</td>
                  <td>{a.telefono_artista || "-"}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-2"
                      onClick={() => onOpenEdit(a.id_artista)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => onDelete(a.id_artista)}
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

      {/* Artistas por evento */}
      <Row className="mb-3 align-items-center">
        <Col md={4}>
          <Form.Control
            placeholder="ID del evento"
            value={idEvento}
            onChange={(e) => setIdEvento(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button onClick={onBuscarPorEvento}>
            Buscar artistas por evento
          </Button>
        </Col>
      </Row>

      {artistasEvento.length > 0 && (
        <>
          <h5>Artistas por evento</h5>
          <Table bordered hover responsive className="mb-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo Arte</th>
                <th>Biografía</th>
                <th>Email</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {artistasEvento.map((a) => (
                <tr key={a.id_artista}>
                  <td>{a.id_artista}</td>
                  <td>{a.nombre_artista}</td>
                  <td>{a.tipo_arte_artista || "-"}</td>
                  <td>{a.biografia_artista || "-"}</td>
                  <td>{a.email_artista || "-"}</td>
                  <td>{a.telefono_artista || "-"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {/* Modal crear/editar */}
      <Modal show={showModal} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "create" ? "Crear Artista" : "Editar Artista"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={current.nombre_artista || ""}
                onChange={(e) => onChange("nombre_artista", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo Arte</Form.Label>
              <Form.Control
                type="text"
                value={current.tipo_arte_artista || ""}
                onChange={(e) => onChange("tipo_arte_artista", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Biografía</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={current.biografia_artista || ""}
                onChange={(e) => onChange("biografia_artista", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={current.email_artista || ""}
                onChange={(e) => onChange("email_artista", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={current.contra_artista || ""}
                onChange={(e) => onChange("contra_artista", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                value={current.telefono_artista || ""}
                onChange={(e) => onChange("telefono_artista", e.target.value)}
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
}
