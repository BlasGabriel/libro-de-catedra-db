const router = require("express").Router();
const {
  listar,
  listarUno,
  crear,
  editar,
  eliminar,
  listarPorCI,
  LeerData,
  EditarData
} = require("../controllers/ProfesoresControllers");

router.get("/profesores/listar", listar);
router.put("/data/EditarData", EditarData);
router.put("/data/LeerData", LeerData);
router.get("/profesores/listar/:id", listarUno);
router.get("/profesores/listarPorCI/:ci", listarPorCI);

router.post("/profesores/crear", crear);

router.put("/profesores/editar/:id", editar);

router.patch("/profesores/eliminar/:id", eliminar);

module.exports = router;
