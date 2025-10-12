import pool from "../config/db.js";

//controlador para obtener todos los productos
export const obtenerTodosLosProductos = (req, res)=>{
  try {
    const query = "SELECT * FROM productos WHERE activo = TRUE";
    //hacemos la consulta
    pool.query(query, (err, results) => {
      //manejo de errores
      if (err) {
        console.error("Error al obtener los productos:", err);
        return res.status(500).json({ error: "Error al obtener los productos" });
      }
      //si todo esta okey enviamos la respuesta
      res.json(results);
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ error: "Error al obtener los productos" });
  }
}
//controlador para obtener un producto por su id
export const obtenerProductoPorId = (req, res)=>{
  try {
    const { id } = req.params;
    const query = "SELECT * FROM productos WHERE id = ? AND activo = TRUE";
    //hacemos la consulta
    pool.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error al obtener el producto:", err);
        return res.status(500).json({ error: "Error al obtener el producto" });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      
      //si todo esta okey enviamos la respuesta
      res.json(results[0]);
    });
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return res.status(500).json({ error: "Error al obtener el producto" });
  }
}
//controlador para crear un nuevo producto
export const crearProducto = (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, proveedor_id } = req.body;
    
    // Validaciones básicas
    if (!nombre || !precio) {
      return res.status(400).json({ error: "Nombre y precio son obligatorios" });
    }

    // Si se proporciona proveedor_id, verificar que exista y esté activo
    if (proveedor_id) {
      const queryProveedor = "SELECT id FROM proveedores WHERE id = ? AND activo = TRUE";
      
      pool.query(queryProveedor, [proveedor_id], (err, results) => {
        if (err) {
          console.error("Error al verificar el proveedor:", err);
          return res.status(500).json({ error: "Error al verificar el proveedor" });
        }
        
        // Si no se encuentra el proveedor o está inactivo
        if (results.length === 0) {
          return res.status(404).json({ error: "El proveedor no existe o está inactivo" });
        }
        
        // Si el proveedor existe, crear el producto
        crearProductoConProveedor(req, res, proveedor_id);
      });
    } else {
      // Si no se proporciona proveedor_id, crear el producto sin proveedor
      crearProductoConProveedor(req, res, null);
    }
    
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return res.status(500).json({ error: "Error al crear el producto" });
  }
}
const crearProductoConProveedor = (req, res, proveedor_id) => {
  const { nombre, descripcion, precio, stock } = req.body;
  
  const query = "INSERT INTO productos (nombre, descripcion, precio, stock, proveedor_id) VALUES (?, ?, ?, ?, ?)";
  
  pool.query(query, [nombre, descripcion, precio, stock || 0, proveedor_id], (err, results) => {
    if (err) { 
      console.error("Error al crear el producto:", err);
      return res.status(500).json({ error: "Error al crear el producto" });
    }
    
    //si todo esta okey enviamos la respuesta
    res.status(201).json({ 
      message: "Producto creado exitosamente", 
      data: { 
        id: results.insertId, 
        nombre, 
        descripcion, 
        precio, 
        stock: stock || 0, 
        proveedor_id 
      } 
    });
  });
}
//controlador para actualizar un producto
export const actualizarProducto = (req, res) =>{
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, proveedor_id } = req.body;
    
    // Validar que el ID sea válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }
    
    // Validaciones básicas
    if (!nombre || !precio) {
      return res.status(400).json({ error: "Nombre y precio son obligatorios" });
    }
    
    const query = "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, proveedor_id = ? WHERE id = ? AND activo = TRUE";
    
    pool.query(query, [nombre, descripcion, precio, stock, proveedor_id, id], (err, results) => {
      if (err) {
        console.error("Error al actualizar el producto:", err);
        return res.status(500).json({ error: "Error al actualizar el producto" });
      }
      
      // Verificar si se actualizó el producto
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Producto no encontrado o ya está inactivo" });
      }
      
      //si todo esta okey enviamos la respuesta
      res.json({ 
        message: "Producto actualizado exitosamente", 
        data: { id, nombre, descripcion, precio, stock, proveedor_id } 
      });
    });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ error: "Error al actualizar el producto" });
  }
}

//controlador para borrado lógico de un producto
export const borrarProducto = (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar que el ID sea válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }
    
    const query = "UPDATE productos SET activo = FALSE WHERE id = ?";
    
    pool.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error al borrar el producto:", err);
        return res.status(500).json({ error: "Error al borrar el producto" });
      }
      
      // Verificar si se encontró y actualizó el producto
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      
      res.json({ 
        message: "Producto borrado exitosamente", 
        data: { id } 
      });
    });
  } catch (error) {
    console.error("Error al borrar el producto:", error);
    return res.status(500).json({ error: "Error al borrar el producto" });
  }
}