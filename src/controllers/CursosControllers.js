const Cursos = require("../models/Cursos");
const listar =  async (req, res) => {
    try {
      const cursos = await Cursos.findAll({
        attributes: ["id", "Nombre_Curso"],
        where: {
          eliminado: false, // Solo seleccionar carreras no eliminadas
        },
      });
      res.json(cursos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al listar los cursos" });
    }
  }
const listarUno = async (req, res) => {
    const { id } = req.params;
    try {
      const curso = await Cursos.findByPk(id, {
        attributes: ["id", "Nombre_Curso"],
        where: {
          eliminado: false, // Solo seleccionar carreras no eliminadas
        },
      });
      if (!curso) {
        return res.status(404).json({ message: "Curso no encontrado" });
      }
      res.json(curso);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al listar el curso" });
    }
  }
const crear = async (req, res) => {
    const { Nombre_Curso } = req.body;
  
    // Validación de datos
    if (!Nombre_Curso) {
      return res.status(400).json({
        message:
          "Faltan datos obligatorios. Asegúrese de proporcionar Nombre_Curso.",
      });
    }
  
    try {
      // Crear el curso
      const curso = await Cursos.create({
        Nombre_Curso: Nombre_Curso,
      });
  
      res.status(201).json({
        message: "Curso creado exitosamente",
        curso,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "Hubo un error al crear el curso. Por favor, inténtelo de nuevo más tarde.",
      });
    }
  }
const editar =  async (req, res) => {
    const { id } = req.params;
    const { Nombre_Curso } = req.body;
  
    try {
      const curso = await Cursos.findByPk(id);
      if (!curso) {
        return res.status(404).json({ message: "Curso no encontrado" });
      }
  
      // Actualizar el curso
      curso.Nombre_Curso = Nombre_Curso;
      await curso.save();
  
      res.json({ message: "Curso actualizado exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el curso" });
    }
  }
const eliminar = async (req, res) => {
    const { id } = req.params;
    try {
      const curso = await Cursos.findByPk(id);
      if (!curso) {
        return res.status(404).json({ message: "Curso no encontrado" });
      }
  
      // Marcar el curso como eliminado
      curso.eliminado = true;
      await curso.save();
  
      res.json({ message: "Curso eliminado exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el curso" });
    }
  }

module.exports = {
    listar,
    listarUno,
    crear,
    editar,
    eliminar
}