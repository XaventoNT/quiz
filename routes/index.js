var express = require('express');
var router = express.Router();

//importar controlador de Quiz
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos cuando la ruta contiene el parametro :quizId
router.param('quizId', quizController.load);
// GET /quizes
router.get('/quizes', quizController.index);;
// GET question page
router.get('/quizes/:quizId(\\d+)', quizController.show);
// GET answer page
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
// GET autor page
router.get('/autor', quizController.autor);
// Formulario nueva pregunta
router.get('/quizes/new', quizController.new);
// Crear pregunta en DB
router.post('/quizes/create', quizController.create);
// Editar pregunta
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
// Actualizar pregunta en DB
router.put('/quizes/:quizId(\\d+)', quizController.update);

module.exports = router;
