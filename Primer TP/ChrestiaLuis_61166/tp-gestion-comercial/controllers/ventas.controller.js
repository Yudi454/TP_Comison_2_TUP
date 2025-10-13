import pool from '../config/db.js';

export const getVentas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ventas');
    res.json({status: 200, payload: rows});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'Error buscando ventas'});
  }
}

export const getVenta = async (req, res) => {
  const id = req.params.id
  try {
    const [rows] = await pool.query('SELECT * FROM ventas WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.json({status: 404, message: 'Venta no encontrado'});
    }
    res.json({status: 200, payload: rows});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'Error buscando ventas'});
  }
}

export const postVenta = async (req, res) => {
  const { fecha, vendedor_id, producto_id, cantidad } = req.body

  try {
    const [rows] = await pool.query('SELECT stock FROM productos WHERE id = ?', [producto_id]);
    console.log(rows[0].stock);
    if (rows.length === 0) {
      return res.json({status: 404, message: 'Producto no encontrado'});
    }
    if (rows[0].stock < cantidad) {
      return res.json({status: 400, message: 'No hay suficiente stock'});
    }
    const [result] = await pool.query(`INSERT INTO ventas (fecha, vendedor_id, producto_id, cantidad) VALUES (?, ?, ?, ?)`, [fecha, vendedor_id, producto_id, cantidad]);
    
    if(result.affectedRows === 0) {
      return res.json({status: 400, message: 'Venta no se pudo crear'});
    }
    await pool.query('UPDATE productos SET stock = stock - ? WHERE id = ?', [cantidad, producto_id]);
    
  
    res.json({status: 201, payload: 'Venta creada'});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: error?.sqlMessage || 'Error creando venta'});
  }
}

export const putVenta = async (req, res) => {
  const id = req.params.id
  const { fecha, vendedor_id, producto_id, cantidad } = req.body
  try {
    //Faltaria cambiar el stock, para aummentar el que se corrige y disminuir el nuevo
    const [result] = await pool.query(`UPDATE ventas SET fecha = ?, vendedor_id = ?, producto_id = ?, cantidad = ? WHERE id = ?`, [fecha, vendedor_id, producto_id, cantidad, id]);
    if(result.affectedRows === 0) {
      return res.json({status: 400, message: 'Venta no se pudo actualizar'});
    }

    res.json({status: 200, payload: 'Venta actualizado'});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: error?.sqlMessage || 'Error buscando ventas'});
  }
}

export const deleteVenta = async (req, res) => {
  const id = req.params.id
  try {
    const [result] = await pool.query('DELETE FROM ventas WHERE id = ?', [id]);
    if(result.affectedRows === 0) {
      return res.json({status: 400, message: 'Venta no se pudo encontrar/eliminar'});
    }

    res.json({status: 200, payload: 'Venta eliminado'});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'Error buscando ventas'});
  }
}