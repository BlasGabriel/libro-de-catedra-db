const sequelize_db = require("../db/db");


const RegistroEntrada = sequelize_db.define("registro_entrada", {

  FechaHoraEntrada: {
    type: sequelize_db.Sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize_db.Sequelize.literal('CURRENT_TIMESTAMP'), // Inserta automáticamente la fecha y hora actual
  },
  Observacion: {
    type: sequelize_db.Sequelize.STRING, 
    allowNull: true, // No es obligatorio, por lo que puede ser nulo
  },
  Seleccion: {
    type: sequelize_db.Sequelize.STRING, 
    allowNull: false, // No es obligatorio, por lo que puede ser nulo
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
  eliminado: {
    type: sequelize_db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = RegistroEntrada;