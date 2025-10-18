import pool from "../config/db.js";

//controlador para obtener todos los proveedores
export const obtenerTodosLosProveedores = (req, res) => {
  try {
    const query = "SELECT * FROM proveedores WHERE activo = TRUE";
    //hacemos la consulta
    pool.query(query, (err, results) => {
      //manejo de errores
      if (err) {
        console.error("Error al obtener los proveedores:", err);
        return res.status(500).json({ error: "Error al obtener los proveedores" });
      }
      //si todo esta okey enviamos la respuesta
      res.json(results);
    });
  } catch (error) {
    console.error("Error al obtener los proveedores:", error);
    return res.status(500).json({ error: "Error al obtener los proveedores" });
  }
}

//controlador para obtener un proveedor por su id
export const obtenerProveedorPorId = (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM proveedores WHERE id = ? AND activo = TRUE";
    //hacemos la consulta
    pool.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error al obtener el proveedor:", err);
        return res.status(500).json({ error: "Error al obtener el proveedor" });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ error: "Proveedor no encontrado" });
      }
      
      //si todo esta okey enviamos la respuesta
      res.json(results[0]);
    });
  } catch (error) {
    console.error("Error al obtener el proveedor:", error);
    return res.status(500).json({ error: "Error al obtener el proveedor" });
  }
}

//controlador para crear un nuevo proveedor
export const crearProveedor = (req, res) => {
  try {
    const { nombre, telefono, email, direccion } = req.body;
    
    // Validaciones básicas
    if (!nombre) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }
    
    const query = "INSERT INTO proveedores (nombre, telefono, email, direccion) VALUES (?, ?, ?, ?)";
    //hacemos la consulta
    pool.query(query, [nombre, telefono || null, email || null, direccion || null], (err, results) => {
      if (err) { 
        console.error("Error al crear el proveedor:", err);
        return res.status(500).json({ error: "Error al crear el proveedor" });
      }
      //si todo esta okey enviamos la respuesta
      res.status(201).json({ 
        message: "Proveedor creado exitosamente", 
        data: { 
          id: results.insertId, 
          nombre, 
          telefono, 
          email, 
          direccion 
        } 
      });
    });
  } catch (error) {
    console.error("Error al crear el proveedor:", error);
    return res.status(500).json({ error: "Error al crear el proveedor" });
  }
}

//controlador para actualizar un proveedor
export const actualizarProveedor = (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, email, direccion } = req.body;
    
    // Validar que el ID sea válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de proveedor inválido" });
    }
    
    // Validaciones básicas
    if (!nombre) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }
    
    const query = "UPDATE proveedores SET nombre = ?, telefono = ?, email = ?, direccion = ? WHERE id = ? AND activo = TRUE";
    
    pool.query(query, [nombre, telefono, email, direccion, id], (err, results) => {
      if (err) {
        console.error("Error al actualizar el proveedor:", err);
        return res.status(500).json({ error: "Error al actualizar el proveedor" });
      }
      
      // Verificar si se actualizó el proveedor
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Proveedor no encontrado o ya está inactivo" });
      }
      
      //si todo esta okey enviamos la respuesta
      res.json({ 
        message: "Proveedor actualizado exitosamente", 
        data: { id, nombre, telefono, email, direccion } 
      });
    });
  } catch (error) {
    console.error("Error al actualizar el proveedor:", error);
    return res.status(500).json({ error: "Error al actualizar el proveedor" });
  }
}

//controlador para borrado lógico de un proveedor
export const borrarProveedor = (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar que el ID sea válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de proveedor inválido" });
    }
    
    const query = "UPDATE proveedores SET activo = FALSE WHERE id = ?";
    
    pool.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error al borrar el proveedor:", err);
        return res.status(500).json({ error: "Error al borrar el proveedor" });
      }
      
      // Verificar si se encontró y actualizó el proveedor
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Proveedor no encontrado" });
      }
      
      res.json({ 
        message: "Proveedor borrado exitosamente", 
        data: { id } 
      });
    });
  } catch (error) {
    console.error("Error al borrar el proveedor:", error);
    return res.status(500).json({ error: "Error al borrar el proveedor" });
  }
}