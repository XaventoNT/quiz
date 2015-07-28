var express = require('express');
var router = express.Router();

//importar controlador de Quiz
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
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

module.exports = router;
