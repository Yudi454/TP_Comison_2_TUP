import pool from "../config/db.js";
//controlador para crear una venta con sus detalles


export const crearUnaVenta = async (req, res) => {
  // Obtener una conexión para la transacción
  const connection = await pool.promise().getConnection();
  
  try {
    // 1. Obtener datos del body
    const { usuario_id, productos } = req.body;

    
    if (!usuario_id || !productos || productos.length === 0) {
      return res.status(400).json({ 
        error: "Faltan datos: usuario_id y productos son requeridos" 
      });
    }

    // 2. iniciamos la transaccion de las talbas de ventias y detellies
    await connection.beginTransaction();

    // 3. Crear la venta con totla en 0
    const [resultVenta] = await connection.query(
      'INSERT INTO ventas (usuario_id, total) VALUES (?, 0)',
      [usuario_id]
    );
    
    const venta_id = resultVenta.insertId;

    // 4. Preparar detalles con sub 
    let totalVenta = 0;
    const detalles = productos.map(producto => {
      const subtotal = producto.cantidad * producto.precio;
      totalVenta += subtotal; 
      
      return [
        venta_id,
        producto.id,
        producto.cantidad,
        producto.precio,
        subtotal  
      ];
    });

    // 5. Insertar los detalles de la venta
    await connection.query(
      `INSERT INTO detalle_ventas 
       (venta_id, producto_id, cantidad, precio_unitario, subtotal) 
       VALUES ?`,
      [detalles]
    );

    // 6. Actualizar la venta
    await connection.query(
      'UPDATE ventas SET total = ? WHERE id = ?',
      [totalVenta, venta_id]
    );

    // 7. todo salió bien
    await connection.commit();

    //aqui vamos a ver si podemos actualizar el stock de los produyctos vendidos de uno a uno
    const acutualizarSctokProductos = productos.map(async (prod)=>{
      const {id, cantidad} = prod;
      await connection.query(
        'UPDATE productos SET stock = stock - ? WHERE id = ? AND stock >= ?',
        [cantidad, id, cantidad]
      );
    });
    await Promise.all(acutualizarSctokProductos);
    

    // 8. Responder con éxito
    res.status(201).json({
      message: "Venta creada exitosamente",
      data: {
        venta_id,
        usuario_id,
        total: totalVenta,
        productos: productos.length
      }
    });

  } catch (error) {
    // Si algo falla, se borra todo
    await connection.rollback();
    console.error("Error al crear la venta:", error);
    res.status(500).json({ 
      error: "Error al crear la venta",
      detalle: error.message 
    });
  } finally {
    // Liberar la conexión
    connection.release();
  }
};


