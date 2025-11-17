import React from "react";
import { Table, Button, Modal, Form, Row, Col, Spinner } from "react-bootstrap";

export default function MainVentas({
  ventas = [],
  ventaBuscada,
  ventasEvento = [],
  totales = [],
  totalesEvento,
  loading = false,
  showModal,
  onOpenCreate,
  onCloseModal,
  current,
  onChange,
  onSubmit,
  ventaId,
  setVentaId,
  idEvento,
  setIdEvento,
  onBuscarVenta,
  onBuscarPorEvento,
}) {
  return (
    <div className="ventas-page">
      <Row className="mb-3 align-items-center">
        <Col>
          <h3>Ventas</h3>
        </Col>
        <Col className="text-end">
          <Button onClick={onOpenCreate}>Crear Venta</Button>
        </Col>
      </Row>

      {/* Buscar venta */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Buscar por ID de venta"
            value={ventaId}
            onChange={(e) => setVentaId(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button onClick={onBuscarVenta}>Buscar</Button>
        </Col>
      </Row>

      {ventaBuscada && (
        <Table bordered hover responsive className="mb-4">
          <thead>
            <tr>
              <th>ID Venta</th>
              <th>ID Evento</th>
              <th>ID Usuario</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Metodo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ventaBuscada.id_venta_boleto}</td>
              <td>{ventaBuscada.id_evento}</td>
              <td>{ventaBuscada.id_usuario}</td>
              <td>{ventaBuscada.cantidad_boletos}</td>
              <td>{ventaBuscada.total_venta}</td>
              <td>{ventaBuscada.metodo_pago || "-"}</td>
            </tr>
          </tbody>
        </Table>
      )}

      {/* Todas las ventas */}
      <h5>Todas las ventas</h5>
      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table bordered hover responsive className="mb-4">
          <thead>
            <tr>
              <th>ID Venta</th>
              <th>ID Evento</th>
              <th>ID Usuario</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Metodo</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay ventas
                </td>
              </tr>
            ) : (
              ventas.map((v) => (
                <tr key={v.id_venta_boleto}>
                  <td>{v.id_venta_boleto}</td>
                  <td>{v.id_evento}</td>
                  <td>{v.id_usuario}</td>
                  <td>{v.cantidad_boletos}</td>
                  <td>{v.total_venta}</td>
                  <td>{v.metodo_pago || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Ventas por evento */}
      <Row className="mb-3 align-items-center">
        <Col md={4}>
          <Form.Control
            placeholder="ID del evento"
            value={idEvento}
            onChange={(e) => setIdEvento(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button onClick={onBuscarPorEvento}>Buscar ventas por evento</Button>
        </Col>
      </Row>

      {ventasEvento.length > 0 && (
        <>
          <h5>Ventas por evento</h5>
          <Table bordered hover responsive className="mb-4">
            <thead>
              <tr>
                <th>ID Venta</th>
                <th>ID Usuario</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Metodo</th>
              </tr>
            </thead>
            <tbody>
              {ventasEvento.map((v) => (
                <tr key={v.id_venta_boleto}>
                  <td>{v.id_venta_boleto}</td>
                  <td>{v.id_usuario}</td>
                  <td>{v.cantidad_boletos}</td>
                  <td>{v.total_venta}</td>
                  <td>{v.metodo_pago || "-"}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {totalesEvento && (
            <div className="mb-4">
              <strong>Total boletos:</strong> {totalesEvento.total_boletos} |{" "}
              <strong>Total ventas:</strong> {totalesEvento.total_ventas}
            </div>
          )}
        </>
      )}

      {/* Totales generales */}
      <h5>Totales por eventos</h5>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>ID Evento</th>
            <th>Total Boletos</th>
            <th>Total Ventas</th>
          </tr>
        </thead>
        <tbody>
          {totales.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">
                No hay totales
              </td>
            </tr>
          ) : (
            totales.map((t) => (
              <tr key={t.id_evento}>
                <td>{t.id_evento}</td>
                <td>{t.total_boletos}</td>
                <td>{t.total_ventas}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal crear venta */}
      <Modal show={showModal} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ID Evento</Form.Label>
              <Form.Control
                type="number"
                value={current.id_evento || ""}
                onChange={(e) => onChange("id_evento", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID Usuario</Form.Label>
              <Form.Control
                type="number"
                value={current.id_usuario || ""}
                onChange={(e) => onChange("id_usuario", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad de boletos</Form.Label>
              <Form.Control
                type="number"
                value={current.cantidad_boletos || 1}
                onChange={(e) => onChange("cantidad_boletos", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Método de pago</Form.Label>
              <Form.Control
                type="text"
                value={current.metodo_pago || ""}
                onChange={(e) => onChange("metodo_pago", e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
