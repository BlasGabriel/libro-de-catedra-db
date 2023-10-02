const { Sequelize } = require("sequelize");
const sequelize_db = new Sequelize("libro_de_catedra_db", "root", "mysql", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-04:00", // Configura la zona horaria para Paraguay
});

module.exports = sequelize_db;
