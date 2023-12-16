const router = require("express").Router();
const {
    crear,
    listar,
  listarUno,
  listarPorCI,
  
}= require("../controllers/RegistroProcesoControllers");

router.get("/registro_proceso/listar", listar);
router.get("/registro_proceso/listar/:id", listarUno);
router.get("/registro_proceso/listarPorCI/:ci", listarPorCI);
router.post("/registro_proceso/crear", crear);
module.exports = router