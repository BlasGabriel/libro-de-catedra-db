const sequelize_db = require("../db/db");

const Cursos = sequelize_db.define("cursos", {
  Nombre_Curso: {
    type: sequelize_db.Sequelize.STRING,
    allowNull: false,
  },
  eliminado: {
    type: sequelize_db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Cursos;