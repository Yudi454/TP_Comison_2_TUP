import pool from '../config/db.js';

export const getPopularProductos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.nombre, 
        COUNT(v.producto_id) AS apariciones_en_ventas
      FROM ventas v
      JOIN productos p ON v.producto_id = p.id
      GROUP BY v.producto_id
      ORDER BY apariciones_en_ventas DESC;
    `);
    res.json({status: 200, payload: rows});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'Error recolectando informacion'});
  }
}

export const getMayorCantidad = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.nombre, 
        SUM(v.cantidad) AS cantidad_de_veces_vendido
      FROM ventas v
      JOIN productos p ON v.producto_id = p.id
      GROUP BY v.producto_id
      ORDER BY cantidad_de_veces_vendido DESC;
    `);
    res.json({status: 200, payload: rows});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'Error recolectando informacion'});
  }
}