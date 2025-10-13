// Importamos la conexión a la base de datos desde la configuración
const { connection } = require("../config/database");

//   OBTENER TODOS LOS PRODUCTOS
const getAllProducts = (req, res) => {

  // Consulta SQL: selecciona todos los registros de la tabla Producto
  const consulta = " select * from productos";


  // Ejecutamos la consulta en la base de datos
  connection.query(consulta, (err, result) => {
    if (err) throw err;  // Si ocurre un error en la consulta, lo mostramos


    // Si no hay resultados, devolvemos un mensaje de error
    if(result.length ===0){
     res.status(404).send({ message : "Error en los Productos"})

    } else{
       // Si hay resultados, los devolvemos en formato JSON
        res.json(result);

    }
  });
};


//   OBTENER UN PRODUCTO POR SU ID
const getOneProduct = (req, res) => {


  // Obtenemos el ID del producto desde los parámetros de la URL
  const id = req.params.id;


   // Consulta SQL: busca el producto con ese ID
  const consulta = "select * from productos where id_producto=? ";


  // Ejecutamos la consulta con el ID como parámetro
  connection.query(consulta, [id], (err, result) => {
    if (err) throw err;// Si ocurre un error en la consulta, lo mostramos

    // Si no se encuentra el producto, devolvemos un error 404
    if (result.length === 0) {
      res.status(404).send({ message: "No existe el producto" });
    } else {
      // Si hay resultados, los devolvemos en formato JSON
      res.json(result);
    }
  });
};



//   ELIMINAR PRODUCTO (BORRADO LÓGICO)
const deleteProduct = (req, res) => {


  // Obtenemos el ID del producto a eliminar
  const id = req.params.id;

  
  // Consulta SQL: cambio de estado del producto (0 = inactivo)
  const consulta = "UPDATE productos SET estado_producto = 0 WHERE id_producto = ?";


  // Ejecutamos la actualización
  connection.query(consulta, [id], (err, result) => {
    if (err) throw err;


    // Si no se afectó ninguna fila, devolvemos mensaje de error
    if(result.length === 0){

        res.status(404).send({ message: "Error del producto"})
    }
    else {

      // Si se actualizó correctamente, enviamos confirmación
      res.status(200).send({ message: "Producto eliminado correctamente" });
    }
  });
};



//   ACTUALIZAR DATOS DE UN PRODUCTO
const updateProduct = (req, res) => {

  // Obtenemos los datos desde el body y los parámetros
  const id_producto = req.params.id;
  const id_proveedor = req.body.id_proveedor;
  const nombre_producto = req.body.nombre_producto;
  const categoria = req.body.categoria;
  const precio = req.body.precio;
  const estado_producto = req.body.estado_producto;


 // Consulta SQL: actualiza los datos del producto por su ID 
  const consulta =
    "UPDATE producto SET id_proveedor=? , nombre_producto=? , categoria=? , precio=? , estado_producto=? WHERE id_producto=? ";

  connection.query(consulta,[id_proveedor, nombre_producto, categoria , precio, estado_producto,id_producto ],(err, result) => {
      if (err) {

        // Si ocurre un error, lo mostramos en consola y devolvemos error 500
        console.error("Error al actualizar producto:", err);
        return res
          .status(500)
          .send({ message: "Ocurrió un error en el servidor." }); 
      } else {

        // Si todo salió bien, devolvemos mensaje de éxito
        res.status(200).send({ message: "Producto editado correctamente." });
      }
    }
  );
};




//   CREAR UN NUEVO PRODUCTO
const createProduct = (req, res) => {
  

  // Extraemos los datos del producto desde el cuerpo de la solicitud
  const id_proveedor = req.body.id_proveedor;
  const nombre_producto = req.body.nombre_producto;
  const categoria = req.body.categoria;
  const precio = req.body.precio;
  const estado_producto = req.body.estado_producto;
  


  // Consulta SQL: inserta un nuevo registro en la tabla 'productos'
  const consulta =
    "INSERT INTO productos ( id_proveedor, nombre_producto ,categoria , precio , estado_producto) VALUES ( ?, ?, ?, ?,?);";


    // Ejecutamos la consulta con los valores proporcionados
   connection.query(
    consulta,
    [id_proveedor, nombre_producto, categoria, precio, estado_producto],
    (err, result) => {
      if (err) {
        console.error("Error al cargar el producto:", err);
        return res
          .status(500)
          .send({ message: "Ocurrió un error en el servidor." });
      } else {

        // Si el producto se insertó correctamente, devolvemos confirmación
        res.status(200).send({ message: "Producto cargado correctamente." });
      }
    }
  );
};

//   EXPORTACIÓN DE FUNCIONES
module.exports = {getAllProducts, getOneProduct, deleteProduct, updateProduct, createProduct}