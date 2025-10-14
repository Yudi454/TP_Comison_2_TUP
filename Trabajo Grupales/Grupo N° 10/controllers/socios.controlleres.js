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

const getSocio = (req, res) =>{
    const id = req.params.id
    const consulta = "select * from socios where idSocio = ?"

    conection.query(consulta,[id],(error,result)=>{
        if (error) {
      console.log("Error al traer el socio:", error);
      return res.status(500).json({ error: "Error al traer al el socio" });
    }
    res.status(200).json({ message: "Socio traido con exito", result });
    })
}

const createSocio = async (req, res)=>{
    const {nombreSocio, apellidoSocio, emailSocio, contraSocio} = req.body;

    let salt = await bcryptjs.genSalt(10);
    let contraEncrip = await bcryptjs.hash(contraSocio, salt);

    const consulta = "insert into socios (nombreSocio, apellidoSocio, emailSocio, contraSocio) values (?,?,?,?)";
    
    conection.query(consulta,[nombreSocio, apellidoSocio, emailSocio, contraEncrip],(err, result)=>{
        if(err){
            console.log("Error al crear Socio",err)
            return res.status(500).json({error:"Error al crear Socio"})
        }
        res.status(201).json({message:"Socio creado con exito"})
    })
}