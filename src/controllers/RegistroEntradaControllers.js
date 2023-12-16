const Unidades = require("../models/Unidades");
const Temas = require("../models/Temas");
const RegistroEntrada = require("../models/RegistroEntrada");
const Profesores = require("../models/Profesores");
const Carreras = require("../models/Carreras");
const Materias = require("../models/Materias");
const Cursos = require("../models/Cursos");

const listar = async (req, res) => {
  const { anio, mes } = req.params; // Obtiene las fechas de inicio y fin desde la solicitud

  try {
    const registro_entrada = await RegistroEntrada.findAll({
      attributes: ["id", "FechaHoraEntrada", "Observacion", "Seleccion"],
      where: {
        eliminado: false, // Solo seleccionar carreras no eliminadas
        anio: anio,
        mes: mes,
      },
      include: [
        {
          model: Unidades,
          attributes: ["id", "Nombre_Unidad"],
        },
        {
          model: Materias,
          attributes: ["id", "Nombre_Materia"],
        },
        {
          model: Profesores,
          attributes: ["id", "ci", "nombre", "apellido"],
        },
        {
          model: Carreras,
          attributes: ["id", "Nombre_Carrera"],
        },
        {
          model: Cursos,
          attributes: ["id", "Nombre_Curso"],
        },
        {
          model: Temas,
          attributes: ["id", "Nombre_Tema"],
        },
      ],
    });
    res.json(registro_entrada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar los RegistroEntrada" });
  }
};

const listarUno = async (req, res) => {
  const { id } = req.params;
  try {
    const registro_entrada = await RegistroEntrada.findByPk(id, {
      attributes: ["id", "FechaHoraEntrada", "Observacion", "Seleccion"],
      where: {
        eliminado: false, // Solo seleccionar carreras no eliminadas
      },
      include: [
        {
          model: Profesores,
          attributes: ["id", "ci", "nombre", "apellido"],
        },
        {
          model: Carreras,
          attributes: ["id", "Nombre_Carrera"],
        },
        {
          model: Cursos,
          attributes: ["id", "Nombre_Curso"],
        },
        {
          model: Materias,
          attributes: ["id", "Nombre_Materia"],
        },
        {
          model: Unidades,
          attributes: ["id", "Nombre_Unidad"],
          //  attributes:{ exclude: ["SeleccionesUnidades"],}
        },
        {
          model: Temas,
          attributes: ["id", "Nombre_Tema"],
        },
      ],
    });
    if (!registro_entrada) {
      return res.status(404).json({ message: "RegistroEntrada no encontrado" });
    }
    res.json(registro_entrada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar el RegistroEntrada" });
  }
};

const crear = async (req, res) => {
  const {
    ClaseN,
    Observacion,
    Seleccion,
    ID_Materia,
    ID_Profesor,
    ID_Carrera,
    ID_Curso,
    unidadeId,
    temaId,
    
  } = req.body;

  //   Validación de datos
  if (!ID_Materia || !ID_Profesor || !ID_Carrera || !ID_Curso) {
    return res.status(400).json({
      message: "Faltan datos obligatorios. Asegúrese de proporcionar.",
    });
  }
  try {
    const registro_entrada = await RegistroEntrada.create({
      Observacion,
      ID_Materia,
      Seleccion,
      ID_Profesor,
      ID_Carrera,
      ID_Curso,
      ClaseN,
      Seleccion,
      ClaseN
    });

    // Asocia el nuevo registro de entrada a los unidades seleccionados
    if (unidadeId && unidadeId.length > 0) {
      await registro_entrada.setUnidades(unidadeId);
    }
    //   Asocia el nuevo registro de entrada a los temas seleccionados
    if (temaId && temaId.length > 0) {
      await registro_entrada.setTemas(temaId);
    }
    res.status(201).json({
      message: "RegistroEntrada creado exitosamente",
      registro_entrada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el RegistroEntrada" });
  }
};

const editar = async (req, res) => {
  const { id } = req.params;
  const {
    Observacion,
    FechaHoraSalida,
    ObservacionSalida,
    Seleccion,
    ID_Materia,
    ID_Profesor,
    ID_Carrera,
    ID_Curso,
    unidadeId,
    temaId,
  } = req.body;

  try {
    const registro_entrada = await RegistroEntrada.findByPk(id);
    if (!registro_entrada) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }
    // Actualiza los datos del registro de entrada
    // registro_entrada.Observacion = Observacion;
    registro_entrada.FechaHoraSalida = FechaHoraSalida;
    registro_entrada.ObservacionSalida = ObservacionSalida;
    // registro_entrada.Seleccion = Seleccion;
    // registro_entrada.ID_Materia = ID_Materia;
    // registro_entrada.ID_Profesor = ID_Profesor;
    // registro_entrada.ID_Carrera = ID_Carrera;
    // registro_entrada.ID_Curso = ID_Curso;
    await registro_entrada.save();
    
    res.json({
      message: "Registro actualizado exitosamente",
      registro_entrada,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al editar el Registro" });
  }
  
}

module.exports = {
  listar,
  listarUno,
  crear,
  editar,
};
