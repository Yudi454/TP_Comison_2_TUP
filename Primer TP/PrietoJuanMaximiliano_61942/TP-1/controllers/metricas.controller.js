const { connection } = require("../config/DB");

const cantidadVentas = (req, res) => {
	const query = "SELECT COUNT(*) AS cantidad FROM ventas";
	connection.query(query, (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Error al obtener la cantidad de ventas", details: err.message });
		}
		res.json({ cantidad: results[0].cantidad });
	});
};

const montoTotalVentas = (req, res) => {
	const query = "SELECT SUM(total) AS monto_total FROM ventas";
	connection.query(query, (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Error al obtener el monto total de ventas", details: err.message });
		}
		res.json({ monto_total: results[0].monto_total });
	});
};

module.exports = { cantidadVentas, montoTotalVentas };
