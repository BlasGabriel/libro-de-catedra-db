const {
  listar,
  listarUno,
  crear,
  editar,
  eliminar,
} = require("../controllers/CursosControllers");
const router = require("express").Router();

router.get("/cursos/listar", listar);

router.get("/cursos/listar/:id", listarUno);

router.post("/cursos/crear" , crear);

router.put("/cursos/editar/:id", editar);

router.patch("/cursos/eliminar/:id", eliminar);

module.exports = router;
