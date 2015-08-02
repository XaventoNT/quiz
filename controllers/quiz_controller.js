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
      res.render('quizes/index', { quizes: quizes, busqueda: req.query.search, errors: [] });
    }).catch( function(error){ next(error); } );
  }else{
    models.Quiz.findAll().then(function (quizes) {
      res.render('quizes/index', { quizes: quizes, busqueda: '', errors: [] });
    }).catch( function(error){ next(error); } );
  }
};

// GET /quizes/:id
exports.show = function (req, res) {
  res.render('quizes/show', {quiz: req.quiz, errors: []});
};
// GET /quizes/:id/answer
exports.answer = function (req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

// GET /quizes/new
exports.new = function (req, res) {
  var quiz = models.Quiz.build(
    // Crear un objeto quiz
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );
  // se renderiza la pagina con el formulario
  res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function (req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

  // Valida que los datos sean de acuerdo al modelo
  quiz.validate().then(
    function (err) {
      if (err){
        // imprime renderiza la página con el error encontrado
        res.render("quizes/new", {quiz: quiz, errors: err.errors});
      }else{
        // guarda en DB los campos pregunta y respuesta de quiz
        quiz.save({fields: ["pregunta", "respuesta"]}).then(function () {
          res.redirect('/quizes'); // Redirección HTTP (URL relativo) lista de preguntas
        });
      }// fin else
    }// fin function(err)
  );// fin validate()
};

//GET /autor
exports.autor = function (req, res) {
  res.render('autor', {errors: []});
};
