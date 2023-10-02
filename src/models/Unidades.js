const sequelize_db = require("../db/db");

const Unidades = sequelize_db.define("unidades", {
     Nombre_Unidad: {
         type: sequelize_db.Sequelize.STRING,
         allowNull: false,
     },
     eliminado: {
         type: sequelize_db.Sequelize.BOOLEAN,
         allowNull: false,
         defaultValue: false,
     } 
})

module.exports = Unidades