// se importa el modelo
var models = require("../models/models.js");

// Autoload - busca el quiz en la DB si la ruta incluye :quizId
// Si lo encuentra lo carga en req.quiz
exports.load = function (req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function (quiz) {
      if (quiz){
        req.quiz = quiz;
        next();
      }else{
        next( new Error('No existe quizId=' + quizId) );
      }
    }).catch( function(error){ next(error); } );
};

// GET /quizes
exports.index = function (req, res) {
  if (req.query.search){
    var search = "%" + req.query.search.replace(/ /g, '%') + "%";
    models.Quiz.findAll({where: {pregunta: {like: search} }}).then(function (quizes) {
      res.render('quizes/index', { quizes: quizes, busqueda: req.query.search });
    }).catch( function(error){ next(error); } );
  }else{
    models.Quiz.findAll().then(function (quizes) {
      res.render('quizes/index', { quizes: quizes, busqueda: '' });
    }).catch( function(error){ next(error); } );
  }
};

// GET /quizes/:id
exports.show = function (req, res) {
  res.render('quizes/show', {quiz: req.quiz});
};
// GET /quizes/:id/answer
exports.answer = function (req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

//GET /autor
exports.autor = function (req, res) {
  res.render('autor');
};
