const { Sequelize } = require("sequelize");
// const sequelize_db = new Sequelize("railway", "root", "Q2vAe4tqZ1Dchtbiojf1", {
const sequelize_db = new Sequelize("libro_de_catedra_db", "root", "mysql", {
  host: "localhost",
  // host: "containers-us-west-74.railway.app",
  dialect: "mysql",
  port: "3306",
  // port: "8080",
  // http://192.168.1.106/ 
  timezone: "-04:00", // Configura la zona horaria para Paraguay
});

module.exports = sequelize_db;
