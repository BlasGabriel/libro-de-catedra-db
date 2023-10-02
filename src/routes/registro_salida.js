const {
  listar,
  listarUno,
  crear,
  editar,
  eliminar,
} = require("../controllers/RegistroSalidaControllers");
const router = require("express").Router();

router.get("/registro_salida/listar/:anio/:mes", listar);
router.get("/registro_salida/listar/:id", listarUno);
router.post("/registro_salida/crear", crear);
router.put("/registro_salida/editar/:id", editar);
router.patch("/registro_salida/eliminar/:id", eliminar);

module.exports = router;
