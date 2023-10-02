const {
  listar,
  listarUno,
  crear,
  editar,
  eliminar,
} = require("../controllers/CarrerasControllers");
const router = require("express").Router();

router.get("/carreras/listar", listar);

router.get("/carreras/listar/:id", listarUno);

router.post("/carreras/crear", crear);

router.put("/carreras/editar/:id", editar);

router.patch("/carreras/eliminar/:id", eliminar);

module.exports = router;