const conection = require("./../config/db")

const getAllVentas = (req, res) => {
    const consulta = `select * from ventas v join usuarios u
    on v.id_usuario = u.id_usuario`

    conection.query(consulta, (error, result) => {
        if (error) return res.status(500).json({ message: "error al traer las ventas" })

        return res.json(result)
    })
}

const getVentas = (req, res) => {
    const { id } = req.params

    const consulta = `select * from ventas where id_ventas=?`

    conection.query(consulta, [id], (error, status) => {
        if (error) return res.status(500).json({ message: "error al traer la venta" })

        return res.status(201).json(result)
    })
}

const createVentas = (req, res) => {
    const {
        id_usuario,
        precio_total,
        id_producto,
        cantidad,
        precio_unitario,
        subtotal
    } = req.body

    const consulta=`insert into ventas (id_usuario,precio_total) values(?,?)`

    conection.query(consulta,[id_usuario,precio_total],(error,result)=>{
        if(error) return res.status(500).json({message:"error al crear la venta"})

        if(result.affectedRows===0) return res.status(404).json({message:"usuario no encontrado"})

        const id_venta=result[0].id_venta
        
        const consulta =`insert into detalle_ventas (id_venta,id_producto,cantidad,precio_unitario) values(?,?,?,?)`

        
    })
}