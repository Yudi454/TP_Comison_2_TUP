// Ejemplo simple de ventas
const ventas = [
  { id: 1, producto: "Café", cantidad: 10 },
  { id: 2, producto: "Helado", cantidad: 5 },
];

const getVentas = (req, res) => {
  res.json(ventas);
};

module.exports = { getVentas };
