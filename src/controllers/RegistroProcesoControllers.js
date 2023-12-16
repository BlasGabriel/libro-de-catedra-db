const RegistroProceso = require("../models/RegistroProceso");
const Profesores = require("../models/Profesores");

const listar = async (req, res) => {
  try {
    const data = await RegistroProceso.findAll({
      where: {
        eliminado: false, // Solo seleccionar registros no eliminados
      },
      include: [
        {
          model: Profesores,
          attributes: ["id", "ci", "nombre", "apellido"],
        }
      ]
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
  const { CI } = req.params;
  try {
    const data = await RegistroProceso.findAll({
      where: {
        CI,
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
    FechaControl,
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
  } = req.body;

  try {
    const data = await RegistroProceso.create({
      ClaseNumero,
      fecha,
      SegundoControl,
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
