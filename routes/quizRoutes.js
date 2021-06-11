const router = require('express').Router();
const connectEnsureLogin = require('connect-ensure-login');
const quizController = require('../controllers/quizController');


router.get('/library/:id', quizController.getAllQuizzesFromUser);
router.get('/create',connectEnsureLogin.ensureLoggedIn(), quizController.getNewQuiz);
router.post('/:id/create', quizController.createNewQuiz);
router.get("/view/:id", quizController.showQuiz);

router.post("/view/:id", quizController.updateQuizz);
router.get("/remove/all/:userId", quizController.removeAllQuizzes);
router.get("/remove/:quizId", quizController.removeQuizById);

router.get('/code', quizController.getCode);
router.post('/code', quizController.processCode);
router.get('/code/:id', quizController.loadQuiz);
router.get('/results', quizController.getResults);


module.exports = router;