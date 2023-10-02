const RegistroSalida = require("../models/RegistroSalida");
const Profesores = require("../models/Profesores");

// const listar = async (req, res) => {
//     try {
//       const registro_salida = await RegistroSalida.findAll({
//         attributes: ["id", "FechaHoraSalida", "Observacion"],
        
//         where: {
//           eliminado: false, // Solo seleccionar registro_salida no eliminados
//         },
//         include: {
//           model: Profesores,
//           attributes: ["id", "ci", "nombre", "apellido"],
//         },
//       });
      
//       res.json(registro_salida);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error al listar los registro_salida" });
//     }
//   }

const listar = async (req, res) => {
  try {
    const { anio, mes } = req.params; // Obtiene las fechas de inicio y fin desde la solicitud
    // const fechaInicio = req.query.fecha_inicio;
    // const fechaFin = req.query.fecha_fin;
    // const { id } = req.params;


    const registro_salida = await RegistroSalida.findAll({
      attributes: ["id", "FechaHoraSalida", "Observacion"],
      where: {
        eliminado: false, // Solo seleccionar registros de salida no eliminados
        // FechaHoraSalida: > fechaInicio,
        anio: anio,
        mes: mes
      },
      include: {
        model: Profesores,
        attributes: ["id", "ci", "nombre", "apellido"],
      },
    });
    const re =[ {
      registros_salida: "a"
    }]
    // console.log(fechaInicio)
    // console.log(fechaFin)

    res.json(registro_salida);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar los registros de salida" });
  }
};

const listarUno =  async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
      const registro_salida = await RegistroSalida.findByPk(id, {
        attributes: ["id", "FechaHoraSalida", "Observacion", "ID_Profesor"],
        where: {
          eliminado: false, // Solo seleccionar registro_salida no eliminados
        },
      });
      if (!registro_salida) {
        return res
          .status(404)
          .json({ message: "Registro de salida no encontrado" });
      }
      res.json(registro_salida);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al listar los registro_salida" });
    }
  }
const crear = async (req, res) => {
    const { Observacion, ID_Profesor } = req.body;
  
    // Validación de datos
    if (!ID_Profesor) {
      return res.status(400).json({
        message:
          "Faltan datos obligatorios. Asegúrese de proporcionar.",
      });
    }
  
    try {
      // Crear el registro de salida
      const registro_salida = await RegistroSalida.create({
        Observacion,
        ID_Profesor,
      });
  
      res.status(201).json({
        message: "Registro de salida creado exitosamente",
        registro_salida,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "Hubo un error al crear el registro de salida. Por favor, inténtelo de nuevo más tarde.",
      });
    }
  }
const editar = async (req, res) => {
    const { id } = req.params;
    const { Observacion, ID_Profesor } = req.body;
  
    try {
      const registro_salida = await RegistroSalida.findByPk(id);
      if (!registro_salida) {
        return res
          .status(404)
          .json({ message: "Registro de salida no encontrado" });
      }
  
      // Actualizar el registro de salida
      registro_salida.ID_Profesor = ID_Profesor;
      registro_salida.Observacion = Observacion;
      await registro_salida.save();
  
      res.json({message: "Registro de salida editado exitosamente",registro_salida});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al editar el registro de salida" });
    }
  }
const eliminar = async (req, res) => {
    const { id } = req.params;
    try {
      const registro_salida = await RegistroSalida.findByPk(id);
      if (!registro_salida) {
        return res
          .status(404)
          .json({ message: "Registro de salida no encontrado" });
      }
  
      // Marcar el registro de salida como eliminado
      registro_salida.eliminado = true;
      await registro_salida.save();
  
      res.json({ message: "Registro de salida eliminado" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error al eliminar el registro de salida" });
    }
  }

module.exports = {
    listar,
    listarUno,
    crear,
    editar,
    eliminar
}