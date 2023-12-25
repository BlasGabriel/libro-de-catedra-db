const router = require("express").Router();
const {
  crear,
  listar,
  listarUno,
  listarPorCI,
  editar
} = require("../controllers/RegistroProcesoControllers");

router.get("/registro_proceso/listar", listar);
router.get("/registro_proceso/listar/:id", listarUno);
router.get("/registro_proceso/listarPorCI/:ID_Profesor", listarPorCI);
router.post("/registro_proceso/crear", crear);
router.put("/registro_proceso/editar/:id", editar);
module.exports = router;
