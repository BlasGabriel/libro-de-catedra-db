const sequelize_db = require("../db/db");
// const RegistroSalida = require("./RegistroSalida");

const Profesores = sequelize_db.define("profesores", {
  ci: {
    type: sequelize_db.Sequelize.STRING,
    allowNull: false,
  },
  nombre: {
    type: sequelize_db.Sequelize.STRING,
    allowNull: false,
  },
  apellido: {
    type: sequelize_db.Sequelize.STRING,
    allowNull: false,
  },
  eliminado: {
    type: sequelize_db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// RegistroSalida.belongsToMany(Productos, {
//   through: 'VentasProductos',
//   foreignKey: 'productoId',
//   otherKey: 'ventaId',
//   where: { eliminado: false }
// });

module.exports = Profesores;
