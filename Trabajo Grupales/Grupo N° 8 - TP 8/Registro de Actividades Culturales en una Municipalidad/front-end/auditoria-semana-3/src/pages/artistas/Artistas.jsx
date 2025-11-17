import React, { useState, useEffect } from "react";
import MainArtistas from "./MainArtistas";
import { toast } from "react-toastify";
import {
  getArtistas,
  getOneArtista,
  getArtistaEvento,
  createArtista,
  updateArtista,
  deleteArtista,
} from "../../hooks/useArtistas";

export default function Artistas() {
  const [artistas, setArtistas] = useState([]);
  const [artistaBuscado, setArtistaBuscado] = useState(null);
  const [artistasEvento, setArtistasEvento] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [current, setCurrent] = useState({
    nombre_artista: "",
    tipo_arte_artista: "",
    biografia_artista: "",
    email_artista: "",
    contra_artista: "",
    telefono_artista: "",
  });

  const [artistaId, setArtistaId] = useState("");
  const [idEvento, setIdEvento] = useState("");

  const token = localStorage.getItem("token") || undefined;

  const fetchArtistas = async () => {
    try {
      setLoading(true);
      const data = await getArtistas(token);
      setArtistas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtistas();
  }, []);

  const openCreate = () => {
    setCurrent({
      nombre_artista: "",
      tipo_arte_artista: "",
      biografia_artista: "",
      email_artista: "",
      contra_artista: "",
      telefono_artista: "",
    });
    setModalMode("create");
    setShowModal(true);
  };

  const openEdit = async (id) => {
    try {
      const data = await getOneArtista(id, token);
      if (data) {
        setCurrent({
          id_artista: data.id_artista,
          nombre_artista: data.nombre_artista || "",
          tipo_arte_artista: data.tipo_arte_artista || "",
          biografia_artista: data.biografia_artista || "",
          email_artista: data.email_artista || "",
          contra_artista: data.contra_artista || "",
          telefono_artista: data.telefono_artista || "",
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
        await createArtista(current, token);
        toast.success("Artista creado");
      } else {
        await updateArtista(current.id_artista, current, token);
        toast.success("Artista actualizado");
      }
      setShowModal(false);
      fetchArtistas();
    } catch (err) {
      console.error(err);
      toast.error("Error procesando artista");
    }
  };

  const handleBuscarArtista = async () => {
    if (!artistaId) return toast.error("Ingrese ID de artista");
    const data = await getOneArtista(artistaId, token);
    setArtistaBuscado(data);
  };

  const handleBuscarPorEvento = async () => {
    if (!idEvento) return toast.error("Ingrese ID de evento");
    const data = await getArtistaEvento(idEvento, token);
    setArtistasEvento(data || []);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este artista?")) return;
    await deleteArtista(id, token);
    toast.success("Artista eliminado (borrado lógico)");
    fetchArtistas();
    if (artistasEvento.length) handleBuscarPorEvento();
  };

  return (
    <MainArtistas
      artistas={artistas}
      artistaBuscado={artistaBuscado}
      artistasEvento={artistasEvento}
      loading={loading}
      showModal={showModal}
      modalMode={modalMode}
      current={current}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onOpenCreate={openCreate}
      onCloseModal={() => setShowModal(false)}
      artistaId={artistaId}
      setArtistaId={setArtistaId}
      idEvento={idEvento}
      setIdEvento={setIdEvento}
      onBuscarArtista={handleBuscarArtista}
      onBuscarPorEvento={handleBuscarPorEvento}
      onDelete={handleDelete}
      onOpenEdit={openEdit}
    />
  );
}
