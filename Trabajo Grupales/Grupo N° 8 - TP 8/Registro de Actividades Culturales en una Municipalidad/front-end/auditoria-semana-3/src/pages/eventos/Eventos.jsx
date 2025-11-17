import React, { useState, useEffect } from "react";
import MainEventos from "./MainEventos";
import { toast } from "react-toastify";
import {
  getEventos,
  getOneEvento,
  createEvento,
  updateEvento,
  deleteEvento,
  agregarArtistaEvento,
  venderBoleto,
} from "../../hooks/useEventos";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [eventoBuscado, setEventoBuscado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [current, setCurrent] = useState({
    nombre_evento: "",
    fecha_inicio_evento: "",
    fecha_fin_evento: "",
    id_lugar: "",
    precio_entrada_evento: "",
    cupo_maximo_evento: "",
  });
  const [eventoId, setEventoId] = useState("");
  const token = localStorage.getItem("token") || undefined;

  const fetchEventos = async () => {
    try {
      setLoading(true);
      const data = await getEventos(token);
      setEventos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const openCreate = () => {
    setCurrent({
      nombre_evento: "",
      fecha_inicio_evento: "",
      fecha_fin_evento: "",
      id_lugar: "",
      precio_entrada_evento: "",
      cupo_maximo_evento: "",
    });
    setModalMode("create");
    setShowModal(true);
  };

  const openEdit = async (id) => {
    try {
      const data = await getOneEvento(id, token);
      if (data) {
        setCurrent({
          id_evento: data.id_evento,
          nombre_evento: data.nombre_evento || "",
          fecha_inicio_evento: data.fecha_inicio_evento?.slice(0, 10) || "",
          fecha_fin_evento: data.fecha_fin_evento?.slice(0, 10) || "",
          id_lugar: data.id_lugar || "",
          precio_entrada_evento: data.precio_entrada_evento || "",
          cupo_maximo_evento: data.cupo_maximo_evento || "",
        });
        setModalMode("edit");
        setShowModal(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (name, value) => {
    setCurrent((c) => ({ ...c, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (modalMode === "create") {
        await createEvento(current, token);
        toast.success("Evento creado");
      } else {
        await updateEvento(current.id_evento, current, token);
        toast.success("Evento actualizado");
      }
      setShowModal(false);
      fetchEventos();
    } catch (err) {
      console.error(err);
      toast.error("Error procesando evento");
    }
  };

  const handleBuscarEvento = async () => {
    if (!eventoId) return toast.error("Ingrese ID de evento");
    const data = await getOneEvento(eventoId, token);
    setEventoBuscado(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este evento?")) return;
    await deleteEvento(id, token);
    toast.success("Evento eliminado (borrado lógico)");
    fetchEventos();
  };

  return (
    <MainEventos
      eventos={eventos}
      eventoBuscado={eventoBuscado}
      loading={loading}
      showModal={showModal}
      modalMode={modalMode}
      current={current}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onOpenCreate={openCreate}
      onCloseModal={() => setShowModal(false)}
      eventoId={eventoId}
      setEventoId={setEventoId}
      onBuscarEvento={handleBuscarEvento}
      onDelete={handleDelete}
      onOpenEdit={openEdit}
      token={token}
      agregarArtistaEvento={agregarArtistaEvento}
      venderBoleto={venderBoleto}
    />
  );
}
