const { conection } = require("../DB")

// Mostrar todas las reservas
const getReservas = (req, res) => {
    const sql = "SELECT * FROM reservas"
    conection.query(sql, (error, results) => {
        if (error) throw error
        res.json(results)
    })
}

