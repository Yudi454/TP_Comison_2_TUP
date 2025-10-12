const db = require("../config/DB");


const getTotalProductos = (req, res) => {
  const query = `
    SELECT *
    FROM productos
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los productos", err);
      return res.status(500).json({ error: "Error al obtener productos" });
    }
    res.json(results);
  });
};


const getUnProducto = (req, res) =>{
    const { id } = req.params;
    const query = `
    SELECT * FROM PRODUCTOS WHERE id=?`;
    db.query(query,[id],(err,results)=>{
        if(err){
            console.error("Error al obtener el producto", err);
            return res.status(500).json({ error: "Error al obtener el producto" });
        }
           if (results.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(results);
    });
};


const setUnProducto = (req, res) => {
    const { nombre, codigo, descripcion, precio, stock, proveedor_id } = req.body; 
    const query = `
        INSERT INTO productos (nombre, codigo, descripcion, precio, stock, proveedor_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [nombre, codigo, descripcion, precio, stock, proveedor_id], (err, results) => {
        if (err) {
            console.error("Error al insertar producto:", err);
            return res.status(500).json({ error: "Error al insertar el producto" });
        }

        res.json({ message: "Producto insertado correctamente", id: results.insertId });
    });
};


const updateProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, codigo, descripcion, precio, stock, proveedor_id } = req.body;

    const query = `
        UPDATE productos
        SET nombre = ?, codigo = ?, descripcion = ?, precio = ?, stock = ?, proveedor_id = ?
        WHERE id = ?
    `;

    db.query(query, [nombre, codigo, descripcion, precio, stock, proveedor_id, id], (err, results) => {
        if (err) {
            console.error("Error al actualizar producto:", err);
            return res.status(500).json({ error: "Error al actualizar producto" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json({ message: "Producto actualizado correctamente" });
    });
};


const deleteProducto = (req, res) => {
    const { id } = req.params; 
    const query = `DELETE FROM productos WHERE id = ?`;

    db.query(query, [id],(err, results) => {
        if (err) {
            console.error("Error al eliminar el producto:", err);
            return res.status(500).json({ error: "Error al eliminar el producto" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado correctamente" });
    });
};





module.exports = { 
    getTotalProductos, 
    getUnProducto, 
    setUnProducto,
    deleteProducto,
    updateProducto };
