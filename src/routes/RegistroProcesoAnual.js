const router = require("express").Router();
const {
    crear,
    listar,
    listarUno,
    // listarPorCI,
  } = require("../controllers/RegistroProcesoAnualControllers");
  
router.get("/registro_proceso_anual/listar", listar);
router.get("/registro_proceso_anual/listar/:id", listarUno);
// router.get("/registro_proceso/listarPorCI/:ci", listarPorCI);
router.post("/registro_proceso_anual/crear", crear);
module.exports = router;