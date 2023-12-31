const sequelize_db = require("../db/db");

const RegistroProceso = sequelize_db.define("registro_proceso", {
  ClaseNumero: {
    type: sequelize_db.Sequelize.STRING,
    // allowNull: false,
  },
  fecha: {
    type: sequelize_db.Sequelize.DATEONLY, // allowNull: false,
    // defaultValue: sequelize_db.Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  anio: {
    type: sequelize_db.Sequelize.INTEGER,
    allowNull: false,
    // defaultValue: sequelize_db.Sequelize.literal('extract(year from current_date)'),
    defaultValue: new Date().getFullYear(), // Obtener el año actual
  },
  mes: {
    type: sequelize_db.Sequelize.INTEGER,
    allowNull: false,
    // defaultValue: sequelize_db.Sequelize.literal('extract(month from current_date)'),
    defaultValue: new Date().getMonth() + 1, // Obtener el mes actual (agregar 1 porque los meses en JavaScript son 0-indexados)

  }, 
  Temas: {
    type: sequelize_db.Sequelize.STRING,
  },
  FechaControl: {
    type: sequelize_db.Sequelize.DATE,
    // allowNull: false,
    // defaultValue: sequelize_db.Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  HoraEntrada: {
    type: sequelize_db.Sequelize.TIME,
    // allowNull: false,
    // defaultValue: sequelize_db.Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  HoraSalida: {
    type: sequelize_db.Sequelize.TIME,
    // allowNull: false,
    // defaultValue: sequelize_db.Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  Observacion: {
    type: sequelize_db.Sequelize.STRING, 
    // allowNull: true, // No es obligatorio, por lo que puede ser nulo
  },
  Seleccion: {
    type: sequelize_db.Sequelize.STRING, 
    // allowNull: true, // No es obligatorio, por lo que puede ser nulo
  },
  HorasPracticas: {
    type: sequelize_db.Sequelize.STRING,
    // allowNull: false,
    // defaultValue: sequelize_db.Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  HoraClase: {
    type: sequelize_db.Sequelize.STRING,
    // allowNull: false,
  },
  EsGrupal: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsResolucion: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsAuxiliar: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsestudioCaso: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsSeminario: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsDemostacion: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsExpositiva: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsVideoTutorial: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsAprendizajeProblema: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsAprendizajeProyecto: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsTaller: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsInvestigacion: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsExtension: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsPruebaEscrita: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsPruebaOral: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsAnalisisTrabajo: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsObservacionRegistro: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsRubrica: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsEscala: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  EsListaConsejos: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  eliminado: {
    type: sequelize_db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  // Unidad_Desarrollada: {
  //   type: sequelize_db.Sequelize.STRING,
  //   // allowNull: false,
  // },
  EsPruebaPractica: {
    type: sequelize_db.Sequelize.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  },
  ContenidoDesarrollado: {
    type: sequelize_db.Sequelize.STRING,
  },
  ActividadesRetroalimentcion: {
    type: sequelize_db.Sequelize.STRING,
  },
});

module.exports = RegistroProceso;
