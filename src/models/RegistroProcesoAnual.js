const sequelize_db = require("../db/db");

const RegistroProcesoAnual = sequelize_db.define("procesos_anuales", {
    NEstudiantesMatriculados: {
        type: sequelize_db.Sequelize.INTEGER,
        allowNull: false,
    },
    NEstudiantesHabilitados: {
        type: sequelize_db.Sequelize.INTEGER,
        allowNull: false,
    },
    ClasesTeoricasProgramadas: {
        type: sequelize_db.Sequelize.INTEGER,
        allowNull: false,
    },
    ClasesTeoricasDesarrolladas: {
        type: sequelize_db.Sequelize.INTEGER,
        allowNull: false,
    },
    ClasesPracticasProgramadas: {
        type: sequelize_db.Sequelize.INTEGER,
        allowNull: false,
    },
    ClasesPracticasDesarrolladas: {
        type: sequelize_db.Sequelize.INTEGER,
        allowNull: false,
    },
    RetroalimentacionProgramadas: {
        type: sequelize_db.Sequelize.INTEGER,
        allowNull: true,
    },
    RetroalimentacionDesarrolladas: {
        type: sequelize_db.Sequelize.INTEGER,
        allowNull: true,
    },
    CanttidadAprobados1Parcial: {
        type: sequelize_db.Sequelize.INTEGER,
        allowNull: true,
    },
    CanttidadAprobados2Parcial: {
        type: sequelize_db.Sequelize.INTEGER,
        allowNull: true,
    },
    Parcial1Aciones: {
       type: sequelize_db.Sequelize.STRING, 
    },
    Parcial2Aciones: {
       type: sequelize_db.Sequelize.STRING, 
    },
    Anio: {
        type: sequelize_db.Sequelize.INTEGER,
        allowNull: false,
    },
    eliminado: {
        type: sequelize_db.Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
})

module.exports = RegistroProcesoAnual