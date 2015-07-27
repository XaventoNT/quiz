var path = require('path');

// Postgres DATABASE_URL = postgres://user:password@host:port/DATABASE_URL
// SQLite   DATABASE_URL = sqlite://:@:/

// devuelve un array con los parametros de la URL
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/ );
var DB_name   = (url[6] || null);
var user      = (url[2] || null);
var pwd       = (url[3] || null);
var protocol  = (url[1] || null);
var dialect   = (url[1] || null);
var port      = (url[5] || null);
var host      = (url[4] || null);
var storage   = process.env.DATABASE_STORAGE;

// Cargar ORM sequelize
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(DB_name, user, pwd,
                      {
                        dialect:  dialect,
                        protocol: protocol,
                        port:     port,
                        host:     host,
                        storage:  storage,  // solo SQLite (.env)
                        omitNull: true      // solo Postgres
                      }
                    );

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exportar la definición de la tabla Quiz

// crear e inicializar la tabla Quiz en DB
sequelize.sync().then(function () {
  // then() ejecuta un manejador una vez creada la tabla
  Quiz.count().then(function (count) {
    if (count === 0){
      // si la tabla esta vacia la iniciliza
      Quiz.create(
        {
          pregunta: "Capital de Italia", respuesta: "Roma"
        }
      );
      Quiz.create(
        {
          pregunta: "Capital de Portugal", respuesta: "Lisboa"
        }
      ).then(function () { console.log("Base de datos inicializada") });
    }
  });
});
