const {
    listar,
    listarUno,
    listarCarreraCurso,
    crear,
    editar,
    eliminar,
  } = require("../controllers/MateriasControllers");
  const router = require("express").Router();

  router.get("/materias/listar", listar);
  router.get("/materias/listar/:id", listarUno);
  router.get("/materias/listarCarreraCurso/:idCarrera/:idCurso", listarCarreraCurso);
  router.post("/materias/crear", crear);
  router.put("/materias/editar/:id", editar);
  router.patch("/materias/eliminar/:id", eliminar);

  module.exports = router;
  