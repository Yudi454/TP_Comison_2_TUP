const { Result } = require("express-validator")
const conection = require("./../config/db")

const getAllProductos = (req, res) => {
    const consulta = `select * from productos where estado_producto=true`

    conection.query(consulta, (error, result) => {
        if (error) return res.status(500).json({ message: "error al traer las productos" })

        return res.json(result)
    })
}

const getProductos = (req, res) => {
    const { id } = req.params

    const consulta = `select * from productos where id_producto_?`

    conection.query(consulta, [id], (error, result) => {
        if (error) return res.status(500).json({ message: "error al traer el producto" })

        if (result.length === 0) return res.status(404).json({ message: "producto no encontrado" })

        return res.json(result)
    })
}

const createProducto = (req, res) => {
    const {
        id_proveedor,
        nombre_producto,
        descripcion_producto,
        precio_venta,
        precio_compra
    } = req.body

    const consulta = `insert into productos (
        id_proveedor,
        nombre_producto,
        descripcion_producto,
        precio_venta,
        precio_compra)
        values (?,?,?,?,?)`

    conection.query(consulta,[id_proveedor,
        nombre_producto,
        descripcion_producto,
        precio_venta,
        precio_compra],
        (error,result)=>{
            if(error) return res.status(500).json({message:"error al crear el producto"})

            return res.status(200).json({message:"producto creado con exito"})
        }
    )
}

const updateProducto=(req,res)=>{
    const {id}= req.params

    const {id_proveedor,
        nombre_producto,
        descripcion_producto,
        precio_venta,
        precio_compra
    }=req.body

    const consulta =`update productos set id_proveedor=?,
        nombre_producto=?,
        descripcion_producto=?,
        precio_venta=?,
        precio_compra=?
        where id_producto=?`

    conection.query(consulta,[id_proveedor,
        nombre_producto,
        descripcion_producto,
        precio_venta,
        precio_compra,
        id
    ],
    (error,result)=>{
        if(error) return res.status(500).json({message:"error a actualizar producto"})

        if(result.affectedRows===0) return res.status(404).json({message:"producto no encontrado"})

        return res.status(200).json({message:"producto actualizado con exito"})
    })
}

const deleteProducto=(req,res)=>{
    const {id}=req.params

    const consulta= `update producto set estado_producto= falsa where id_producto=?`

    conection.query(consulta,[id],(error,result)=>{
        if(error) return res.status(500).json({message:"error al aliminar el producto"})

        if(result.affectedRows===0) return res.status(404).json({message:"no se encontro el producto"})

        return res.status(200).json({message:"producto eliminado con exito"})
    })
}

module.exports={
    getAllProductos,
    getProductos,
    createProducto,
    updateProducto,
    deleteProducto
}