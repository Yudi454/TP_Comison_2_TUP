const {connection} = require('../config/config')

const mostrarTodosProductos = (req,res) =>{

    const queryProductos = "select * from Productos where activo = ?"

    connection.query(queryProductos,[1],(error,results)=>{

        if(error){
            console.error("Error al obtener los clientes activos: ", error)
            res.json({message:"Error al obtener los clientes activos" })
        }

        res.status(200).json(results)
    })
};

const mostrarProductosInactivos =(req,res) =>{

    
    const queryProductos = "select * from Productos where activo = ?"

    connection.query(queryProductos,[0],(error,results)=>{

        if(error){
            console.error("Error al obtener los productos inactivos: ", error)
            res.json({message:"Error al obtener los productos inactivos" })
        }

        res.status(200).json(results)
    })
};

const mostrarProductosPorId = (req,res) =>{
 const {id} = req.params.id;
 const queryPorID = "select * from Productos where id_producto = ?"

 connection.query(queryPorID,[id],(error,results)=>{
    if(error)
    {
        console.error("Error al obtener los productos inactivos: ", error)
        res.json({message: "Error al obtener el producto" })
    }

    res.status(200).json(results)
 })
}

const crearProductos = (req,res) =>{
    const {nombre,descripcion,precio,stock} = req.body
    const queryCrear = "insert into Productos (nombre,descripcion,precio,stock) values (?,?,?,?)"

    connection.query(queryCrear,[nombre,descripcion,precio,stock],(error,results)=>{
        if(error)
        {
            console.error("Error al crear el producto: ", error)
            res.json({message: "Error al crear el producto" })
        }

        res.status(201).json({message:"producto creado exitosamente"})
    })  
};

const actualizarProducto = (req,res) =>{
    const {id} = req.params.id
    const {nombre,descripcion,precio,stock} = req.body

    const queryActualizar = "update Productos set nombre = ?, descripcion = ?, precio = ?, stock = ? where id_producto = ?"
    connection.query(queryActualizar,[nombre,descripcion,precio,stock,id],(error,results)=>{
        if(error)
        {
            console.error("Error al actualizar el producto: ", error)
            res.json({message: "Error al actualizar el producto" })
        }

        res.status(200).json({message:"producto actualizado exitosamente"})
    })
};

const eliminadoLogicoProducto = (req,res) =>{
    const {id} = req.params.id
    const queryEliminar = "update Productos set activo = ? where id_producto = ?"
    connection.query(queryEliminar,[0,id],(error,results)=>{
        if(error)
        {
            console.error("Error al eliminar el producto: ", error)
            res.json({message: "Error al eliminar el producto" })
        }

        res.status(200).json({message:"producto eliminado exitosamente"})
    })
};

const activarProducto = (req,res) =>{
       const {id} = req.params.id
    const queryActivar = "update Productos set activo = ? where id_producto = ?"
    connection.query(queryActivar,[1,id],(error,results)=>{
        if(error)
        {
            console.error("Error al activar el producto: ", error)
            res.json({message: "Error al activar el producto" })
        }

        res.status(200).json({message:"producto activado exitosamente"})
    })
};

module.exports = {mostrarTodosProductos, mostrarProductosInactivos,mostrarProductosPorId,crearProductos,actualizarProducto,
    eliminadoLogicoProducto,activarProducto}