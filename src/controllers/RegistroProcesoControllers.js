const RegistroProceso = require("../models/RegistroProceso");
const Profesores = require("../models/Profesores");
const Unidades = require("../models/Unidades");
const Carreras = require("../models/Carreras");
const Materias = require("../models/Materias");
const Cursos = require("../models/Cursos");


const listar = async (req, res) => {
  // const { anio, mes } = req.params; // Obtiene las fechas de inicio y fin desde la solicitud

  try {
    const data = await RegistroProceso.findAll({
      where: {
        eliminado: false, // Solo seleccionar registros no eliminados
        // anio: anio,
        // mes: mes,
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
          // as: "ID_Profesr",
          foreignKey: "ID_Profesor",
          attributes: ["id", "ci", "nombre", "apellido"],
        },
        // {
        //   model: Profesores,
        //   attributes: ["id", "ci", "nombre", "apellido"],
        //   // as: "ID_Profesr",
        // },
        {
          model: Carreras,
          attributes: ["id", "Nombre_Carrera"],
        },
        {
          model: Cursos,
          attributes: ["id", "Nombre_Curso"],
        },
      ],
    });
    res.json(data);
  } catch (error) {
    // res.send(error);
    console.error(error);
    res.status(500).json({ message: "Error al leer los registros" });
  }
};

const listarUno = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await RegistroProceso.findByPk(id, {
      where: {
        eliminado: false, // Solo seleccionar registros no eliminados
      },
    });
    if (!data) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al leer el registro" });
  }
};

const listarPorCI = async (req, res) => {
  const { ID_Profesor } = req.params;
  try {
    const data = await RegistroProceso.findAll({
      where: {
        ID_Profesor,
        eliminado: false, // Solo seleccionar registros no eliminados
      },
    });
    res.json(data);
    if (!data) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }
  } catch (error) {
    // res.send(error);
    console.error(error);
    res.status(500).json({ message: "Error al leer los registros" });
  }
};
const crear = async (req, res) => {
  const {
    ClaseNumero,
    fecha,
    Observacion,
    HoraEntrada,
    HoraSalida,
    HorasPracticas,
    HoraClase,
    EsGrupal,
    EsResolucion,
    EsestudioCaso,
    EsSeminario,
    EsDemostacion,
    EsExpositiva,
    EsVideoTutorial,
    EsAprendizajeProblema,
    EsAprendizajeProyecto,
    EsTaller,
    EsInvestigacion,
    EsExtension,
    EsPruebaEscrita,
    EsPruebaOral,
    EsAnalisisTrabajo,
    EsObservacionRegistro,
    EsRubrica,
    EsEscala,
    EsListaConsejos,
    Unidad_Desarrollada,
    EsPruebaPractica,
    ContenidoDesarrollado,
    ActividadesRetroalimentcion,
    ID_Profesor,
    ID_Materia,
    Seleccion,
    // Observacion,
    ID_Carrera,
    ID_Curso,
    unidadeId,
    Temas,
  } = req.body;

  try {
    const data = await RegistroProceso.create({
      ClaseNumero,
      fecha,
      Observacion,
      HoraEntrada,
      HoraSalida,
      HorasPracticas,
      HoraClase,
      EsGrupal,
      EsResolucion,
      EsestudioCaso,
      EsSeminario,
      EsDemostacion,
      EsExpositiva,
      EsVideoTutorial,
      EsAprendizajeProblema,
      EsAprendizajeProyecto,
      EsTaller,
      EsInvestigacion,
      EsExtension,
      EsPruebaEscrita,
      EsPruebaOral,
      EsAnalisisTrabajo,
      EsObservacionRegistro,
      EsRubrica,
      EsEscala,
      EsListaConsejos,
      Unidad_Desarrollada,
      EsPruebaPractica,
      ContenidoDesarrollado,
      ActividadesRetroalimentcion,
      ID_Profesor,
      ID_Materia,
      Seleccion,
      // Observacion,
      ID_Carrera,
      ID_Curso,
      unidadeId,
      Temas,
    });
    res.status(201).json(data);
    // res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el registro" });
  }
};
module.exports = {
  listar,
  listarUno,
  listarPorCI,
  crear,
};
