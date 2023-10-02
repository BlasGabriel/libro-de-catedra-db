const router = require("express").Router();
const{
    listar,
    listarUno,
    crear
} = require("../controllers/RegistroEntradaControllers");

router.get("/registro_entrada/listar/:anio/:mes", listar);
router.get("/registro_entrada/listar/:id", listarUno);
router.post("/registro_entrada/crear", crear);

// {
//     "Observacion":"d",
//     "ID_Materia":1,
//     "ID_Profesor":1,
//     "ID_Carrera":1,
//     "ID_Curso":1,
//     "unidadeId":[1,2],
//     "temaId":[1,2]
//   }
module.exports = router;
