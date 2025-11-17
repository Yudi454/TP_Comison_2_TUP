const prisma = require("../config/prisma"); //utilizo prisma

//Obtener todas las ventas activas
const obtenerTodas = async (req, res) => {
  try {
    const ventas = await prisma.ventas_boletos.findMany({
      where: { estado_venta_boleto: 1 },
      orderBy: { fecha_creacion_venta_boleto: "desc" },
    });
    return res.json(ventas);
  } catch (error) {
    console.error("Error obtenerTodas ventas:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

//Obtener una venta por id

const obtenerUna = async (req, res) => {
  try {
    const { id_venta_boleto } = req.params;

    const venta = await prisma.ventas_boletos.findFirst({
      where: {
        id_venta_boleto: parseInt(id_venta_boleto),
        estado_venta_boleto: 1,
      },
    });

    if (!venta) return res.status(404).json({ error: "Venta no encontrada" });

    return res.json(venta);
  } catch (error) {
    console.error("Error obtenerUna venta:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// Obtener ventas por evento id
const obtenerPorEvento = async (req, res) => {
  try {
    const { id_evento } = req.params;

    const ventas = await prisma.ventas_boletos.findMany({
      where: {
        id_evento: parseInt(id_evento),
        estado_venta_boleto: 1,
      },
      orderBy: { fecha_creacion_venta_boleto: "desc" },
    });

    return res.json(ventas);
  } catch (error) {
    console.error("Error obtenerPorEvento ventas:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

//Crear una venta (controla cupos disponibles)

const crearVenta = async (req, res) => {
  console.log("Entre en crear venta");
  
  try {
    const { id_evento, id_usuario, cantidad_boletos, metodo_pago } = req.body;
    const cantidad = Number(cantidad_boletos);

    if (!id_evento || !id_usuario || !cantidad || cantidad <= 0) {
      return res
        .status(400)
        .json({ error: "Faltan datos o cantidad inválida" });
    }

    // Obtener el evento activo con datos del lugar
    const evento = await prisma.eventos.findFirst({
      where: { id_evento: parseInt(id_evento), estado_evento: 1 },
      include: {
        lugares: {
          select: {
            capacidad_maxima_lugar: true,
          },
        },
      },
    });

    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado o inactivo" });
    }

    const cupo = Number(evento.lugares.capacidad_maxima_lugar) || 0;
    const vendidos = Number(evento.entradas_vendidas_evento) || 0;
    const disponibles = Math.max(0, cupo - vendidos);

    if (disponibles <= 0 || cantidad > disponibles) {
      return res
        .status(400)
        .json({ error: "No hay cupos disponibles", disponibles });
    }

    // Actualizar entradas vendidas
    await prisma.eventos.update({
      where: { id_evento: parseInt(id_evento) },
      data: {
        entradas_vendidas_evento: {
          increment: cantidad,
        },
      },
    });

    // Calcular total y registrar la venta
    const precio = Number(evento.precio_entrada_evento) || 0;
    const total_venta = precio * cantidad;

    await prisma.ventas_boletos.create({
      data: {
        id_evento: parseInt(id_evento),
        id_usuario: parseInt(id_usuario),
        cantidad_boletos: cantidad,
        total_venta,
        metodo_pago: metodo_pago || null,
      },
    });

    return res.status(201).json({ message: "Venta registrada correctamente" });
  } catch (error) {
    console.error("Error crearVenta:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

/* Total de ventas por todos los eventos (agregado) */

const totalVentasPorEventos = async (req, res) => {
  try {
    const totales = await prisma.ventas_boletos.groupBy({
      by: ["id_evento"],
      where: { estado_venta_boleto: 1 },
      _sum: {
        total_venta: true,
        cantidad_boletos: true,
      },
    });

    // Dar formato igual al resultado SQL original
    const resultado = totales.map((t) => ({
      id_evento: t.id_evento,
      total_ventas: Number(t._sum.total_venta) || 0,
      total_boletos: Number(t._sum.cantidad_boletos) || 0,
    }));

    return res.json(resultado);
  } catch (error) {
    console.error("Error totalVentasPorEventos:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

//Total de ventas para un solo evento

const totalVentasPorEvento = async (req, res) => {
  try {
    const { id_evento } = req.params;

    const totales = await prisma.ventas_boletos.aggregate({
      where: {
        estado_venta_boleto: 1,
        id_evento: parseInt(id_evento),
      },
      _sum: {
        total_venta: true,
        cantidad_boletos: true,
      },
    });

    return res.json({
      id_evento: Number(id_evento),
      total_ventas: Number(totales._sum.total_venta) || 0,
      total_boletos: Number(totales._sum.cantidad_boletos) || 0,
    });
  } catch (error) {
    console.error("Error totalVentasPorEvento:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = {
  obtenerTodas,
  obtenerUna,
  obtenerPorEvento,
  crearVenta,
  totalVentasPorEventos,
  totalVentasPorEvento,
};
