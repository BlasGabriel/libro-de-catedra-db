const Profesores = require("../models/Profesores");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs"); // Importa la librería bcryptjs

const pathJson = path.join(__dirname, "../db/data.json");

const LeerData = async (req, res) => {
  const { password } = req.body;
  console.log(password);

  try {
    const data = JSON.parse(fs.readFileSync(pathJson));

    // Compara la contraseña ingresada por el usuario con el hash almacenado
    const match = await bcrypt.compare(password, data.password);

    if (match) {
      // La contraseña es válida
      res.json({
        message: "Contraseña válida. Acceso permitido.",
        acceso: true,
      });
    } else {
      // La contraseña no coincide
      res
        .status(401)
        .json({
          message: "Contraseña incorrecta. Acceso denegado.",
          acceso: false,
        });
    }

    // res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al validar la contraseña.", acceso: false });
  }
};
const EditarData = async (req, res) => {
  const { password } = req.body;

  try {
    const data = JSON.parse(fs.readFileSync(pathJson));

    // Genera un hash de la contraseña antes de almacenarla
    const saltRounds = 1; // Número de rondas de sal para el hash
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    data.password = hashedPassword; // Almacena el hash en lugar de la contraseña en texto plano

    // Una vez que hayas editado los datos, escríbelos de nuevo en el archivo JSON
    fs.writeFileSync(pathJson, JSON.stringify(data));

    // Responde con los datos editados

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al Editar" });
  }
};
const listar = async (req, res) => {
  try {
    const profesores = await Profesores.findAll({
      attributes: ["id", "ci", "nombre", "apellido"],
      where: {
        eliminado: false, // Solo seleccionar profesores no eliminados
      },
    });
    res.json(profesores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar los profesores" });
  }
};

const listarUno = async (req, res) => {
  const { id } = req.params;
  try {
    const profesor = await Profesores.findByPk(id, {
      attributes: ["id", "ci", "nombre", "apellido"],
      where: {
        eliminado: false, // Solo seleccionar profesores no eliminados
      },
    });
    if (!profesor) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }
    res.json(profesor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar el profesor" });
  }
};

const listarPorCI = async (req, res) => {
  const { ci } = req.params;

  try {
    const profesor = await Profesores.findOne({
      attributes: ["id", "ci", "nombre", "apellido"],
      where: {
        ci, // Buscar por número de cédula
        eliminado: false, // Solo seleccionar profesores no eliminados
      },
    });
    if (!profesor) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }
    res.json(profesor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar el profesor" });
  }
};

const crear = async (req, res) => {
  const { ci, nombre, apellido } = req.body;

  // Validación de datos
  if (!ci || !nombre || !apellido) {
    return res.status(400).json({
      message:
        "Faltan datos obligatorios. Asegúrese de proporcionar ci, nombre y apellido.",
    });
  }

  try {
    // Crear el profesor
    const profesor = await Profesores.create({
      ci,
      nombre,
      apellido,
    });

    res.status(201).json({
      message: "Profesor creado exitosamente",
      profesor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Hubo un error al crear el profesor. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};
const editar = async (req, res) => {
  const { id } = req.params;
  const { ci, nombre, apellido } = req.body;

  try {
    const profesor = await Profesores.findByPk(id);
    if (!profesor) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }

    // Actualizar la información del profesor
    profesor.ci = ci;
    profesor.nombre = nombre;
    profesor.apellido = apellido;
    await profesor.save();

    res.json({ message: "Profesor actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el profesor" });
  }
};
const eliminar = async (req, res) => {
  const { id } = req.params;

  try {
    const profesor = await Profesores.findByPk(id);
    if (!profesor) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }

    // Marcar al profesor como eliminado
    profesor.eliminado = true;
    await profesor.save();

    res.json({ message: "Profesor eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al  eliminar" });
  }
};

module.exports = {
  listar,
  listarUno,
  EditarData,
  LeerData,
  crear,
  editar,
  eliminar,
  listarPorCI,
};
