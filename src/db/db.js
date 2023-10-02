const { Sequelize } = require("sequelize");
const sequelize_db = new Sequelize("railway", "root", "Lz4OO1FdQoi3LaDLds4h", {
// const sequelize_db = new Sequelize("libro_de_catedra_db", "root", "mysql", {
  // host: "localhost",
  host: "containers-us-west-56.railway.app",
  dialect: "mysql",
  // port: "5482",
  timezone: "-04:00", // Configura la zona horaria para Paraguay
});

module.exports = sequelize_db;
