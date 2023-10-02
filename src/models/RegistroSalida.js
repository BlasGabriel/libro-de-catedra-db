const sequelize_db = require("../db/db");


const RegistroSalida = sequelize_db.define("registro_salida", {

  FechaHoraSalida: {
    type: sequelize_db.Sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize_db.Sequelize.literal('CURRENT_TIMESTAMP'), // Inserta automáticamente la fecha y hora actual
  },
  anio: {
    type: sequelize_db.Sequelize.INTEGER,
    allowNull: false,
    // defaultValue: sequelize_db.Sequelize.literal('extract(year from current_date)'),
    defaultValue: new Date().getFullYear(), // Obtener el año actual
  },
  mes: {
    type: sequelize_db.Sequelize.INTEGER,
    allowNull: false,
    // defaultValue: sequelize_db.Sequelize.literal('extract(month from current_date)'),
    defaultValue: new Date().getMonth() + 1, // Obtener el mes actual (agregar 1 porque los meses en JavaScript son 0-indexados)

  },
  Observacion: {
    type: sequelize_db.Sequelize.STRING, 
    allowNull: true, // No es obligatorio, por lo que puede ser nulo
  },
  eliminado: {
    type: sequelize_db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = RegistroSalida;
