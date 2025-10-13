import pool from '../config/db.js';

export const getProveedores = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM proveedores');
    res.json({status: 200, payload: rows});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'Error buscando proveedores'});
  }
}

export const getProveedor = async (req, res) => {
  const id = req.params.id
  try {
    const [rows] = await pool.query('SELECT * FROM proveedores WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.json({status: 404, message: 'Proveedor no encontrado'});
    }
    res.json({status: 200, payload: rows});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'Error buscando proveedores'});
  }
}

export const postProveedor = async (req, res) => {
  const { nombre, telefono, email } = req.body
  try {
    const [result] = await pool.query(`INSERT INTO proveedores (nombre, telefono, email) VALUES (?, ?, ?)`, [nombre, telefono, email]);
    if(result.affectedRows === 0) {
      return res.json({status: 400, message: 'Proveedor no se pudo crear'});
    }
    res.json({status: 201, payload: 'Proveedor creado'});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: error?.sqlMessage || 'Error creando proveedor'});
  }
}

export const putProveedor = async (req, res) => {
  const id = req.params.id
  const { nombre, telefono, email } = req.body
  try {
    const [result] = await pool.query(`UPDATE proveedores SET nombre = ?, telefono = ?, email = ? WHERE id = ?`, [nombre, telefono, email, id]);
    if(result.affectedRows === 0) {
      return res.json({status: 400, message: 'Proveedor no se pudo actualizar'});
    }

    res.json({status: 200, payload: 'Proveedor actualizado'});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: error?.sqlMessage || 'Error buscando proveedores'});
  }
}

export const deleteProveedor = async (req, res) => {
  const id = req.params.id
  try {
    const [result] = await pool.query('DELETE FROM proveedores WHERE id = ?', [id]);
    if(result.affectedRows === 0) {
      return res.json({status: 400, message: 'Proveedor no se pudo encontrar/eliminar'});
    }

    res.json({status: 200, payload: 'Proveedor eliminado'});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'Error buscando proveedores'});
  }
}