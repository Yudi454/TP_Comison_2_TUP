import pool from '../config/db.js';

export const getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos');
    res.json({status: 200, payload: rows});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'Error buscando productos'});
  }
}

export const getProducto = async (req, res) => {
  const id = req.params.id
  try {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.json({status: 404, message: 'Producto no encontrado'});
    }
    res.json({status: 200, payload: rows});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'Error buscando productos'});
  }
}

export const postProducto = async (req, res) => {
  const { nombre, precio, stock, proveedor_id } = req.body
  try {
    const [result] = await pool.query(`INSERT INTO productos (nombre, precio, stock, proveedor_id) VALUES (?, ?, ?, ?)`, [nombre, precio, stock, proveedor_id]);
    if(result.affectedRows === 0) {
      return res.json({status: 400, message: 'Producto no se pudo crear'});
    }
    res.json({status: 201, payload: 'Producto creado'});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: error?.sqlMessage || 'Error creando producto'});
  }
}

export const putProducto = async (req, res) => {
  const id = req.params.id
  const { nombre, precio, stock, proveedor_id } = req.body
  try {
    const [result] = await pool.query(`UPDATE productos SET nombre = ?, precio = ?, stock = ?, proveedor_id = ? WHERE id = ?`, [nombre, precio, stock, proveedor_id, id]);
    if(result.affectedRows === 0) {
      return res.json({status: 400, message: 'Producto no se pudo actualizar'});
    }

    res.json({status: 200, payload: 'Producto actualizado'});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: error?.sqlMessage || 'Error buscando productos'});
  }
}

export const deleteProducto = async (req, res) => {
  const id = req.params.id
  try {
    const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    if(result.affectedRows === 0) {
      return res.json({status: 400, message: 'Producto no se pudo encontrar/eliminar'});
    }

    res.json({status: 200, payload: 'Producto eliminado'});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'Error buscando productos'});
  }
}