var path = require('path');

// Cargar ORM sequelize
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
                      // storage: nombre del archivo con la DB en sqlite
                      {dialect: "sqlite", storage: "quiz.sqlite"}
                    );

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exportar la definición de la tabla Quiz

// crear e inicializar la tabla Quiz en DB
sequelize.sync().success(function () {
  // success es un callback que se ejecuta al crear la tabla
  Quiz.count().success(function (count) {
    if (count === 0){
      // si la tabla esta vacia la iniciliza
      Quiz.create(
        {
          pregunta: "Capital de Italia", respuesta: "Roma"
        }).success(function () { console.log("Base de datos inicializada") });
    }
  });
});
