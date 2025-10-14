const { conection } = require("../config/DB");
const brcyptjs = require("bcryptjs")

const getSocios = (req, res)=>{
    const consulta = "select * from socios"

    conection.query(consulta,(err,result)=>{
        if(err){
            console.log("Error al tratar de traer los socios", err)
            return res.status(500).json({error:"Error al traer los socios"});
        }
        res.status(200).json({message:"Socios traidos con exito", result})
    })
}