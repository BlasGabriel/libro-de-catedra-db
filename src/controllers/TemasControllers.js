const Unidades = require("../models/Unidades");
const Temas = require("../models/Temas");
const Materias = require("../models/Materias");
const Carreras = require("../models/Carreras");
const Cursos = require("../models/Cursos");

const listar = async (req, res) => {
  try {
    const temas = await Temas.findAll({
      attributes: ["id", "Nombre_Tema"],
      where: {
        eliminado: false, // Solo seleccionar carreras no eliminadas
      },
      include: {
        model: Unidades,
        attributes: ["id", "Nombre_Unidad"],
        include: [
          {
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
          }
        ]
      },
      
    });
    res.json(temas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar los temas" });
  }
};
// const listar = async (req, res) => {
//   try {
//     const temas = await Temas.findAll({
//       attributes: ["id", "Nombre_Tema"],
//       where: {
//         eliminado: false, // Solo seleccionar carreras no eliminadas
//       },
//       include: {
//         model: Unidades,
//         attributes: ["id", "Nombre_Unidad"],
        
          
        
//       },
//       group: ["ID_Unidad", ],
      
//     });
//     res.json(temas);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al listar los temas" });
//   }
// };


const listarUnidad = async (req, res) => {
  // Obtener los parámetros de la petición
  const idUnidad = req.params.idUnidad;

  try {
    const temas = await Temas.findAll({
      attributes: ["id", "Nombre_Tema", ],
      where: {
        eliminado: false, // Solo seleccionar carreras no eliminadas
        ID_Unidad: idUnidad,
      },
      include: {
        model: Unidades,
        attributes: ["id", "Nombre_Unidad"],
        include: [
          {
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
          }
        ]
      },
    });

    // Devolver las temas
    res.json(temas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar los temas" });
  }
};


const listarUno = async (req, res) => {
  const { id } = req.params;
  try {
    const tema = await Temas.findByPk(id, {
      attributes: ["id", "Nombre_Tema"],
      where: {
        eliminado: false, // Solo seleccionar carreras no eliminadas
      },
      include: {
        model: Unidades,
        attributes: ["id", "Nombre_Unidad"],
        include: [
          {
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
          }
        ]
      },
      
    });
    if (!tema) {
      return res.status(404).json({ message: "Tema no encontrado" });
    }
    res.json(tema);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar el tema" });
  }
};

const crear = async (req, res) => {
  const { Nombre_Tema, ID_Unidad } = req.body;

  // Validación de datos
  if (!Nombre_Tema || !ID_Unidad) {
    return res.status(400).json({
      message:
        "Faltan datos obligatorios. Asegúrese de proporcionar Nombre_Tema y ID_Unidad.",
    });
  }
  try {
    const tema = await Temas.create({
      Nombre_Tema,
      ID_Unidad,
    });
    res.status(201).json({ message: "Tema creado exitosamente", tema });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el tema" });
  }
};

const editar = async (req, res) => {
  const { id } = req.params;
  const { Nombre_Tema, ID_Unidad } = req.body;

  try {
    const tema = await Temas.findByPk(id);
    if (!tema) {
      return res.status(404).json({ message: "Tema no encontrado" });
    }

    // Actualizar el tema
    tema.Nombre_Tema = Nombre_Tema;
    tema.ID_Unidad = ID_Unidad;
    await tema.save();

    res.json({ message: "Tema actualizado exitosamente", tema });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el tema" });
  }
};

const eliminar = async (req, res) => {
  const { id } = req.params;
  try {
    const tema = await Temas.findByPk(id);
    if (!tema) {
      return res.status(404).json({ message: "Tema no encontrado" });
    }

    // Marcar el tema como eliminado
    tema.eliminado = true;
    await tema.save();

    res.json({ message: "Tema eliminado exitosamente", tema });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el tema" });
  }
};
module.exports = {
  listar,
  listarUno,
  crear,
  editar,
  eliminar,
  listarUnidad
};
