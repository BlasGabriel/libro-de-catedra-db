// --------------------------------------------------

const Profesores = require("./Profesores");
const RegistroSalida = require("./RegistroSalida");
const Materias = require("./Materias");
const Carreras = require("./Carreras");
const Cursos = require("./Cursos");
const Unidades = require("./Unidades");
const Temas = require("./Temas");
const RegistroEntrada = require("./RegistroEntrada");
const RegistroProceso = require("./RegistroProceso");
const RegistroProcesoAnual = require("./RegistroProcesoAnual");
// const SeleccionesTemas = require("./SeleccionesTemas");
// const SeleccionesUnidades = require("./SeleccionesUnidades");

// --------------------------------------------------
//Todas la asociacion entre las tablas
// RegistroProcesoAnual-->Profesores

RegistroProcesoAnual.belongsTo(Profesores, {
  foreignKey: "ID_Profesor",
  allowNull: true,
});
Profesores.hasOne(RegistroProcesoAnual, {
  foreignKey: "ID_Profesor",
  allowNull: true,
});
// RegistroProceso-->Profesores

RegistroProceso.belongsTo(Profesores, {
  foreignKey: "ID_Profesor",
  allowNull: true,
});
Profesores.hasOne(RegistroProceso, {
  foreignKey: "ID_Profesor",
  allowNull: true,
});
// // RegistroProceso-->Profesores

// RegistroProceso.belongsTo(Profesores, {
//   foreignKey: "ID_Profesor_Verificador",
//   allowNull: true,
// });
// Profesores.hasOne(RegistroProceso, {
//   foreignKey: "ID_Profesor_Verificador",
//   allowNull: true,
// });

// RegistroProceso-->Carreras
RegistroProceso.belongsTo(Carreras, {
  foreignKey: "ID_Carrera",
  allowNull: true,
});           
Carreras.hasOne(RegistroProceso, { foreignKey: "ID_Carrera", allowNull: true });
// RegistroProceso-->Cursos
RegistroProceso.belongsTo(Cursos, { foreignKey: "ID_Curso", allowNull: true });
Cursos.hasOne(RegistroProceso, { foreignKey: "ID_Curso", allowNull: true });
// RegistroProceso-->Materias
RegistroProceso.belongsTo(Materias, {
  foreignKey: "ID_Materia",
  allowNull: true,
});
Materias.hasOne(RegistroProceso, { foreignKey: "ID_Materia", allowNull: true });

//muchos a muchos
RegistroProceso.belongsToMany(Unidades, {
  through: "SeleccionesUnidades",
});
Unidades.belongsToMany(RegistroProceso, {
  through: "SeleccionesUnidades",
});

// RegistroSalida-->Profesores

// RegistroSalida.belongsTo(Profesores, { foreignKey: "ID_Profesor" });
// Profesores.hasOne(RegistroSalida, { foreignKey: "ID_Profesor" });

// Materias-->Carreras
Materias.belongsTo(Carreras, { foreignKey: "ID_Carrera" });
Carreras.hasOne(Materias, { foreignKey: "ID_Carrera" });
// Materias-->Cursos
Materias.belongsTo(Cursos, { foreignKey: "ID_Curso" });
Cursos.hasOne(Materias, { foreignKey: "ID_Curso" });

// Unidades-->Materias
Unidades.belongsTo(Materias, { foreignKey: "ID_Materia" });
Materias.hasOne(Unidades, { foreignKey: "ID_Materia" });

// Temas-->Unidades
// Temas.belongsTo(Unidades, { foreignKey: "ID_Unidad" });
// Unidades.hasOne(Temas, { foreignKey: "ID_Unidad" });

// RegistroEntrada-->Carreras
// RegistroEntrada.belongsTo(Carreras, { foreignKey: "ID_Carrera" });
// Carreras.hasOne(RegistroEntrada, { foreignKey: "ID_Carrera" });
// // RegistroEntrada-->Cursos
// RegistroEntrada.belongsTo(Cursos, { foreignKey: "ID_Curso" });
// Cursos.hasOne(RegistroEntrada, { foreignKey: "ID_Curso" });
// // RegistroEntrada-->Materias
// RegistroEntrada.belongsTo(Materias, { foreignKey: "ID_Materia" });
// Materias.hasOne(RegistroEntrada, { foreignKey: "ID_Materia" });
// // RegistroEntrada-->Profesores
// RegistroEntrada.belongsTo(Profesores, { foreignKey: "ID_Profesor" });
// Profesores.hasOne(RegistroEntrada, { foreignKey: "ID_Profesor" });

// //muchos a muchos
// RegistroEntrada.belongsToMany(Unidades, {
//   through: "SeleccionesUnidades",
// });
// Unidades.belongsToMany(RegistroEntrada, {
//   through: "SeleccionesUnidades",
// })
// //muchos a muchos
// RegistroEntrada.belongsToMany(Temas, {
//   through: "SeleccionesTemas",
// })
// Temas.belongsToMany(RegistroEntrada, {
//   through: "SeleccionesTemas",
// })
module.exports = {
  Profesores,
  RegistroSalida,
  Materias,
  Carreras,
  Cursos,
  Unidades,
  Temas,
  RegistroEntrada,
  RegistroProceso,
  RegistroProcesoAnual,
};
