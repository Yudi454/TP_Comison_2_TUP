import pool from "../config/db.js";

//controlador para obtener todos los usuarios

export const obtenerUsuarios = (req, res) => {
  try {
    const query = "Select * from usuarios";
    //hacemos la consulta
    pool.query(query, (err, results) => {
      //manejo de errores
      if (err) {
        console.error("Error al obtener los usuarios:", err);
        return res.status(500).json({ error: "Error al obtener los usuarios" });
      }
      //si todo esta okey enviamos la respuesta
      res.json(results);
    });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

//controlador para obtener un usuario por su id
export const obtenerUsuariosPorId = (req, res)=>{
  try {
    const { id} = req.params;
    const query = "Select * from usuarios where id = ?";
    //hacemos la consulta
    pool.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error al obtener el usuario:", err);
        return res.status(500).json({ error: "Error al obtener el usuario" });
      }
      //si todo esta okey enviamos la respuesta
      res.json(results);
    });
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return res.status(500).json({ error: "Error al obtener el usuario" });
  }
}

//controlador para crear un nuevo usuario

export const crearUsuario = (req, res) =>{
  try {
    const { nombre, email, password} = req.body;
    const query = "Insert into usuarios (nombre, email, password) values (?, ?, ?)";
    //hacemos la consulta
    pool.query(query, [nombre, email, password], (err, results) => {
      if (err) {
        console.error("Error al crear el usuario:", err);
        return res.status(500).json({ error: "Error al crear el usuario" });
      }
      //si todo esta okey enviamos la respuesta
      res.status(201).json({ message: "Usuario creado exitosamente", data: { id: results.insertId, nombre, email } });
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return res.status(500).json({ error: "Error al crear el usuario" });
  }
}

//controlador para actualizar un usaurio
export const actualizarUsuario = (req, res) =>{
  try {
    const { id } = req.params;
    const { nombre, email, password } = req.body;
    const query = "Update usuarios set nombre = ?, email = ?, password = ? where id = ?";
    //hacemos la consulta
    pool.query(query, [nombre, email, password, id], (err, results) => {
      if (err) {
        console.error("Error al actualizar el usuario:", err);
        return res.status(500).json({ error: "Error al actualizar el usuario" });
      }
      //si todo esta okey enviamos la respuesta
      res.json({ message: "Usuario actualizado exitosamente", data: { id, nombre, email } });
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return res.status(500).json({ error: "Error al actualizar el usuario" });
  }
}

//controlador para hacer un borrado logico de un usaurio

export const borrarUsuario = (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar que el ID sea un número válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }
    
    const query = "UPDATE usuarios SET activo = 0 WHERE id = ?";
    
    pool.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error al borrar el usuario:", err);
        return res.status(500).json({ error: "Error al borrar el usuario" });
      }
      
      // Verificar si se encontró y actualizó el usuario
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      
      res.json({ 
        message: "Usuario borrado exitosamente", 
        data: { id } 
      });
    });
  } catch (error) {
    console.error("Error al borrar el usuario:", error);
    return res.status(500).json({ error: "Error al borrar el usuario" });
  }
};
