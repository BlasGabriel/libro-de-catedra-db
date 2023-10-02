const sequelize_db = require("../db/db");

const Carreras = sequelize_db.define("carreras", {
  Nombre_Carrera: {
    type: sequelize_db.Sequelize.STRING,
    allowNull: false,
  },
  eliminado: {
    type: sequelize_db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Carreras;
