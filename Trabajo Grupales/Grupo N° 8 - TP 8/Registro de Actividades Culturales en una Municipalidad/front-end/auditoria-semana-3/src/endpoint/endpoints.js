const BASE_ROUTE = "http://localhost:3000/api";

export const artistas = {
  get_artistas: `${BASE_ROUTE}/artistas`,
  get_one_artista: (id_artista) =>
    `${BASE_ROUTE}/artistas/getOne/${id_artista}`,
  get_artista_evento: (id_evento) =>
    `${BASE_ROUTE}/artistas/evento/${id_evento}`,
  create_artista: `${BASE_ROUTE}/artistas/create`,
  update_artista: (id_artista) => `${BASE_ROUTE}/artistas/update/${id_artista}`,
  delete_artista: (id_artista) => `${BASE_ROUTE}/artistas/delete/${id_artista}`,
};

export const auth = {
  registro: `${BASE_ROUTE}/auth/registro`,
  login: `${BASE_ROUTE}/auth/login`,
};

export const eventos = {
  get_eventos: `${BASE_ROUTE}/eventos`,
  get_one_evento: (id_evento) => `${BASE_ROUTE}/eventos/getOne/${id_evento}`,
  create_evento: `${BASE_ROUTE}/eventos/create`,
  update_evento: (id_evento) => `${BASE_ROUTE}/eventos/update/${id_evento}`,
  delete_evento: (id_evento) => `${BASE_ROUTE}/eventos/delete/${id_evento}`,
  agregar_artista: `${BASE_ROUTE}/eventos/agregar-artista`,
  vender_boleto: `${BASE_ROUTE}/eventos/vender`,
};

export const lugares = {
  get_lugares: `${BASE_ROUTE}/lugares`,
  get_one_lugar: (id_lugar) => `${BASE_ROUTE}/lugares/${id_lugar}`,
  create_lugar: `${BASE_ROUTE}/lugares/create`,
  update_lugar: (id_lugar) => `${BASE_ROUTE}/lugares/update/${id_lugar}`,
  delete_lugar: (id_lugar) => `${BASE_ROUTE}/lugares/delete/${id_lugar}`,
};

export const password = {
  recuperar_contraseña: `${BASE_ROUTE}/password/recover`,
  resetear_contraseña: (token) => `${BASE_ROUTE}/password/reset/${token}`,
};

export const venta_boletos = {
  get_ventas: `${BASE_ROUTE}/venta_boletos/`,
  get_one_venta: (id_venta_boleto) =>
    `${BASE_ROUTE}/venta_boletos/${id_venta_boleto}`,
  get_venta_evento: (id_evento) =>
    `${BASE_ROUTE}/venta_boletos/evento/${id_evento}`,
  create_venta: `${BASE_ROUTE}/venta_boletos/create`,
  get_total_eventos: `${BASE_ROUTE}/venta_boletos/totales/por-eventos`,
  get_total_evento: (id_evento) =>
    `${BASE_ROUTE}/venta_boletos/totales/${id_evento}`,
};
