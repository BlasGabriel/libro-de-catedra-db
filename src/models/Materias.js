const sequelize_db = require("../db/db");

const Materias = sequelize_db.define("materias", {
    Nombre_Materia: {
        type: sequelize_db.Sequelize.STRING,
        allowNull: false,
    },
    eliminado: {
        type: sequelize_db.Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
})

module.exports = Materias;