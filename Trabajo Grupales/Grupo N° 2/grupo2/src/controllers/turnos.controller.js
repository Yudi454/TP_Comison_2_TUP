import db from "../config/db.js";

export const solicitarTurno = (req, res) => {
  try {
    const {
      idPaciente,
      idMedico,
      FechaRequeridaTurno,
      HoraRequeridaTurno,
      EstadoTurno,
    } = req.body;

    if (
      !idPaciente ||
      !idMedico ||
      !FechaRequeridaTurno ||
      !HoraRequeridaTurno ||
      !EstadoTurno
    ) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    // Verificar si ya existe un turno para el mismo médico en la misma fecha y hora
    const verificarDisponibilidad =
      "SELECT idTurno FROM turnos WHERE idMedico = ? AND FechaRequeridaTurno = ? AND HoraRequeridaTurno = ? AND EstadoTurno != 'Cancelado'";

    db.query(
      verificarDisponibilidad,
      [idMedico, FechaRequeridaTurno, HoraRequeridaTurno],
      (error, results) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .json({ message: "Error al verificar disponibilidad" });
        }

        // Si ya existe un turno en ese horario
        if (results.length > 0) {
          return res.status(409).json({
            message: "Turno no disponible, por favor elija otro horario",
          });
        }

        // Si hay disponibilidad, procede a otorgar el turno
        const solicitar =
          "INSERT INTO turnos (idPaciente, idMedico, FechaRequeridaTurno, HoraRequeridaTurno, EstadoTurno) VALUES (?, ?, ?, ?, 'Pendiente')";

        db.query(
          solicitar,
          [
            idPaciente,
            idMedico,
            FechaRequeridaTurno,
            HoraRequeridaTurno,
            EstadoTurno,
          ],
          (error, results) => {
            if (error) {
              console.log(error);
              return res
                .status(500)
                .json({ message: "Error al solicitar turno" });
            }
            res.status(201).json({
              message: "Turno solicitado con éxito",
              id: results.insertId,
            });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// traer turnos por fecha
export const traerTurnosPorFecha = (req, res) => {
  try {
    const { fechaSolicitudTurno } = req.params;
    
    // Validar que se proporcione la fecha
    if (!fechaSolicitudTurno) {
      return res.status(400).json({ message: "La fecha es obligatoria" });
    }
    
    const traerTurnos = "SELECT * FROM turnos WHERE FechaRequeridaTurno = ?";
    db.query(traerTurnos, [fechaSolicitudTurno], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al traer turnos" });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
