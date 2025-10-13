import pool from '../config/db.js';

export const getVendedores = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM vendedores');
    res.json({status: 200, payload: rows});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'Error buscando vendedores'});
  }
}

export const getVendedor = async (req, res) => {
  const id = req.params.id
  try {
    const [rows] = await pool.query('SELECT * FROM vendedores WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.json({status: 404, message: 'Vendedor no encontrado'});
    }
    res.json({status: 200, payload: rows});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'Error buscando vendedores'});
  }
}

export const postVendedor = async (req, res) => {
  const { user, password } = req.body
  try {
    const [result] = await pool.query(`INSERT INTO vendedores (user, password) VALUES (?,?)`, [user, password]);
    if(result.affectedRows === 0) {
      return res.json({status: 400, message: 'Vendedor no se pudo crear'});
    }
    res.json({status: 201, payload: 'Vendedor creado'});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: error?.sqlMessage || 'Error creando vendedor'});
  }
}

export const putVendedor = async (req, res) => {
  const id = req.params.id
  const { user, password } = req.body
  try {
    const [result] = await pool.query(`UPDATE vendedores SET user = ?, password = ? WHERE id = ?`, [user, password, id]);
    if(result.affectedRows === 0) {
      return res.json({status: 400, message: 'Vendedor no se pudo actualizar'});
    }

    res.json({status: 200, payload: 'Vendedor actualizado'});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: error?.sqlMessage || 'Error buscando vendedores'});
  }
}

export const deleteVendedor = async (req, res) => {
  const id = req.params.id
  try {
    const [result] = await pool.query('DELETE FROM vendedores WHERE id = ?', [id]);
    if(result.affectedRows === 0) {
      return res.json({status: 400, message: 'Vendedor no se pudo eliminar'});
    }

    res.json({status: 200, payload: 'Vendedor eliminado'});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'Error buscando vendedores'});
  }
}