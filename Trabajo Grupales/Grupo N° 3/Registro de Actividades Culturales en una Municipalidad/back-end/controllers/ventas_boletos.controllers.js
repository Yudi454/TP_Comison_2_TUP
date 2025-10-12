const connection  = require("../config/bd");

// Obtener todas las ventas
const obtenerVentas = async (req, res) => {
    try {
        const [ventas] = await connection.execute('SELECT * FROM ventas_boletos');
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Obtener ventas de un evento
const obtenerVentasPorEvento = async (req, res) => {
    try {
        const { eventoId } = req.params;
        const [ventas] = await connection.execute(
            'SELECT * FROM ventas_boletos WHERE evento_id = ?',
            [eventoId]
        );
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Crear nueva venta
const crearVenta = async (req, res) => {
    try {
        const { evento_id, cantidad_boletos, total_venta, metodo_pago } = req.body;
        
        const [result] = await connection.execute(
            'INSERT INTO ventas_boletos (evento_id, cantidad_boletos, total_venta, metodo_pago) VALUES (?, ?, ?, ?)',
            [evento_id, cantidad_boletos, total_venta, metodo_pago || 'efectivo']
        );
        
        res.json({ message: 'Venta registrada', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Obtener total de ventas por evento
const obtenerTotalVentas = async (req, res) => {
    try {
        const [totales] = await connection.execute(`
            SELECT evento_id, SUM(cantidad_boletos) as total_boletos, SUM(total_venta) as total_ingresos
            FROM ventas_boletos 
            GROUP BY evento_id
        `);
        res.json(totales);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
};

module.exports = {
    obtenerVentas,
    obtenerVentasPorEvento,
    crearVenta,
    obtenerTotalVentas
};