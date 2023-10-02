const Carreras = require("../models/Carreras");

const listar = async (req, res) => {
    try {
      const carreras = await Carreras.findAll({
        attributes: ["id", "Nombre_Carrera"],
        where: {
          eliminado: false, // Solo seleccionar carreras no eliminadas
        },
      });
      res.json(carreras);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al listar las carreras" });
    }
  }
const listarUno =  async (req, res) => {
    const { id } = req.params;
    try {
      const carrera = await Carreras.findByPk(id, {
        attributes: ["id", "Nombre_Carrera"],
        where: {
          eliminado: false, // Solo seleccionar carreras no eliminadas
        },
      });
      if (!carrera) {
        return res.status(404).json({ message: "Carrera no encontrada" });
      }
      res.json(carrera);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al listar la carrera" });
    }
  }
const crear =  async (req, res) => {
    const { Nombre_Carrera } = req.body;
  
    // Validación de datos
    if (!Nombre_Carrera) {
      return res.status(400).json({
        message:
          "Faltan datos obligatorios. Asegúrese de proporcionar Nombre_Carrera.",
      });
    }
  
    try {
      // Crear la carrera
      const carrera = await Carreras.create({
        Nombre_Carrera: Nombre_Carrera,
      });
  
      res.status(201).json({
        message: "Carrera creada exitosamente",
        carrera,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "Hubo un error al crear la carrera. Por favor, inténtelo de nuevo más tarde.",
      });
    }
  }
const editar = async (req, res) => {
    const { id } = req.params;
    const { Nombre_Carrera } = req.body;
  
    try {
      const carrera = await Carreras.findByPk(id);
      if (!carrera) {
        return res.status(404).json({ message: "Carrera no encontrada" });
      }
  
      // Actualizar la carrera
      carrera.Nombre_Carrera = Nombre_Carrera;
      await carrera.save();
  
      res.json({ message: "Carrera actualizada exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar la carrera" });
    }
  }
const eliminar =  async (req, res) => {
    const { id } = req.params;
    try {
      const carrera = await Carreras.findByPk(id);
      if (!carrera) {
        return res.status(404).json({ message: "Carrera no encontrada" });
      }
  
      // Marcar la carrera como eliminada
      carrera.eliminado = true;
      await carrera.save();
  
      res.json({ message: "Carrera eliminada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar la carrera" });
    }
  }

module.exports = {
    listar,
    listarUno,
    crear,
    editar,
    eliminar
}