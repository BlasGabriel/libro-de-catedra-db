const sequelize_db = require("../db/db");

const Temas = sequelize_db.define("temas", {
    Nombre_Tema: {
        type: sequelize_db.Sequelize.STRING,
        allowNull: false,
    },
    eliminado: {
        type: sequelize_db.Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
})

module.exports = Temas