const {connection} =require("../config/config")

const mostrarTodosVentas = (req, res) => {

 const queryVentas = `
 select  v.fecha,v.total,c.nombre,c.apellido,c.DNI,u.username from Ventas v
 join Usuarios u on u.id_usuario = v.id_usuario
 join Clientes c on c.id_cliente = v.id_cliente
 where activo = ?`

    connection.query(queryVentas, [1], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener ventas activas" });
        }
        res.json(results);
    });
};

const mostrarVentasInactivas = (req, res) => {

  const queryVentas = `
 select  v.fecha,v.total,c.nombre,c.apellido,c.DNI,u.username from Ventas v
 join Usuarios u on u.id_usuario = v.id_usuario
 join Clientes c on c.id_cliente = v.id_cliente
 where activo = ?`

    connection.query(queryVentas, [0], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener ventas inactivas" });
        }
        res.json(results);
    });
};

const mostrarVentasPorId = (req, res) => {
    const { id } = req.params;

     const queryVentas = `
      select  v.fecha,v.total,c.nombre,c.apellido,c.DNI,u.username from Ventas v
      join Usuarios u on u.id_usuario = v.id_usuario
      join Clientes c on c.id_cliente = v.id_cliente
        where activo = ? and id_ventas = ?`

    connection.query(queryVentas, [1, id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener la venta" });
        }
        res.json(results);
    });
};

const crearVentas = (req, res) => {

const { fecha, precio_unitario, id_cliente, id_usuario,id_producto,cantidad} = req.body;


//esto es para la compra de 1 solo producto, pero varios producto se usa un array que trae toda la seleccion desde el front correspondiente a producto

    const queryVentas = `
    INSERT INTO Ventas (fecha, total, id_cliente, id_usuario)
    VALUES (?, ?, ?, ?)`;

    const queryDetalleVentas = "insert into Ventas_Detalles (id_venta,id_producto,cantidad,precio_unitario,subtotal) values(?,?,?,?,?)";

    const queryProducto = "update Producto set stock = ? where id_producto = ?"

    const queryExisteCliente = "select 1 from Clientes where id_cliente = ?"

    const queryExisteUsuario = "select 1 from Usuarios where id_usuario= ?"

    const queryExisteProducto = "select 1 from Producto where id_producto = ?"

    connection.query(queryExisteCliente,[id_cliente],(error,clienteRows)=>{
        if(error) return res.status(500).json({error:"Error verificando Cliente"})
        if(!clienteRows.length) return res.status(404).json({error:"Cliente no encontrado"})

     connection.query(queryExisteUsuario,[id_usuario],(error,usuarioRows)=>{
         if(error) return res.status(500).json({error:"Error verificando Usuario"})
         if(!usuarioRows.length) return res.status(404).json({error:"Usuario no encontrado"})

      connection.query(queryVentas,[fecha,total,id_cliente,id_usuario],(error,ventaRows)=>{

      if(error) return req.status(500).json({error:"Error al crear Venta"})
       
        // array != 0 
        if(ventaRows.length > 0){

            //verifico si existe el producto basado en el id_producto
        connection.query(queryExisteProducto, [id_producto], (error,productoRows)=>{
            if(error) return req.status(500).json({error:"Error verificando Producto"})
            if(!productoRows.length) return res.status(404).json({error: "Producto no encontrado"})

         if(productoRows.length > 0){

            const idVentas = ventaRows[0].id_venta
            const subtotal = cantidad * precio_unitario
            

            connection.query(queryDetalleVentas,[idVentas,id_producto,parseInt(cantidad),parseFloat(precio_unitario),parseFloat(subtotal)],(error, detalleVentaRows)=>{
                if(error) return req.status(500).json({error:"Error al crear Detalle de Venta"})
                //actualizar el stock por la venta
                const stockOrigin = productoRows[0].stock
                const cantidadVendida = parseInt(cantidad)
                //nuevo stock que se genera despues de la venta
                const nuevoStock = stockOrigin - cantidadVendida

                if(nuevoStock < 0) return req.status(400).json({error:"Stock insuficiente"})


                connection.query(queryProducto,[nuevoStock,id_producto],(error,productoUpdateRows)=>{
                    if(error) return req.status(500).json({error:"Error al actualizar stock de Producto"})

                        res.status(201).json({message:"Venta registrada exitosamente"})
                })
            })
         }

        })

        }

      })



     })


    })

}

const actualizarVentas = (req, res) => {
    const { id } = req.params;
    const cambios = req.body;
    connection.query("UPDATE ventas SET ? WHERE id = ?", [cambios, id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al actualizar la venta" });
        }
        res.json({ id, ...cambios });
    });
};

const eliminadoLogicoVentas = (req, res) => {
    const { id } = req.params;
    connection.query("UPDATE ventas SET estado = 'inactivo' WHERE id = ?", [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al eliminar la venta" });
        }
        res.json({ id, estado: 'inactivo' });
    });
};

const activarVentas = (req, res) => {
    const { id } = req.params;
    connection.query("UPDATE ventas SET estado = 'activo' WHERE id = ?", [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al activar la venta" });
        }
        res.json({ id, estado: 'activo' });
    });
};

module.exports = {mostrarTodosVentas, mostrarVentasInactivas, mostrarVentasPorId, crearVentas,
    actualizarVentas, eliminadoLogicoVentas, activarVentas}