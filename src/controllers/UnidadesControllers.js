const Unidades = require("../models/Unidades");
const Materias = require("../models/Materias");
const Carreras = require("../models/Carreras");
const Cursos = require("../models/Cursos");
const Temas = require("../models/Temas");

const listar = async (req, res) => {
  try {
    const unidades = await Unidades.findAll({
      attributes: ["id", "Nombre_Unidad"],
      where: {
        eliminado: false, // Solo seleccionar carreras no eliminadas
      },
      include: {
        model: Materias,
        attributes: ["id", "Nombre_Materia"],
        include:[ {
          model: Carreras,
          attributes: ["id", "Nombre_Carrera"],
        },
        {
          model: Cursos,
          attributes: ["id", "Nombre_Curso"],
        },
        ],
      },
      
    });

    res.json(unidades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar las unidades" });
  }
};

const unidadesConTemas  = async (req, res) => {
  try {
    const unidades = await Unidades.findAll({
      attributes: ["id", "Nombre_Unidad"],
      include: [
        {
          model: Temas,
          attributes: ["id", "Nombre_Tema"],
          // Agregar el campo Temas a la consulta
          // para que pueda ser utilizado en el agrupamiento
          eager: true,
        },
      ],
      where: {
        eliminado: false, // Solo seleccionar carreras no eliminadas
      },
      // Agrupar los datos por el campo Nombre_Unidad
      group: ["Nombre_Unidad"],
      // Agregar el campo Temas a la agrupación
      // para que contenga la lista de temas de cada unidad
      aggregate: [
        {
          // Seleccionar el campo Nombre_Tema de cada Tema
          sql: "DISTINCT tema.Nombre_Tema",
          alias: "tema",
        },
      ],
    });
    res.json(unidades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar las unidades" });
  }
};


const listarPorMateria = async (req, res) => {
  // Obtener los parámetros de la petición
  const idMateria = req.params.idMateria;

  try {
    const unidades = await Unidades.findAll({
      attributes: ["id", "Nombre_Unidad"],
      where: {
        eliminado: false, // Solo seleccionar carreras no eliminadas
        ID_Materia: idMateria,
      },
      include: {
        model: Materias,
        attributes: ["id", "Nombre_Materia"],
        include:[ {
          model: Carreras,
          attributes: ["id", "Nombre_Carrera"],
        },
        {
          model: Cursos,
          attributes: ["id", "Nombre_Curso"],
        },
        ],
      },
      
    });

    // Devolver las unidades
    res.json(unidades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar los unidades" });
  }
};

const listarUno = async (req, res) => {
  const { id } = req.params;
  try {
    const unidad = await Unidades.findByPk(id, {
      attributes: ["id", "Nombre_Unidad", ],
      include: {
        model: Materias,
        attributes: ["id", "Nombre_Materia"],
        include:[ {
          model: Carreras,
          attributes: ["id", "Nombre_Carrera"],
        },
        {
          model: Cursos,
          attributes: ["id", "Nombre_Curso"],
        },
        ],
      },
      where: {
        eliminado: false, // Solo seleccionar carreras no eliminadas
      },
    });
    if (!unidad) {
      return res.status(404).json({ message: "Unidad no encontrada" });
    }
    res.json(unidad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar la unidad" });
  }
};

const crear = async (req, res) => {
  const { Nombre_Unidad, ID_Materia } = req.body;

  // Validación de datos
  if (!Nombre_Unidad || !ID_Materia) {
    return res.status(400).json({
      message:
        "Faltan datos obligatorios. Asegúrese de proporcionar Nombre_Unidad y ID_Materia.",
    });
  }

  try {
    // Crear la carrera
    const unidad = await Unidades.create({
      Nombre_Unidad,
      ID_Materia,
    });
    res.status(201).json({ message: "Unidad creada exitosamente", unidad });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la Unidad" });
  }
};

const editar = async (req, res) => {
  const { id } = req.params;
  const { Nombre_Unidad, ID_Materia } = req.body;

  try {
    const unidad = await Unidades.findByPk(id);
    if (!unidad) {
      return res.status(404).json({ message: "Unidad no encontrada" });
    }

    // Actualizar la Unidad
    unidad.Nombre_Unidad = Nombre_Unidad;
    unidad.ID_Materia = ID_Materia;
    await unidad.save();
    res.json({ message: "Unidad actualizada exitosamente", unidad });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la Unidad" });
  }
};

const eliminar = async (req, res) => {
  const { id } = req.params;
  try {
    const unidad = await Unidades.findByPk(id);
    if (!unidad) {
      return res.status(404).json({ message: "Unidad no encontrada" });
    }
    // Marcar la carrera como eliminada
    unidad.eliminado = true;
    await unidad.save();
    res.json({ message: "Unidad eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la Unidad" });
  }
}
module.exports = {
  listar,
  listarUno,
  crear,
  editar,
  eliminar,
  listarPorMateria,
  unidadesConTemas
};
