const router = require('express').Router();
const connectEnsureLogin = require('connect-ensure-login');
const quizController = require('../controllers/quizController');


router.get('/library/:id', quizController.getAllQuizzes);
router.get('/create',connectEnsureLogin.ensureLoggedIn(), quizController.getNewQuiz);
router.post('/:id/create', quizController.createNewQuiz);
router.get("/view/:id", quizController.showQuiz);

router.post("/view/:id", quizController.updateQuizz);
router.get("/remove/all/:userId", quizController.removeAllQuizzes);
router.get("/remove/:quizId", quizController.removeQuizById);


module.exports = router;