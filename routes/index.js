var express = require('express');
var router = express.Router();

//importar controlador de Quiz
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// GET question page
router.get('/quizes/question', quizController.question);
// GET answer page
router.get('/quizes/answer', quizController.answer);
// GET autor page
router.get('/autor', quizController.autor);

module.exports = router;
