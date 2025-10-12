const db = require("../config/DB");


const getTotalVentasMes = (req, res) => {
  const query = `
    SELECT *
    FROM total_ventas_mes
    ORDER BY mes DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener total de ventas por mes:", err);
      return res.status(500).json({ error: "Error al obtener métricas" });
    }
    res.json(results);
  });
};


module.exports = { getTotalVentasMes };

