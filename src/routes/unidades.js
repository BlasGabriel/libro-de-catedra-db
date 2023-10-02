const {
    listar,
    listarUno,
    crear,
    editar,
    eliminar,
    listarPorMateria,
    unidadesConTemas
  } = require("../controllers/UnidadesControllers");
  const router = require("express").Router();

  router.get("/unidades/listar",     listar,
  );
  router.get("/unidades/listar/:id", listarUno);
  router.get("/unidades/listarPorMateria/:idMateria", listarPorMateria);
  router.post("/unidades/crear", crear);
  router.put("/unidades/editar/:id", editar);
  router.patch("/unidades/eliminar/:id", eliminar);

  module.exports = router;