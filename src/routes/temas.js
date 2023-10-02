const {
    listar,
    listarUno,
    crear,
    editar,
    eliminar,
    listarUnidad
  } = require("../controllers/TemasControllers");
  const router = require("express").Router();
  
  router.get("/temas/listar", listar);
  router.get("/temas/listar/:id", listarUno);
  router.get("/temas/listarUnidad/:idUnidad", listarUnidad);
  router.post("/temas/crear", crear);
  router.put("/temas/editar/:id", editar);
  router.patch("/temas/eliminar/:id", eliminar);

  module.exports = router;