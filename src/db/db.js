const { Sequelize } = require("sequelize");
const sequelize_db = new Sequelize("railway", "postgres", "ioZMjqCNaP6D168eBtaa", {
// const sequelize_db = new Sequelize("libro_de_catedra_db", "root", "mysql", {
  // host: "localhost",
  host: "containers-us-west-105.railway.app",
  // dialect: "mysql",
  dialect: "postgres",
  port: "7750",
  timezone: "-04:00", // Configura la zona horaria para Paraguay
});

module.exports = sequelize_db;
