const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const sequelize_db = require("./db/db");
const associations = require("./models/Associations");
// const profesores = require("./routes/profesores");
const carreras = require("./routes/carreras");
const registro_salida = require("./routes/registro_salida");
const cursos = require("./routes/cursos");
const unidades = require("./routes/unidades");
const materias = require("./routes/materias");
const temas = require("./routes/temas");
const registro_entrada = require("./routes/registro_entrada");
var router  = express.Router();




(async () => {
  try {
    await sequelize_db.authenticate();
    await sequelize_db.sync();
    console.log("Connection has been established successfully.✅");
  } catch (error) {
    console.log("Error connecting to the database:❌", error);
    // throw new Error("Error connecting to the database:❌", error);
  }
})();

app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: '*',
}));

router.get('/', function(req, res) {
	res.send('Welcome to my first API REST deployed with Google cloud Platform!');
});

const profesores = require('./routes/profesores');
app.use('/', profesores);
// app.use(profesores);
app.use(carreras);
app.use(cursos);
app.use(registro_salida);
app.use(unidades);
app.use(materias);
app.use(temas);
app.use(registro_entrada);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
