const RegistroProcesoAnual = require("../models/RegistroProcesoAnual");
const Profesores = require("../models/Profesores");

const listar = async (req, res) => {
  try {
    const registros = await RegistroProcesoAnual.findAll({
      where: {
        eliminado: false,
      },
      include: [
        {
          model: Profesores,
          attributes: ["id", "ci", "nombre", "apellido"],
        },
      ],
    });
    res.json(registros );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al leer los registros" });
  }
};

const listarUno = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await RegistroProcesoAnual.findByPk(id, {
      where: {
        eliminado: false,
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

const crear = async (req, res) => {
  const {
    ID_Profesor,
    NEstudiantesMatriculados,
    NEstudiantesHabilitados,
    ClasesTeoricasProgramadas,
    ClasesTeoricasDesarrolladas,
    ClasesPracticasProgramadas,
    ClasesPracticasDesarrolladas,
    RetroalimentacionProgramadas,
    RetroalimentacionDesarrolladas,
    CanttidadAprobados1Parcial,
    CanttidadAprobados2Parcial,
    Parcial1Aciones,
    Parcial2Aciones,
    Anio,
  } = req.body;
  try {
    const registro = await RegistroProcesoAnual.create({
      ID_Profesor,
      NEstudiantesMatriculados,
      NEstudiantesHabilitados,
      ClasesTeoricasProgramadas,
      ClasesTeoricasDesarrolladas,
      ClasesPracticasProgramadas,
      ClasesPracticasDesarrolladas,
      RetroalimentacionProgramadas,
      RetroalimentacionDesarrolladas,
      CanttidadAprobados1Parcial,
      CanttidadAprobados2Parcial,
      Parcial1Aciones,
      Parcial2Aciones,
      Anio,
    });
    res.status(201).json({ message: "Registro creado exitosamente", registro });
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  listar,
  crear,
  listarUno,
};
