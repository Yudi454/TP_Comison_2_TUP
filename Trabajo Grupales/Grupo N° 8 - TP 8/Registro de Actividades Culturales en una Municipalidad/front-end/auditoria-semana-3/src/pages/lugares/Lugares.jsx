import React, { useState, useEffect } from "react";
import MainLugares from "./MainLugares";
import { toast } from "react-toastify";
import {
  getLugares,
  getLugar,
  createLugar,
  updateLugar,
  deleteLugar,
} from "../../hooks/useLugares";

const Lugares = () => {
  const [lugares, setLugares] = useState([]);
  const [lugarBuscado, setLugarBuscado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [current, setCurrent] = useState({
    nombre_lugar: "",
    tipo_lugar: "",
    direccion_lugar: "",
    contacto_nombre_lugar: "",
    contacto_telefono_lugar: "",
    contacto_email_lugar: "",
    equipamiento_lugar: "",
    capacidad_maxima_lugar: "",
  });

  const [lugarId, setLugarId] = useState("");
  const token = localStorage.getItem("token") || undefined;

  const fetchLugares = async () => {
    try {
      setLoading(true);
      const data = await getLugares(token);
      setLugares(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLugares();
  }, []);

  const openCreate = () => {
    setCurrent({
      nombre_lugar: "",
      tipo_lugar: "",
      direccion_lugar: "",
      contacto_nombre_lugar: "",
      contacto_telefono_lugar: "",
      contacto_email_lugar: "",
      equipamiento_lugar: "",
      capacidad_maxima_lugar: "",
    });
    setModalMode("create");
    setShowModal(true);
  };

  const openEdit = async (id) => {
    try {
      const data = await getLugar(id, token);
      if (data) {
        setCurrent({
          id_lugar: data.id_lugar,
          nombre_lugar: data.nombre_lugar || "",
          tipo_lugar: data.tipo_lugar || "",
          direccion_lugar: data.direccion_lugar || "",
          contacto_nombre_lugar: data.contacto_nombre_lugar || "",
          contacto_telefono_lugar: data.contacto_telefono_lugar || "",
          contacto_email_lugar: data.contacto_email_lugar || "",
          equipamiento_lugar: data.equipamiento_lugar || "",
          capacidad_maxima_lugar: data.capacidad_maxima_lugar || "",
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
        await createLugar(current, token);
        toast.success("Lugar creado");
      } else {
        await updateLugar(current.id_lugar, current, token);
        toast.success("Lugar actualizado");
      }
      setShowModal(false);
      fetchLugares();
    } catch (err) {
      console.error(err);
      toast.error("Error procesando lugar");
    }
  };

  const handleBuscarLugar = async () => {
    if (!lugarId) return toast.error("Ingrese ID de lugar");
    const data = await getLugar(lugarId, token);
    setLugarBuscado(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este lugar?")) return;
    await deleteLugar(id, token);
    toast.success("Lugar eliminado (borrado lógico)");
    fetchLugares();
  };

  return (
    <MainLugares
      lugares={lugares}
      lugarBuscado={lugarBuscado}
      loading={loading}
      showModal={showModal}
      modalMode={modalMode}
      current={current}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onOpenCreate={openCreate}
      onCloseModal={() => setShowModal(false)}
      lugarId={lugarId}
      setLugarId={setLugarId}
      onBuscarLugar={handleBuscarLugar}
      onDelete={handleDelete}
      onOpenEdit={openEdit}
    />
  );
}

export default Lugares;