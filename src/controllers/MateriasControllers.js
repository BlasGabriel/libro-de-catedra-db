const Materias = require("../models/Materias");
const Carreras = require("../models/Carreras");
const Cursos = require("../models/Cursos");

const listar = async (req, res) => {
  try {
    const materias = await Materias.findAll({
      attributes: ["id", "Nombre_Materia"],
      where: {
        eliminado: false, // Solo seleccionar carreras no eliminadas
      },
      include: [
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
    res.json(materias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar las materias" });
  }
};

const listarCarreraCurso = async (req, res) => {
  // Obtener los parámetros de la petición
  const idCarrera = req.params.idCarrera;
  const idCurso = req.params.idCurso;

  try {
    // Filtrar las materias por ID_Carrera y ID_Curso
    const materias = await Materias.findAll({
      attributes: ["id", "Nombre_Materia"],
      where: {
        eliminado: false, // Solo seleccionar carreras no eliminadas
        ID_Carrera: idCarrera,
        ID_Curso: idCurso,
      },
      include: [
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

    // Devolver las materias
    res.json(materias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar las materias" });
  }
};


const listarUno = async (req, res) => {
  const { id } = req.params;
  try {
    const materia = await Materias.findByPk(id, {
      attributes: ["id", "Nombre_Materia", "ID_Carrera", "ID_Curso"],
      where: {
        eliminado: false, // Solo seleccionar carreras no eliminadas
      },
    });
    if (!materia) {
      return res.status(404).json({ message: "Materia no encontrada" });
    }
    res.json(materia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar la materia" });
  }
};

const crear = async (req, res) => {
  const { Nombre_Materia, ID_Carrera, ID_Curso } = req.body;

  // Validación de datos
  if (!Nombre_Materia || !ID_Carrera || !ID_Curso) {
    return res.status(400).json({
      message:
        "Faltan datos obligatorios. Asegúrese de proporcionar Nombre_Materia, ID_Carrera y ID_Curso.",
    });
  }
  try {
    // Crear la Materia
    const materia = await Materias.create({
      Nombre_Materia,
      ID_Carrera,
      ID_Curso,
    });
    res.status(201).json({ message: "Materia creada exitosamente", materia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la materia" });
  }
};

const editar = async (req, res) => {
  const { id } = req.params;
  const { Nombre_Materia, ID_Carrera, ID_Curso } = req.body;

  try {
    const materia = await Materias.findByPk(id);
    if (!materia) {
      return res.status(404).json({ message: "Materia no encontrada" });
    }

    // Actualizar la materia
    materia.Nombre_Materia = Nombre_Materia;
    materia.ID_Carrera = ID_Carrera;
    materia.ID_Curso = ID_Curso;
    await materia.save();

    res.json({ message: "Materia actualizada exitosamente", materia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la materia" });
  }
};

const eliminar = async (req, res) => {
  const { id } = req.params;
  try {
    const materia = await Materias.findByPk(id);
    if (!materia) {
      return res.status(404).json({ message: "Materia no encontrada" });
    }

    // Marcar la materia como eliminada
    materia.eliminado = true;
    await materia.save();

    res.json({ message: "Materia eliminada exitosamente", materia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la materia" });
  }
};
module.exports = {
  listar,
  listarUno,
  listarCarreraCurso,
  crear,
  editar,
  eliminar,
};
