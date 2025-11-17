import React, { useState } from "react";
import { Table, Button, Modal, Form, Row, Col, Spinner } from "react-bootstrap";

export default function MainEventos({
  eventos = [],
  eventoBuscado,
  loading = false,
  showModal,
  modalMode,
  current,
  onChange,
  onSubmit,
  onOpenCreate,
  onCloseModal,
  eventoId,
  setEventoId,
  onBuscarEvento,
  onDelete,
  onOpenEdit,
  token,
  agregarArtistaEvento,
  venderBoleto,
}) {
  const [artistaId, setArtistaId] = useState("");
  const [rolArtista, setRolArtista] = useState("principal");
  const [cantidadBoletos, setCantidadBoletos] = useState(1);
  const [metodoPago, setMetodoPago] = useState("");

  const handleAgregarArtista = async (id_evento) => {
    if (!artistaId) return alert("Ingrese ID de artista");
    await agregarArtistaEvento(
      { id_evento, id_artista: artistaId, rol_artista_evento: rolArtista },
      token
    );
    setArtistaId("");
  };

  const handleVenderBoleto = async (id_evento) => {
    if (!cantidadBoletos) return alert("Ingrese cantidad de boletos");
    await venderBoleto(
      {
        id_evento,
        id_usuario: 1,
        cantidad_boletos: cantidadBoletos,
        metodo_pago: metodoPago,
      },
      token
    );
    setCantidadBoletos(1);
    setMetodoPago("");
  };

  return (
    <div className="eventos-page">
      <Row className="mb-3 align-items-center">
        <Col>
          <h3>Eventos</h3>
        </Col>
        <Col className="text-end">
          <Button onClick={onOpenCreate}>Crear Evento</Button>
        </Col>
      </Row>

      {/* Buscar evento */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Buscar por ID de evento"
            value={eventoId}
            onChange={(e) => setEventoId(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button onClick={onBuscarEvento}>Buscar</Button>
        </Col>
      </Row>

      {eventoBuscado && (
        <Table bordered hover responsive className="mb-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Lugar</th>
              <th>Precio Entrada</th>
              <th>Entradas Vendidas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{eventoBuscado.id_evento}</td>
              <td>{eventoBuscado.nombre_evento}</td>
              <td>{eventoBuscado.fecha_inicio_evento?.slice(0, 10)}</td>
              <td>{eventoBuscado.fecha_fin_evento?.slice(0, 10)}</td>
              <td>{eventoBuscado.lugares?.nombre_lugar || "-"}</td>
              <td>{eventoBuscado.precio_entrada_evento}</td>
              <td>{eventoBuscado.entradas_vendidas_evento}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => onOpenEdit(eventoBuscado.id_evento)}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => onDelete(eventoBuscado.id_evento)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      )}

      <h5>Todos los eventos</h5>
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
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Lugar</th>
              <th>Precio Entrada</th>
              <th>Entradas Vendidas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventos.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No hay eventos
                </td>
              </tr>
            ) : (
              eventos.map((e) => (
                <tr key={e.id_evento}>
                  <td>{e.id_evento}</td>
                  <td>{e.nombre_evento}</td>
                  <td>{e.fecha_inicio_evento?.slice(0, 10)}</td>
                  <td>{e.fecha_fin_evento?.slice(0, 10)}</td>
                  <td>{e.lugares?.nombre_lugar || "-"}</td>
                  <td>{e.precio_entrada_evento}</td>
                  <td>{e.entradas_vendidas_evento}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-2"
                      onClick={() => onOpenEdit(e.id_evento)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => onDelete(e.id_evento)}
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

      <Modal show={showModal} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "create" ? "Crear Evento" : "Editar Evento"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={current.nombre_evento || ""}
                onChange={(e) => onChange("nombre_evento", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha Inicio</Form.Label>
              <Form.Control
                type="date"
                value={current.fecha_inicio_evento || ""}
                onChange={(e) =>
                  onChange("fecha_inicio_evento", e.target.value)
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha Fin</Form.Label>
              <Form.Control
                type="date"
                value={current.fecha_fin_evento || ""}
                onChange={(e) => onChange("fecha_fin_evento", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID Lugar</Form.Label>
              <Form.Control
                type="number"
                value={current.id_lugar || ""}
                onChange={(e) => onChange("id_lugar", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio Entrada</Form.Label>
              <Form.Control
                type="number"
                value={current.precio_entrada_evento || ""}
                onChange={(e) =>
                  onChange("precio_entrada_evento", e.target.value)
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cupo Máximo</Form.Label>
              <Form.Control
                type="number"
                value={current.cupo_maximo_evento || ""}
                onChange={(e) => onChange("cupo_maximo_evento", e.target.value)}
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
